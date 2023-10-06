import { useState, type FC, type MouseEvent, useEffect } from 'react';
import maleavatar from '../../Assets/maleavatar.jpg'
import femaleavatar from '../../Assets/femaleavatar.jpg'
import otheravatar from '../../Assets/otheravatar.jpg'
import { Field, Form, Formik } from 'formik';
import InputText from '../FormControl/InputText';
import { responseType } from '../../TypesAndInterfaces/TypesAndInterfaces';
import http from '../../Services/http/http';
import { toast } from 'react-toastify';
import * as Yup from 'yup'
import GenderRadioGroup from '../FormControl/GenderRadioGroup';

interface ProfilePopProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
interface IUsers { _id: string, username: string, email: string }

const ProfilePop: FC<ProfilePopProps> = ({ open, setOpen }) => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') ?? '[]');
    const [disableFields, setDisableFields] = useState<boolean>(true)
    const [usernames, setUsernames] = useState<IUsers[] | null>(null)
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
        if(open === true){
            setDisableFields(true)
        }
        // eslint-disable-next-line
    }, [])

    const handleChildClickPrevent = (event: MouseEvent) => {
        event.stopPropagation();
    }
    const validationSchema = Yup.object().shape({
        gender: Yup.string().required('gender is required'),
        name: Yup.string().required('Name is required'),
        username: Yup.string().required('Username is required')
            .test('check-username', 'username already taken', async function (value) {
                const isUsernameUnique = await checkUsernameUniqueness(value);
                return isUsernameUnique;
            }),
    });

    async function checkUsernameUniqueness(username: string) {
        return !usernames?.find((user: IUsers) => user.username === username) ? true : false;
    }
    const handleSubmit = (values: any) => {
        console.log(values)
    }
    return (
        <div onClick={() => setOpen(false)} className={`${open ? 'absolute z-50 left-0 top-0 w-screen flex items-center justify-center h-screen bg-black bg-opacity-70' : 'hidden'} `}>
            <div onClick={(event) => handleChildClickPrevent(event)} className="sm:w-[450px] flex flex-col gap-3 items-center sm:mx-0 mx-6 w-full sm:min-w-[450px] h-auto p-2 bg-white">
                <div className="w-20 h-20 min-h-20 min-w-20 rounded-full border">
                    <img src={userDetails.profileImage === null ? (userDetails.gender === 'male' ? maleavatar : userDetails.gender === 'female' ? femaleavatar : otheravatar) : `${userDetails.profileImage.url}`} alt={'profile'} className='w-full h-full rounded-full cursor-pointer' />
                </div>
                <div className="w-full">
                    <Formik
                        initialValues={{
                            name: userDetails.name,
                            username: userDetails.username,
                            gender: userDetails.gender
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className='flex flex-col gap-5 p-2'>
                            <InputText name='name' label='Name' id='name' required={false} disabled={disableFields} />
                            <InputText name='username' label='Username' id='username' required={false} disabled={disableFields} />
                            <Field component={() => <GenderRadioGroup disabled={disableFields} />} name='gender' disabled={true} />
                            {disableFields ?
                                <span onClick={() => setDisableFields(false)} className='font-medium flex justify-center cursor-pointer text-white bg-blue-600 disabled:bg-blue-300 w-full py-1.5 rounded-md hover:bg-blue-700'>Edit Profile</span>
                                :
                                <button type='submit' className='font-medium text-white bg-blue-600 disabled:bg-blue-300 w-full py-1.5 rounded-md hover:bg-blue-700'>Save</button>
                            }
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default ProfilePop;
