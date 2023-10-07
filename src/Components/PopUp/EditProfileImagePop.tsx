import { useState, type FC, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import ImageUploadInput from '../FormControl/ImageUploadInput';
import { responseType } from '../../TypesAndInterfaces/TypesAndInterfaces';
import http from '../../Services/http/http';
import { toast } from 'react-toastify';
import {RxCross2} from 'react-icons/rx'

interface EditProfileImagePopProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditProfileImagePop: FC<EditProfileImagePopProps> = ({ open, setOpen }) => {
    const [uploadedImage, setUploadedImage] = useState<{ _id: string, url: string, mimetype: string } | null>(null)
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') ?? '[]');
    const handleChildClickPrevent = (event: MouseEvent) => {
        event.stopPropagation();
    }
    const handleUpdate = async () => {
        try {
            const response: responseType = await http({
                url: `/user/editPersnolDetail`,
                method: 'put',
                data: { _id:userDetails._id ,profileImage:uploadedImage?._id },
            });
            if (response?.data?.code === 'SUCCESS_200') {
                toast.success(response?.data?.message);
                setUploadedImage(null)
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error('Error Adding AssetType.');
            }
        }
    }
    const handleImageUpload = async (file: File) => {
        const FD = new FormData();
        FD.append('image', file);
        try {
            const response: responseType = await http({
                url: `/media/addMedia`,
                method: 'post',
                data: FD
            });
            if (response?.data?.code === 'SUCCESS_200') {
                toast.success(response?.data?.message);
                setUploadedImage(response?.data?.data);
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error('Error fetching AssetType.');
            }
        }
    };
    const handleDeleteImage = async () => {
        try {
            const response: responseType = await http({
                url: `/media/deleteMediaPermanent`,
                method: 'delete',
                data: { _id: uploadedImage?._id },
            });
            if (response?.data?.code === 'SUCCESS_200') {
                toast.success(response?.data?.message);
                setUploadedImage(null)
                setOpen(false)
                sessionStorage.setItem('userDetails', JSON.stringify(response.data.data));
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error('Error Adding AssetType.');
            }
        }
    }
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setOpen(false)}
                    className={`absolute z-50 left-0 top-0 w-screen flex items-center justify-center h-screen bg-black bg-opacity-70`}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -70 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -70 }}
                        onClick={(event) => handleChildClickPrevent(event)}
                        className="sm:w-[450px] relative rounded-lg shadow-2xl shadow-blue-100 flex flex-col gap-3 items-center sm:mx-0 mx-6 w-full sm:min-w-[450px] h-auto px-4 py-8 bg-white"
                    >
                        {uploadedImage !== null ?
                            <div className="w-full h-96 rounded-md border relative">
                                <span onClick={handleDeleteImage} className='w-5 h-5 flex items-center justify-center absolute cursor-pointer -top-2 -right-2 rounded-full bg-gray-200 text-gray-700 text-sm border border-black'><RxCross2 /></span>
                                <img src={`http://localhost:5000/api/${uploadedImage?.url}`} alt={uploadedImage?.mimetype} className='w-full h-full' />
                            </div>
                            :
                            <ImageUploadInput onImageUpload={handleImageUpload} />
                        }
                        <button onClick={handleUpdate} className="bg-blue-500 text-white py-1.5 px-4 rounded-lg">
                            Update
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence >
    );
}

export default EditProfileImagePop;
