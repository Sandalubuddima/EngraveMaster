// components/ImageEditor/ImageGallery.jsx
import { FiCrop, FiMaximize, FiEdit3 } from 'react-icons/fi';

export default function ImageGallery({ 
  files, 
  editedImages, 
  onEdit, 
  onCrop, 
  onResize, 
  onSketch, 
  onDownload, 
  onDelete 
}) {
  return (
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
              onClick={() => onEdit(file, index)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg w-full"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onCrop(file, index)}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg w-full"
            >
              <FiCrop className="inline mr-2" /> Crop
            </button>
            <button
              onClick={() => onResize(file, index)}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg w-full"
            >
              <FiMaximize className="inline mr-2" /> Resize
            </button>
            <button
              onClick={() => onSketch(file, index)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg w-full"
            >
              <FiEdit3 className="inline mr-2" /> Pencil Sketch
            </button>
            <button
              onClick={() => onDownload(editedImages[index] || URL.createObjectURL(file))}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg w-full"
            >
              ⬇️ Download
            </button>
            <button
              onClick={() => onDelete(index)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg w-full"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}