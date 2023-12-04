import { useState, type FC, type MouseEvent, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import ImageUploadInput from '../FormControl/ImageUploadInput';
import { responseType } from '../../TypesAndInterfaces/TypesAndInterfaces';
import http from '../../Services/http/http';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx'
import { DataContext } from '../../Context/DataProvider';
import ProgressBar from '@ramonak/react-progress-bar';
import tickImg from '../../Assets/tick-blue.png'

interface EditProfileImagePopProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditProfileImagePop: FC<EditProfileImagePopProps> = ({ open, setOpen }) => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') ?? '[]');
    const { showProgress, progress, showTick } = useContext(DataContext);
    const [uploadedImage, setUploadedImage] = useState<any | null>(userDetails?.profileImage ?? null);
    const { socket } = useContext(DataContext);
    const handleChildClickPrevent = (event: MouseEvent) => {
        event.stopPropagation();
    }

    const handleUpdate = async () => {
        try {
            const response: responseType = await http({
                url: `/user/editPersnolDetail`,
                method: 'put',
                data: { _id: userDetails._id, profileImage: uploadedImage },
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
    const handleImageUpload = async (file: File) => {
        const FD = new FormData();
        FD.append('image', file);
        try {
            const response: responseType = await http({
                url: `/media/addMedia`,
                method: 'post',
                data: FD
            });
            socket?.on('upload_progress', (data: number) => {
                console.log(data)
            })
            if (response?.data?.code === 'SUCCESS_200') {
                toast.success(response?.data?.message);
                setUploadedImage(response?.data?.data?.url);
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
                url: `/media/addMedia`,
                method: 'delete',
                data: { downloadUrl: uploadedImage },
            });
            if (response?.data?.code === 'SUCCESS_200') {
                toast.success(response?.data?.message);
                setUploadedImage(null)
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error: any) {
            toast.error(error?.message);
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
                        {uploadedImage !== null || showProgress || showTick ?
                            <div className="w-full h-96 rounded-md border relative">
                                {(!showProgress && !showTick) && <span onClick={handleDeleteImage} className='w-5 h-5 flex items-center justify-center absolute cursor-pointer -top-2 -right-2 rounded-full bg-gray-200 text-gray-700 text-sm border border-black'><RxCross2 /></span>}
                                <img src={uploadedImage} alt='Profile' className='w-full h-full' />
                                <div className={`w-full bg-white rounded-md h-full px-2 flex items-center justify-center ${showProgress ? "absolute left-0 top-0 z-50" : "hidden"}`}>
                                    <ProgressBar
                                        completed={progress}
                                        className="w-full bg-gray-100"
                                    />
                                </div>
                                <div className={`w-full bg-white rounded-md h-full p-12 flex items-center justify-center ${showTick ? "absolute left-0 top-0 z-50" : "hidden"}`}>
                                    <img src={tickImg} alt="Tick" className='w-full h-full' />
                                </div>
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
