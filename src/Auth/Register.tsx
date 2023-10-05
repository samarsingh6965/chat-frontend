import { useState, type FC, useEffect } from 'react';
import InputEmail from '../Components/FormControl/InputEmail';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputPassword from '../Components/FormControl/InputPassword';
import BG from '../Assets/login.jpg'
import InputText from '../Components/FormControl/InputText';
import { Link, useNavigate } from 'react-router-dom';
import http from '../Services/http/http';
import { responseType } from '../TypesAndInterfaces/TypesAndInterfaces';
import { toast } from 'react-toast';
import {motion} from 'framer-motion'

interface RegisterProps { }
interface IUsers { _id: string, username: string, email: string }

const Register: FC<RegisterProps> = () => {
    const [disableSubmitButton, setDisableSUbmitButton] = useState<boolean>(true)
    const [usernames, setUsernames] = useState<IUsers[] | null>(null)
    const navigate = useNavigate();
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
    }, [])
    const handleSubmit = async (values: { username: string, email: string, password: string }, { resetForm }: any) => {
        try {
            const response: responseType = await http({
                url: '/auth/register',
                method: 'post',
                data: values
            }, true);
            if (response.data?.code === 'SUCCESS_200') {
                setTimeout(() => {
                    navigate('/')
                    resetForm();
                }, 2000);
                toast.success(response?.data?.message)
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error: any | unknown) {
            toast.error((error as any)?.response?.data?.message);
        }
    }
    const handleSubmitButton = (value: boolean) => {
        setDisableSUbmitButton(!value)
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .test('check-username', 'username already taken', async function (value) {
                const isUsernameUnique = await checkUsernameUniqueness(value);
                return isUsernameUnique;
            }),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required')
            .test('check-email', 'email already exist', async function (value) {
                const isUsernameUnique = await checkEmailUniqueness(value);
                return isUsernameUnique;
            }),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol')
    });

    async function checkEmailUniqueness(email: string) {
        return !usernames?.find((user: IUsers) => user.email === email) ? true : false;
    }
    async function checkUsernameUniqueness(username: string) {
        return !usernames?.find((user: IUsers) => user.username === username) ? true : false;
    }

    return (
        <div className='w-screen h-screen'>
            <div style={{ backgroundImage: `url(${BG})` }} className="w-full h-full bg-cover bg-repeat flex items-center justify-center">
                <motion.div 
                initial={{scale:0}}
                animate={{scale:1,dur:0.2}}
                exit={{scale:1}}
                className="w-[340px] transition-all shadow-lg drop-shadow-lg shadow-gray-300 p-4 bg-white rounded-md">
                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className='w-full flex flex-col gap-3'>
                            <InputText name='username' id='username' label='Username' />
                            <InputEmail name='email' id='email' label='Email' />
                            <InputPassword name='password' id='password' label='Password' required={true}/>
                            <span className='self-start flex items-center gap-2'>
                                <input type='checkbox' id='tc' className='cursor-pointer' onChange={(e) => handleSubmitButton(e.target.checked)} />
                                <div className='text-sm'>I agree with <Link to={'/terms&conditions'} className='text-blue-500 font-medium cursor-pointer'>terms & conditions</Link></div>
                            </span>
                            <span className='self-start'>
                                <div className='text-sm'>Already registered ! <Link to={'/'} className='text-blue-500 font-medium cursor-pointer'>Click here</Link></div>
                            </span>
                            <button disabled={disableSubmitButton} type='submit' className='font-medium text-white bg-blue-600 disabled:bg-blue-300 w-full py-1.5 rounded-md hover:bg-blue-700'>Register</button>
                        </Form>
                    </Formik>
                </motion.div>
            </div>
        </div>
    );
}

export default Register;
