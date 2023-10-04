import { useState, type FC } from 'react';
import InputEmail from '../Components/FormControl/InputEmail';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputPassword from '../Components/FormControl/InputPassword';
import BG from '../Assets/login.jpg'
import InputText from '../Components/FormControl/InputText';
import { Link } from 'react-router-dom';

interface RegisterProps { }

const Register: FC<RegisterProps> = () => {
    const [disableSubmitButton,setDisableSUbmitButton] = useState<boolean>(true)
    const handleSubmit = async (values: { username:string,email: string, password: string }) => {
        console.log('register', values)
    }
    const handleSubmitButton = (value:boolean) => {
        setDisableSUbmitButton(!value)
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });
    return (
        <div className='w-screen h-screen'>
            <div style={{ backgroundImage: `url(${BG})` }} className="w-full h-full bg-cover bg-repeat flex items-center justify-center">
                <div className="w-[340px] shadow-lg drop-shadow-lg shadow-gray-300 p-4 bg-white rounded-md">
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
                            <InputPassword name='password' id='password' label='Password' />
                            <span className='self-start flex items-center gap-2'>
                                <input type='checkbox' id='tc' className='cursor-pointer' onChange={(e)=> handleSubmitButton(e.target.checked)}/>
                                <div className='text-sm'>I agree with <span className='text-red-500 font-medium cursor-pointer'>terms & conditions</span></div>
                            </span>
                            <span className='self-start'>
                                <div className='text-sm'>Already registered ! <Link to={'/'} className='text-red-500 font-medium cursor-pointer'>Click here</Link></div>
                            </span>
                            <button disabled={disableSubmitButton} type='submit' className='text-white bg-red-500 disabled:bg-red-300 w-full py-1.5 rounded-md hover:bg-red-600'>Register</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Register;
