import { useState, type FC, type MouseEvent, useRef } from 'react';
import maleavatar from '../../Assets/maleavatar.jpg'
import femaleavatar from '../../Assets/femaleavatar.jpg'
import otheravatar from '../../Assets/otheravatar.jpg'
import { Field, Form, Formik } from 'formik';
import InputText from '../FormControl/InputText';
import { IUsers } from '../../TypesAndInterfaces/TypesAndInterfaces';
import GenderRadioGroup from '../FormControl/GenderRadioGroup';
import { motion } from 'framer-motion'
import ActionPop from './ActionPop';
import InputTextArea from '../FormControl/InputTextArea';
import { BsArrowLeft } from 'react-icons/bs';
import PreviewPop from './PreviewPop';

interface UserProfilePopProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    userDetails?: IUsers
}
const UserProfilePop: FC<UserProfilePopProps> = ({ open, setOpen, userDetails }) => {
    const [openPreview, setOpenPreview] = useState<boolean>(false);
    const [imageURL, setImageURL] = useState<string>();
    const [name, setName] = useState<string>();
    const imageRef: any = useRef(null)
    const handleImageParentClick = () => {
        if (imageRef.current) {
            imageRef?.current?.click()
        }
    }
    const handleImageClick = (event: any) => {
        setImageURL(event.target.src);
        setName(userDetails?.username)
    };

    const handleChildClickPrevent = (event: MouseEvent) => {
        event.stopPropagation();
    }

    const ViewProfileImage = () => {
        setOpenPreview(true)
    }
    const actions = [
        { id: 1, name: 'View Profile Image', click: ViewProfileImage },
    ]
    const handleSubmit = () => { };
    return (
        <div>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setOpen(false)}
                    className={`fixed z-50 left-0 top-0 w-screen flex items-center justify-center h-screen bg-black bg-opacity-70`}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -70 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -70 }}
                        onClick={(event) => handleChildClickPrevent(event)}
                        className="sm:w-[450px] relative rounded-lg shadow-2xl shadow-blue-100 flex flex-col gap-3 items-center sm:mx-0 mx-6 w-full sm:min-w-[450px] h-auto px-4 py-8 bg-white"
                    >
                        <div onClick={handleImageParentClick} className="w-24 h-24 min-h-24 min-w-24 rounded-full border relative">
                            <img ref={imageRef}
                                onClick={(e) => handleImageClick(e)} src={userDetails?.profileImage === null ? (userDetails?.gender === 'male' ? maleavatar : userDetails?.gender === 'female' ? femaleavatar : otheravatar) : userDetails?.profileImage}
                                alt={'profile'}
                                className='w-full h-full rounded-full cursor-pointer' />
                            <span className='absolute top-0 left-0 w-full h-full'><ActionPop action={actions} icon='none' /></span>
                        </div>
                        <div className="w-full">
                            <Formik
                                initialValues={{
                                    name: userDetails?.name,
                                    username: userDetails?.username,
                                    gender: userDetails?.gender,
                                    bio: userDetails?.bio
                                }}
                                validationSchema={{}}
                                onSubmit={handleSubmit}
                            >
                                <Form className='flex flex-col gap-5 p-2'>
                                    <InputText name='name' label='Name' id='name' required={false} disabled={true} />
                                    <InputText name='username' label='Username' id='username' required={false} disabled={true} />
                                    <Field component={() => <GenderRadioGroup disabled={true} />} name='gender' disabled={true} />
                                    <InputTextArea name='bio' label='Bio' required={false} disabled={true} />
                                </Form>
                            </Formik>
                        </div>
                        <span onClick={() => setOpen(false)} className='text-2xl cursor-pointer text-blue-600 absolute left-5 top-5'><BsArrowLeft /></span>
                    </motion.div>
                </motion.div>
            )}
            {openPreview && <PreviewPop open={openPreview} setOpen={setOpenPreview} url={imageURL} username={name} />}
        </div >
    );
}

export default UserProfilePop;
