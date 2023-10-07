import { useState, type FC, type MouseEvent, useEffect, useRef } from 'react';
import maleavatar from '../../Assets/maleavatar.jpg'
import femaleavatar from '../../Assets/femaleavatar.jpg'
import otheravatar from '../../Assets/otheravatar.jpg'
import { Field, Form, Formik } from 'formik';
import InputText from '../FormControl/InputText';
import { IUsers, responseType } from '../../TypesAndInterfaces/TypesAndInterfaces';
import http from '../../Services/http/http';
import { toast } from 'react-toastify';
import * as Yup from 'yup'
import GenderRadioGroup from '../FormControl/GenderRadioGroup';
import { AnimatePresence, motion } from 'framer-motion'
import ActionPop from './ActionPop';
import InputTextArea from '../FormControl/InputTextArea';
import { BsArrowLeft } from 'react-icons/bs';
import PreviewPop from './PreviewPop';

interface ProfilePopProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const ProfilePop: FC<ProfilePopProps> = ({ open, setOpen }) => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') ?? '[]');
    const [disableFields, setDisableFields] = useState<boolean>(true)
    const [usernames, setUsernames] = useState<IUsers[] | null>(null)
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

    const fetchUsernames = async () => {
        try {
            const response: responseType = await http({
                url: '/auth/usernames',
                method: 'get',
            }, true);
            if (response.data?.code === 'SUCCESS_200') {
                setUsernames(response.data.data)
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error: ErrorCallback | unknown) {
            toast.error((error as any)?.response?.data?.message);
        }
    }
    useEffect(() => {
        fetchUsernames()
        if (open === true) {
            setDisableFields(true)
        }
        // eslint-disable-next-line
    }, [])

    const handleChildClickPrevent = (event: MouseEvent) => {
        event.stopPropagation();
    }
    const validationSchema = Yup.object().shape({
        gender: Yup.string().required('gender is required'),
        bio: Yup.string(),
        name: Yup.string().required('Name is required'),
        username: Yup.string().required('Username is required')
            .test('check-username', 'username already taken', async function (value) {
                const isUsernameUnique = await checkUsernameUniqueness(value);
                return isUsernameUnique;
            }),
    });

    async function checkUsernameUniqueness(username: string) {
        return !usernames?.find((user: IUsers) => user.username !== userDetails.username && user.username === username) ? true : false;
    }

    const ViewProfileImage = () => {
        setOpenPreview(true)
    }
    const EditProfileImage = () => {
        window.alert('Edit Profile Image')
    }
    const actions = [
        { id: 1, name: 'View Profile Image', click: ViewProfileImage },
        { id: 2, name: 'Edit Profile Image', click: EditProfileImage }
    ]
    const handleSubmit = async (values: any) => {
        try {
            values['_id'] = userDetails._id;
            const response: responseType = await http({
                url: '/user/editPersnolDetail',
                method: 'put',
                data: values
            });
            if (response.data?.code === 'SUCCESS_200') {
                toast.success(response?.data?.message);
                setDisableFields(true)
                sessionStorage.setItem('userDetails', JSON.stringify(response.data.data));
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error: any | unknown) {
            toast.error((error as any)?.response?.data?.message);
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
                        <div onClick={handleImageParentClick} className="w-24 h-24 min-h-24 min-w-24 rounded-full border relative">
                            <img ref={imageRef} onClick={(e) => handleImageClick(e)} src={userDetails.profileImage === null ? (userDetails.gender === 'male' ? maleavatar : userDetails.gender === 'female' ? femaleavatar : otheravatar) : `${userDetails.profileImage.url}`} alt={'profile'} className='w-full h-full rounded-full cursor-pointer' />
                            <span className='absolute top-0 left-0 w-full h-full'><ActionPop action={actions} icon='none' /></span>
                        </div>
                        <div className="w-full">
                            <Formik
                                initialValues={{
                                    name: userDetails.name,
                                    username: userDetails.username,
                                    gender: userDetails.gender,
                                    bio: userDetails.bio
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                <Form className='flex flex-col gap-5 p-2'>
                                    <InputText name='name' label='Name' id='name' required={false} disabled={disableFields} />
                                    <InputText name='username' label='Username' id='username' required={false} disabled={disableFields} />
                                    <Field component={() => <GenderRadioGroup disabled={disableFields} />} name='gender' disabled={true} />
                                    <InputTextArea name='bio' label='Bio' required={false} disabled={disableFields} />
                                    {disableFields ?
                                        <span onClick={() => setDisableFields(false)} className='font-medium flex justify-center cursor-pointer text-white bg-blue-600 disabled:bg-blue-300 w-full py-1.5 rounded-md hover:bg-blue-700'>Edit Profile</span>
                                        :
                                        <button type='submit' className='font-medium text-white bg-blue-600 disabled:bg-blue-300 w-full py-1.5 rounded-md hover:bg-blue-700'>Save</button>
                                    }
                                </Form>
                            </Formik>
                        </div>
                        <span onClick={() => setOpen(false)} className='text-2xl cursor-pointer text-blue-600 absolute left-5 top-5'><BsArrowLeft /></span>
                    </motion.div>
                </motion.div>
            )}
            {openPreview && <PreviewPop open={openPreview} setOpen={setOpenPreview} url={imageURL} username={name}/>}
        </AnimatePresence >
    );
}

export default ProfilePop;
