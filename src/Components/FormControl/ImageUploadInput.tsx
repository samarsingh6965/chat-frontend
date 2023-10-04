import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';

interface ImageUploadInputProps {
    onImageUpload: (file: File) => void;
    disabled?:boolean
}

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({ onImageUpload ,disabled}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        onImageUpload(file);
    }, [onImageUpload]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        disabled:disabled,
    });

    return (
        <div {...getRootProps()} className="flex items-center justify-center w-full h-32">
            <input {...getInputProps()} />
            <label className="flex flex-col relative items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover.bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <AiOutlineCloudUpload className='text-gray-600 font-semibold text-xl' />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center"><span className="font-semibold text-center">Click or drag to upload</span></p>
                </div>
            </label>
        </div>
    );
};

export default ImageUploadInput;
