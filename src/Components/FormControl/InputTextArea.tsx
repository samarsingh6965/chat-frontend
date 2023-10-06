import { ErrorMessage, Field } from 'formik';
import type { FC } from 'react';
import 'react-quill/dist/quill.snow.css';

interface InputTextAreaProps {
    label: string
    name: string
    required?: boolean
    disabled?: boolean
}

const InputTextArea: FC<InputTextAreaProps> = ({ label, name, required = true, disabled }) => {
    const handleEditorContainerClick = (event: any) => {
        event?.stopPropagation();
    };
    return (
        <div className="relative z-20 w-full" onClick={handleEditorContainerClick}>
            <Field
                as='textarea'
                name={name}
                disabled={disabled}
                className="block py-1.5 px-2 w-full min-h-[75px] max-h-44 text-sm  rounded text-gray-500 bg-transparent border-[1.5px] border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-[#6D6DA4] peer" placeholder=" " />
            <label htmlFor={name} className="peer-focus:font-medium absolute text-gray-400  font-normal text-smduration-300 transform -translate-y-4 scale-75 top-1.5 left-2 bg-white  z-10 origin-[0] peer-focus:left-2 peer-focus:text-secondary peer-focus:dark:text-seconborder-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">{label} {required === true ? <span className="text-red-500">*</span> : null}</label>
            <span className="text-red-500 text-xs "><ErrorMessage name={name} /></span>
        </div>
    );
}

export default InputTextArea;
