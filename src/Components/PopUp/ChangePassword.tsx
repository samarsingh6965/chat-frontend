import type { FC, MouseEvent } from 'react';
import { motion } from 'framer-motion'
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import { responseType } from '../../TypesAndInterfaces/TypesAndInterfaces';
import http from '../../Services/http/http';
import { toast } from 'react-toastify';
import { BsArrowLeft } from 'react-icons/bs';
import SubmitButton from '../FormControl/SubmitButton';
import InputPassword from '../FormControl/InputPassword';

interface ChangePasswordProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangePassword: FC<ChangePasswordProps> = ({ open, setOpen }) => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') ?? '[]');
    const handleChildClickPrevent = (event: MouseEvent) => {
        event.stopPropagation();
    }
    const validationSchema = Yup.object().shape({
        old_password: Yup.string().required('Password is required'),
        new_password: Yup.string()
            .required('New password is required')
            .notOneOf([Yup.ref('old_password')], "You can't use old password.")
            .min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol'),
        cnf_password: Yup.string()
            .oneOf([Yup.ref('new_password')], 'Passwords not matching')
            .required('Please confirm new password'),
    });
    const handleSubmit = async (values: any) => {
        try {
            values['_id'] = userDetails._id;
            const response: responseType = await http({
                url: '/user/editPassword',
                method: 'put',
                data: values
            });
            if (response.data?.code === 'SUCCESS_200') {
                toast.success(response?.data?.message);
                // sessionStorage.setItem('userDetails', JSON.stringify(response.data.data));
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error: any | unknown) {
            toast.error((error as any)?.response?.data?.message);
        }
    }
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
                        <div className="w-full pt-3">
                            <Formik
                                initialValues={{
                                    old_password: '',
                                    new_password: '',
                                    cnf_password: ''
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                <Form className='flex flex-col gap-4 p-2'>
                                    <InputPassword name='old_password' label='Old password' id='old_password' />
                                    <InputPassword name='new_password' label='New password' id='new_password' />
                                    <InputPassword name='cnf_password' label='Confirm new password' id='cnf_password' />
                                    <SubmitButton label='Update password'/>
                                </Form>
                            </Formik>
                        </div>
                        <span onClick={() => setOpen(false)} className='text-2xl cursor-pointer text-blue-600 absolute left-5 top-4'><BsArrowLeft /></span>
                    </motion.div>
                </motion.div>
            )}
        </div >
    );
}

export default ChangePassword;
