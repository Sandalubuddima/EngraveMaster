// components/ImageEditor/ResizeModal.jsx
import { useState, useRef, useEffect } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { unitConversions } from '../../utils/imageProcessing';

export default function ResizeModal({ isOpen, onClose, imageUrl, onSave }) {
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

  // Initialize dimensions when image loads
  useEffect(() => {
    if (!imageUrl) return;
    
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
  }, [imageUrl]);

  // Update canvas preview when dimensions change
  useEffect(() => {
    if (!imageUrl || !resizeCanvasRef.current) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = resizeCanvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = convertToPixels(resizeDimensions.width, resizeDimensions.unit);
      const height = convertToPixels(resizeDimensions.height, resizeDimensions.unit);
      
      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = imageUrl;
  }, [imageUrl, resizeDimensions]);

  const handleDimensionChange = (dimension, value) => {
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

  const { convertToPixels, convertFromPixels } = unitConversions;

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
      onSave(resizedImageUrl);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-11/12 max-w-4xl max-h-screen overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Resize Image</h2>
          <button 
            onClick={onClose}
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
                    onChange={(e) => handleDimensionChange('width', e.target.value)}
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
                    onChange={(e) => handleDimensionChange('height', e.target.value)}
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
                onClick={onClose}
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
  );
}