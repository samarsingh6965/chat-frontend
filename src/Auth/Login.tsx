import { type FC } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputPassword from '../Components/FormControl/InputPassword';
import BG from '../Assets/login.jpg'
import InputText from '../Components/FormControl/InputText';
import { Link, useNavigate } from 'react-router-dom';
import { responseType } from '../TypesAndInterfaces/TypesAndInterfaces';
import http from '../Services/http/http';
import { toast } from 'react-toast';

interface LoginProps { }

const Login: FC<LoginProps> = () => {
    const navigate = useNavigate();
    const handleSubmit = async (values: { username: string, password: string }) => {
        try {
            const response: responseType = await http({
                url: '/auth/login',
                method: 'post',
                data: values
            }, true);
            if (response.data?.code === 'SUCCESS_200') {
                sessionStorage.setItem('token', response.data.data.token);
                sessionStorage.setItem('userDetails', JSON.stringify(response.data.data.userDetail))
                setTimeout(() => {
                    navigate('/home')
                }, 2000);
                toast.success(response?.data?.message)
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error: any | unknown) {
            toast.error((error as any)?.response?.data?.message);
        }
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
            password: Yup.string().required('Password is required')
            .min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol')
    });
    return (
        <div className='w-screen h-screen'>
            <div style={{ backgroundImage: `url(${BG})` }} className="w-full h-full bg-cover bg-repeat flex items-center justify-center">
                <div className="w-[340px] shadow-lg drop-shadow-lg shadow-gray-300 p-4 bg-white rounded-md">
                    <Formik
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className='w-full flex flex-col gap-3'>
                            <InputText name='username' id='username' label='Username OR Email' />
                            <InputPassword name='password' id='password' label='Password' required={true}/>
                            <span className='self-start'>
                                <div className='text-sm'>Not registered yet ! <Link to={'/register'} className='text-blue-500 font-medium cursor-pointer'>Click here</Link></div>
                            </span>
                            <button type='submit' className='font-medium text-white bg-blue-600 disabled:bg-blue-300 w-full py-1.5 rounded-md hover:bg-blue-700'>Login</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Login;
