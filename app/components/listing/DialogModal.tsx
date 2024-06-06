import React from 'react';

interface DialogModalProps {
    isOpen: boolean;
    imageUrl: string;
    onClose: () => void;
}

const DialogModal: React.FC<DialogModalProps> = ({ isOpen, imageUrl, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-4 rounded-lg max-w-4xl w-full">
                <button 
                    className="absolute top-2 right-2 text-black" 
                    onClick={onClose}
                >
                    Close
                </button>
                <img src={imageUrl} alt="Selected Image" className="w-full max-h-[80vh] object-contain" />
            </div>
        </div>
    );
};

export default DialogModal;
