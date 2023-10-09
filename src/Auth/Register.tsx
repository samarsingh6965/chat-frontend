import { useState, type FC, useEffect } from 'react';
import InputEmail from '../Components/FormControl/InputEmail';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputPassword from '../Components/FormControl/InputPassword';
import BG from '../Assets/login.jpg'
import InputText from '../Components/FormControl/InputText';
import { Link, useNavigate } from 'react-router-dom';
import http from '../Services/http/http';
import { IUsers, responseType } from '../TypesAndInterfaces/TypesAndInterfaces';
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import GenderRadioGroup from '../Components/FormControl/GenderRadioGroup';
import registerlogo from '../Assets/registerlogo.png'

interface RegisterProps { }

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
        gender: Yup.string().required('gender is required'),
        name: Yup.string().required('Name is required'),
        username: Yup.string().required('Username is required')
            .test('check-username', 'username already taken', async function (value) {
                const isUsernameUnique = await checkUsernameUniqueness(value);
                return isUsernameUnique;
            }),
        email: Yup.string().email('Invalid email address')
            .required('Email is required')
            .test('check-email', 'email already exist', async function (value) {
                const isUsernameUnique = await checkEmailUniqueness(value);
                return isUsernameUnique;
            }),
        password: Yup.string().required('Password is required')
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="w-full sm:w-[450px] sm:h-auto h-full transition-all shadow-none sm:shadow-lg drop-shadow-lg shadow-gray-300 sm:px-4 px-10 py-8 bg-white rounded-none sm:rounded-md flex flex-col gap-10 items-center justify-center">
                        <img src={registerlogo} alt="logo" className='px-4'/>
                    <Formik
                        initialValues={{
                            gender: '',
                            name: '',
                            username: '',
                            email: '',
                            password: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className='w-full flex flex-col gap-2'>
                            <Field component={GenderRadioGroup} name="gender" />
                            <span className='text-sm text-red-500'><ErrorMessage name='gender' /></span>
                            <InputText name='name' id='name' label='Name' />
                            <InputText name='username' id='username' label='Username' />
                            <InputEmail name='email' id='email' label='Email' />
                            <InputPassword name='password' id='password' label='Password' required={true} />
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
