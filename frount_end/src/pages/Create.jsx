// Main Create.jsx
import { useState } from 'react';
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";
import { FiDownloadCloud } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import refactored components
import ImageGallery from '../components/ImageEditor/ImageGallery';
import PhotoEditorModal from '../components/ImageEditor/PhotoEditorModal';
import CropModal from '../components/ImageEditor/CropModal';
import ResizeModal from '../components/ImageEditor/ResizeModal';
import SketchModal from '../components/ImageEditor/SketchModal';
import FileDropZone from '../components/ImageEditor/FileDropZone';

export default function Create() {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [editedImages, setEditedImages] = useState({});
  
  // Modal states
  const [showPhotoEditor, setShowPhotoEditor] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showResizeModal, setShowResizeModal] = useState(false);
  const [showSketchModal, setShowSketchModal] = useState(false);
  
  // Current editing image references
  const [cropImageIndex, setCropImageIndex] = useState(null);
  const [resizingImageIndex, setResizingImageIndex] = useState(null);
  const [sketchingImageIndex, setSketchingImageIndex] = useState(null);

  const handleFileChange = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleEditClick = (file, index) => {
    setCurrentFile({ file, index });
    setShowPhotoEditor(true);
  };

  const handleSaveEditedImage = (editedFile) => {
    const imageURL = URL.createObjectURL(editedFile);
    setEditedImages((prev) => ({
      ...prev,
      [currentFile.index]: imageURL,
    }));
    setShowPhotoEditor(false);
    setCurrentFile(null);
    toast.success('Image Saved Successfully ✅');
  };

  const handleCropClick = (file, index) => {
    setCropImageIndex(index);
    setShowCropModal(true);
  };

  const handleSaveCrop = (croppedImageUrl) => {
    setEditedImages((prev) => ({
      ...prev,
      [cropImageIndex]: croppedImageUrl,
    }));
    setShowCropModal(false);
    toast.success('Image Cropped Successfully ✅');
  };

  const handleResizeClick = (file, index) => {
    setResizingImageIndex(index);
    setShowResizeModal(true);
  };

  const handleSaveResize = (resizedImageUrl) => {
    setEditedImages((prev) => ({
      ...prev,
      [resizingImageIndex]: resizedImageUrl,
    }));
    setShowResizeModal(false);
    toast.success('Image Resized Successfully ✅');
  };

  const handleSketchClick = (file, index) => {
    setSketchingImageIndex(index);
    setShowSketchModal(true);
  };

  const handleSaveSketch = (sketchedImageUrl) => {
    setEditedImages((prev) => ({
      ...prev,
      [sketchingImageIndex]: sketchedImageUrl,
    }));
    setShowSketchModal(false);
    toast.success('Pencil Sketch Created Successfully ✅');
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

  return (
    <>
      <Navbar />
      <br /><br />
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center p-6">
        <ToastContainer position="top-center" />

        <FileDropZone onFilesSelected={handleFileChange} />

        {/* Gallery */}
        {files.length > 0 && (
          <ImageGallery 
            files={files}
            editedImages={editedImages}
            onEdit={handleEditClick}
            onCrop={handleCropClick}
            onResize={handleResizeClick}
            onSketch={handleSketchClick}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        )}

        {/* Modals */}
        {showPhotoEditor && currentFile && (
          <PhotoEditorModal
            isOpen={showPhotoEditor}
            onClose={() => setShowPhotoEditor(false)}
            file={currentFile.file}
            onSave={handleSaveEditedImage}
          />
        )}

        {showCropModal && (
          <CropModal
            isOpen={showCropModal}
            onClose={() => setShowCropModal(false)}
            imageUrl={editedImages[cropImageIndex] || URL.createObjectURL(files[cropImageIndex])}
            onSave={handleSaveCrop}
          />
        )}

        {showResizeModal && (
          <ResizeModal
            isOpen={showResizeModal}
            onClose={() => setShowResizeModal(false)}
            imageUrl={editedImages[resizingImageIndex] || URL.createObjectURL(files[resizingImageIndex])}
            onSave={handleSaveResize}
          />
        )}

        {showSketchModal && (
          <SketchModal
            isOpen={showSketchModal}
            onClose={() => setShowSketchModal(false)}
            imageUrl={editedImages[sketchingImageIndex] || URL.createObjectURL(files[sketchingImageIndex])}
            onSave={handleSaveSketch}
          />
        )}
      </div>
      <Footer />
    </>
  );
}