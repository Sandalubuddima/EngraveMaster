// components/ImageEditor/PhotoEditorModal.jsx
import { ReactPhotoEditor } from 'react-photo-editor';

export default function PhotoEditorModal({ isOpen, onClose, file, onSave }) {
  return (
    <ReactPhotoEditor
      open={isOpen}
      onClose={onClose}
      file={file}
      onSaveImage={onSave}
    />
  );
}