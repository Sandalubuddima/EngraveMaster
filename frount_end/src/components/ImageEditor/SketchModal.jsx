// components/ImageEditor/SketchModal.jsx
import { useState, useRef, useEffect } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { applyPencilSketchEffect } from '../../utils/imageProcessing';

export default function SketchModal({ isOpen, onClose, imageUrl, onSave }) {
  const [sketchIntensity, setSketchIntensity] = useState(50);
  const sketchCanvasRef = useRef(null);

  // Update sketch preview when intensity changes
  useEffect(() => {
    if (!imageUrl || !sketchCanvasRef.current) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = sketchCanvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Apply pencil sketch effect
      applyPencilSketchEffect(img, canvas, ctx, sketchIntensity);
    };
    img.src = imageUrl;
  }, [imageUrl, sketchIntensity]);

  const handleIntensityChange = (value) => {
    setSketchIntensity(parseInt(value));
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
      onSave(sketchedImageUrl);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-11/12 max-w-4xl max-h-screen overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Pencil Sketch</h2>
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
                onChange={(e) => handleIntensityChange(e.target.value)}
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
                onClick={onClose}
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
  );
}