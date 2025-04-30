// components/ImageEditor/FileDropZone.jsx
import { useState } from 'react';
import { FiDownloadCloud } from 'react-icons/fi';

export default function FileDropZone({ onFilesSelected }) {
  const [isDragging, setIsDragging] = useState(false);

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
    onFilesSelected(droppedFiles);
    setIsDragging(false);
  };

  const handleFileChange = (e) => {
    if (e?.target?.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      onFilesSelected(selectedFiles);
    }
  };

  return (
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
  );
}