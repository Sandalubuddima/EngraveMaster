import { useState, useRef, useEffect } from 'react';
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";

import { FiDownloadCloud, FiCrop, FiCheck, FiX, FiMaximize, FiEdit3 } from 'react-icons/fi';
import { ReactPhotoEditor } from 'react-photo-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function Create() {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedImages, setEditedImages] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  
  // Crop related states
  const [showCropModal, setShowCropModal] = useState(false);
  const [cropImage, setCropImage] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 50, height: 50, x: 25, y: 25 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const cropImageIndex = useRef(null);

  // Resize related states
  const [showResizeModal, setShowResizeModal] = useState(false);
  const [resizingImageIndex, setResizingImageIndex] = useState(null);
  const [resizeImage, setResizeImage] = useState(null);
  const [resizeDimensions, setResizeDimensions] = useState({
    width: 0,
    height: 0,
    unit: 'px',
    keepAspectRatio: true,
    originalWidth: 0,
    originalHeight: 0,
    aspectRatio: 1
  });
  const resizeCanvasRef = useRef(null);

  // Pencil sketch related states
  const [showSketchModal, setShowSketchModal] = useState(false);
  const [sketchImage, setSketchImage] = useState(null);
  const [sketchingImageIndex, setSketchingImageIndex] = useState(null);
  const [sketchIntensity, setSketchIntensity] = useState(50);
  const sketchCanvasRef = useRef(null);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  // New useEffect for resize preview
  useEffect(() => {
    if (!resizeImage || !resizeCanvasRef.current) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = resizeCanvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = convertToPixels(resizeDimensions.width, resizeDimensions.unit);
      const height = convertToPixels(resizeDimensions.height, resizeDimensions.unit);
      
      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, width, height); // Clear before drawing
      ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = resizeImage;
  }, [resizeImage, resizeDimensions]);

  // New useEffect for pencil sketch preview
  useEffect(() => {
    if (!sketchImage || !sketchCanvasRef.current) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = sketchCanvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Apply pencil sketch effect
      applyPencilSketchEffect(img, canvas, ctx, sketchIntensity);
    };
    img.src = sketchImage;
  }, [sketchImage, sketchIntensity]);

  const handleFileChange = (e) => {
    if (e?.target?.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
    setIsDragging(false);
  };

  const handleEditClick = (file, index) => {
    setCurrentFile({ file, index });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentFile(null);
  };

  const handleSaveImage = (editedFile) => {
    const imageURL = URL.createObjectURL(editedFile);
    setEditedImages((prev) => ({
      ...prev,
      [currentFile.index]: imageURL,
    }));
    setShowModal(false);
    setCurrentFile(null);
    toast.success('Image Saved Successfully ✅');
  };

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'edited-image.png';
    link.click();
  };

  const handleDelete = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setEditedImages((prev) => {
      const newImages = { ...prev };
      delete newImages[index];
      return newImages;
    });
    toast.info('Image Deleted 🗑️');
  };

  // Crop related functions
  const handleCropClick = (file, index) => {
    const imageUrl = editedImages[index] || URL.createObjectURL(file);
    setCropImage(imageUrl);
    cropImageIndex.current = index;
    setShowCropModal(true);
  };

  const handleCropComplete = (crop, percentageCrop) => {
    setCompletedCrop(crop);
  };

  const handleSaveCrop = () => {
    if (!completedCrop || !previewCanvasRef.current) {
      toast.error('Please select an area to crop');
      return;
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        toast.error('Could not create image blob');
        return;
      }

      const croppedImageUrl = URL.createObjectURL(blob);
      
      setEditedImages((prev) => ({
        ...prev,
        [cropImageIndex.current]: croppedImageUrl,
      }));

      setShowCropModal(false);
      setCropImage(null);
      setCompletedCrop(null);
      toast.success('Image Cropped Successfully ✅');
    });
  };

  const handleCloseCrop = () => {
    setShowCropModal(false);
    setCropImage(null);
    setCompletedCrop(null);
  };

  // Resize related functions
  const handleResizeClick = (file, index) => {
    const imageUrl = editedImages[index] || URL.createObjectURL(file);
    setResizeImage(imageUrl);
    setResizingImageIndex(index);
    
    // Create a temporary image to get original dimensions
    const img = new Image();
    img.onload = () => {
      const originalWidth = img.width;
      const originalHeight = img.height;
      const aspectRatio = originalWidth / originalHeight;
      
      setResizeDimensions({
        width: originalWidth,
        height: originalHeight,
        unit: 'px',
        keepAspectRatio: true,
        originalWidth,
        originalHeight,
        aspectRatio
      });
    };
    img.src = imageUrl;
    
    setShowResizeModal(true);
  };

  const handleResizeDimensionChange = (dimension, value) => {
    if (value === "" || isNaN(value)) value = 0;
    else value = parseFloat(value);
    
    const newDimensions = { ...resizeDimensions, [dimension]: value };
    
    // Update other dimension if keeping aspect ratio
    if (dimension === 'width' && resizeDimensions.keepAspectRatio) {
      newDimensions.height = value / resizeDimensions.aspectRatio;
    } else if (dimension === 'height' && resizeDimensions.keepAspectRatio) {
      newDimensions.width = value * resizeDimensions.aspectRatio;
    }
    
    setResizeDimensions(newDimensions);
  };

  const handleUnitChange = (unit) => {
    // Convert current dimensions to the new unit
    const pixelWidth = convertToPixels(resizeDimensions.width, resizeDimensions.unit);
    const pixelHeight = convertToPixels(resizeDimensions.height, resizeDimensions.unit);
    
    const newWidth = convertFromPixels(pixelWidth, unit);
    const newHeight = convertFromPixels(pixelHeight, unit);
    
    setResizeDimensions({
      ...resizeDimensions,
      width: newWidth,
      height: newHeight,
      unit
    });
  };
  
  const handleToggleAspectRatio = () => {
    setResizeDimensions({
      ...resizeDimensions,
      keepAspectRatio: !resizeDimensions.keepAspectRatio
    });
  };

  const convertToPixels = (value, unit) => {
    // Standard DPI values for conversion
    const DPI = 96; // Standard screen DPI
    
    switch (unit) {
      case 'cm':
        return Math.round(value * DPI / 2.54); // 1 inch = 2.54 cm
      case 'mm':
        return Math.round(value * DPI / 25.4); // 1 inch = 25.4 mm
      case 'inch':
        return Math.round(value * DPI);
      case 'px':
      default:
        return Math.round(value);
    }
  };
  
  const convertFromPixels = (pixels, unit) => {
    const DPI = 96;
    
    switch (unit) {
      case 'cm':
        return Number((pixels * 2.54 / DPI).toFixed(2));
      case 'mm':
        return Number((pixels * 25.4 / DPI).toFixed(1));
      case 'inch':
        return Number((pixels / DPI).toFixed(2));
      case 'px':
      default:
        return pixels;
    }
  };

  const handleSaveResize = () => {
    if (!resizeCanvasRef.current) {
      toast.error('Unable to resize image');
      return;
    }
    
    resizeCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        toast.error('Could not create resized image');
        return;
      }
      
      const resizedImageUrl = URL.createObjectURL(blob);
      
      setEditedImages((prev) => ({
        ...prev,
        [resizingImageIndex]: resizedImageUrl,
      }));
      
      setShowResizeModal(false);
      setResizeImage(null);
      toast.success('Image Resized Successfully ✅');
    });
  };

  const handleCloseResize = () => {
    setShowResizeModal(false);
    setResizeImage(null);
  };

  // Pencil Sketch related functions
  const handleSketchClick = (file, index) => {
    const imageUrl = editedImages[index] || URL.createObjectURL(file);
    setSketchImage(imageUrl);
    setSketchingImageIndex(index);
    setSketchIntensity(50); // Reset intensity to default
    setShowSketchModal(true);
  };

  const handleSketchIntensityChange = (value) => {
    setSketchIntensity(parseInt(value));
  };

  const applyPencilSketchEffect = (img, canvas, ctx, intensity) => {
    // Draw the original image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Convert to grayscale
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = data[i + 1] = data[i + 2] = gray;
    }
    
    // Apply edge detection (basic Sobel filter)
    const edgeData = detectEdges(imageData, canvas.width, canvas.height);
    
    // Blend original grayscale with edges based on intensity
    const blendFactor = intensity / 100;
    
    for (let i = 0; i < data.length; i += 4) {
      // Invert edge data for sketch-like appearance
      const edgeValue = 255 - edgeData[i];
      
      // Blend grayscale with edge data
      data[i] = data[i + 1] = data[i + 2] = Math.min(255, Math.max(0, 
        data[i] * (1 - blendFactor) + edgeValue * blendFactor
      ));
    }
    
    // Apply slight contrast adjustment
    applyContrast(data, 1.2);
    
    // Put modified data back to canvas
    ctx.putImageData(imageData, 0, 0);
  };

  const detectEdges = (imageData, width, height) => {
    const data = imageData.data;
    const edgeData = new Uint8ClampedArray(data.length);
    
    // Sobel kernels
    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let sumX = 0;
        let sumY = 0;
        
        // Apply kernel
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * width + (x + kx)) * 4;
            const kernelIdx = (ky + 1) * 3 + (kx + 1);
            
            sumX += data[idx] * sobelX[kernelIdx];
            sumY += data[idx] * sobelY[kernelIdx];
          }
        }
        
        // Calculate gradient magnitude
        const magnitude = Math.sqrt(sumX * sumX + sumY * sumY);
        
        // Set edge value
        const idx = (y * width + x) * 4;
        edgeData[idx] = edgeData[idx + 1] = edgeData[idx + 2] = magnitude;
        edgeData[idx + 3] = 255;
      }
    }
    
    return edgeData;
  };

  const applyContrast = (data, factor) => {
    const factor128 = 128 * (1 - factor);
    
    for (let i = 0; i < data.length; i += 4) {
      data[i] = factor * data[i] + factor128;
      data[i + 1] = factor * data[i + 1] + factor128;
      data[i + 2] = factor * data[i + 2] + factor128;
    }
  };

  const handleSaveSketch = () => {
    if (!sketchCanvasRef.current) {
      toast.error('Unable to create sketch');
      return;
    }
    
    sketchCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        toast.error('Could not create sketch image');
        return;
      }
      
      const sketchedImageUrl = URL.createObjectURL(blob);
      
      setEditedImages((prev) => ({
        ...prev,
        [sketchingImageIndex]: sketchedImageUrl,
      }));
      
      setShowSketchModal(false);
      setSketchImage(null);
      toast.success('Pencil Sketch Created Successfully ✅');
    });
  };

  const handleCloseSketch = () => {
    setShowSketchModal(false);
    setSketchImage(null);
  };

  return (
    <>
      <Navbar />
      <br /><br />
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center p-6">
        <ToastContainer position="top-center" />

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`w-full max-w-5xl p-12 mb-10 rounded-3xl flex flex-col items-center justify-center transition-all shadow-lg cursor-pointer border-4 ${
            isDragging
              ? 'border-green-400 bg-green-100 dark:bg-green-900'
              : 'border-blue-400 bg-white dark:bg-gray-800'
          }`}
        >
          <FiDownloadCloud
            className={`mb-6 transition-all ${
              isDragging ? 'text-green-500' : 'text-blue-500 dark:text-blue-400'
            } text-7xl`}
          />

          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Drag & Drop your images here
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            or click below to upload
          </p>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="mt-6"
          />
        </div>

        {/* Gallery */}
        {files.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
            {files.map((file, index) => (
              <div key={index} className="relative p-4 bg-white dark:bg-gray-800 rounded-3xl shadow-xl flex flex-col items-center group transition hover:scale-105">
                <img
                  src={editedImages[index] || URL.createObjectURL(file)}
                  alt={`Uploaded ${index}`}
                  className="rounded-2xl mb-6 w-full h-60 object-cover"
                />

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 w-full">
                  <button
                    onClick={() => handleEditClick(file, index)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg w-full"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleCropClick(file, index)}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg w-full"
                  >
                    <FiCrop className="inline mr-2" /> Crop
                  </button>
                  <button
                    onClick={() => handleResizeClick(file, index)}
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg w-full"
                  >
                    <FiMaximize className="inline mr-2" /> Resize
                  </button>
                  <button
                    onClick={() => handleSketchClick(file, index)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg w-full"
                  >
                    <FiEdit3 className="inline mr-2" /> Pencil Sketch
                  </button>
                  <button
                    onClick={() => handleDownload(editedImages[index] || URL.createObjectURL(file))}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg w-full"
                  >
                    ⬇️ Download
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg w-full"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Photo Editor Modal */}
        {currentFile && (
          <ReactPhotoEditor
            open={showModal}
            onClose={handleClose}
            file={currentFile.file}
            onSaveImage={handleSaveImage}
          />
        )}

        {/* Crop Modal */}
        {showCropModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-11/12 max-w-4xl max-h-screen overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Crop Image</h2>
                <button 
                  onClick={handleCloseCrop}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                  <ReactCrop
                    src={cropImage}
                    crop={crop}
                    onChange={newCrop => setCrop(newCrop)}
                    onComplete={handleCropComplete}
                    className="max-h-96 mx-auto"
                  >
                    <img 
                      ref={imgRef}
                      src={cropImage}
                      alt="Crop preview"
                      className="max-h-96 mx-auto"
                    />
                  </ReactCrop>
                </div>
                
                <div className="flex-1 flex flex-col items-center">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Preview</h3>
                  <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">
                    <canvas
                      ref={previewCanvasRef}
                      className="max-w-full mx-auto rounded border border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  
                  <div className="mt-6 flex gap-4 w-full">
                    <button
                      onClick={handleCloseCrop}
                      className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg"
                    >
                      <FiX className="inline mr-2" /> Cancel
                    </button>
                    <button
                      onClick={handleSaveCrop}
                      className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
                    >
                      <FiCheck className="inline mr-2" /> Save Crop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resize Modal */}
        {showResizeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-11/12 max-w-4xl max-h-screen overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Resize Image</h2>
                <button 
                  onClick={handleCloseResize}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left side - Settings */}
                <div className="lg:w-1/3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Resize Settings</h3>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Width:
                      </label>
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <input
                          type="number"
                          value={resizeDimensions.width}
                          onChange={(e) => handleResizeDimensionChange('width', e.target.value)}
                          className="w-24 p-2 text-right bg-white dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Height:
                      </label>
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <input
                          type="number"
                          value={resizeDimensions.height}
                          onChange={(e) => handleResizeDimensionChange('height', e.target.value)}
                          className="w-24 p-2 text-right bg-white dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Unit:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {['px', 'cm', 'mm', 'inch'].map((unit) => (
                        <button
                          key={unit}
                          onClick={() => handleUnitChange(unit)}
                          className={`py-2 rounded-md ${
                            resizeDimensions.unit === unit
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {unit}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={resizeDimensions.keepAspectRatio}
                        onChange={handleToggleAspectRatio}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Maintain aspect ratio
                      </span>
                    </label>
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <p className="mb-1">Original size: {resizeDimensions.originalWidth} × {resizeDimensions.originalHeight} px</p>
                    <p>
                      New size: {convertToPixels(resizeDimensions.width, resizeDimensions.unit)} × {convertToPixels(resizeDimensions.height, resizeDimensions.unit)} px
                    </p>
                  </div>
                </div>
                
                {/* Right side - Preview */}
                <div className="lg:w-2/3 flex flex-col">
                <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Preview</h3>
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg flex-1 flex items-center justify-center overflow-auto">
                    <div className="relative bg-transparent">
                      <canvas
                        ref={resizeCanvasRef}
                        className="max-w-full max-h-96 mx-auto rounded shadow-md"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-4 w-full">
                    <button
                      onClick={handleCloseResize}
                      className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg"
                    >
                      <FiX className="inline mr-2" /> Cancel
                    </button>
                    <button
                      onClick={handleSaveResize}
                      className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
                    >
                      <FiCheck className="inline mr-2" /> Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pencil Sketch Modal */}
        {showSketchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-11/12 max-w-4xl max-h-screen overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Pencil Sketch</h2>
                <button 
                  onClick={handleCloseSketch}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left side - Settings */}
                <div className="lg:w-1/3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Sketch Settings</h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Effect Intensity: {sketchIntensity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sketchIntensity}
                      onChange={(e) => handleSketchIntensityChange(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>Subtle</span>
                      <span>Strong</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">About Pencil Sketch</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      This effect transforms your image into a hand-drawn pencil sketch. Adjust the intensity slider to control how pronounced the sketch effect appears.
                    </p>
                  </div>
                </div>
                
                {/* Right side - Preview */}
                <div className="lg:w-2/3 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Preview</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg flex-1 flex items-center justify-center overflow-auto">
                    <div className="relative bg-transparent">
                      <canvas
                        ref={sketchCanvasRef}
                        className="max-w-full max-h-96 mx-auto rounded shadow-md"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-4 w-full">
                    <button
                      onClick={handleCloseSketch}
                      className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg"
                    >
                      <FiX className="inline mr-2" /> Cancel
                    </button>
                    <button
                      onClick={handleSaveSketch}
                      className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
                    >
                      <FiCheck className="inline mr-2" /> Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}