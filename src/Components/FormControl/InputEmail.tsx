import { ErrorMessage, Field } from 'formik';
import type { FC } from 'react';

interface InputEmailProps {
    id: string
    name: string
    disabled?: boolean
    ref?: HTMLButtonElement | null
    autoFocus?: boolean
    label:string
    required?:boolean
}

const InputEmail: FC<InputEmailProps> = ({ name, disabled, ref,id, autoFocus ,label,required=true}) => {
    return (
        <div className="relative z-0 w-full group">
            <Field autoFocus={autoFocus} type='email' name={name} id={id} disabled={disabled} ref={ref} className="block py-1.5 px-2 w-full text-sm  rounded text-gray-500 bg-transparent border-[1.5px] border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-[#6D6DA4] peer" placeholder=" " />
            <label htmlFor={name} className='peer-focus:font-medium absolute text-gray-400  font-normal text-sm duration-300 transform -translate-y-4 scale-75 top-1.5 left-2 bg-white  z-10 origin-[0] peer-focus:left-2 peer-focus:text-secondary peer-focus:dark:text-seconborder-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4'>{label} {required === true ? <span className={`text-red-500`}>*</span>:null}</label>
            <span className="text-red-500 text-sm"><ErrorMessage name={name} /></span>
        </div>
    );
}

export default InputEmail;
