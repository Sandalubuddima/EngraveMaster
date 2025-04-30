// components/ImageEditor/CropModal.jsx
import { useState, useRef, useEffect } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { toast } from 'react-toastify';

export default function CropModal({ isOpen, onClose, imageUrl, onSave }) {
  const [crop, setCrop] = useState({ unit: '%', width: 50, height: 50, x: 25, y: 25 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

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

  const handleCropComplete = (crop) => {
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
      onSave(croppedImageUrl);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-11/12 max-w-4xl max-h-screen overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Crop Image</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
            <ReactCrop
              src={imageUrl}
              crop={crop}
              onChange={newCrop => setCrop(newCrop)}
              onComplete={handleCropComplete}
              className="max-h-96 mx-auto"
            >
              <img 
                ref={imgRef}
                src={imageUrl}
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
                onClick={onClose}
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
  );
}