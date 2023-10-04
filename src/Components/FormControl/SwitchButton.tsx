import type { FC } from 'react';
import {Field,ErrorMessage} from 'formik'

interface SwitchButtonProps {
    id: string
    name: string
    disabled?: boolean
}

const SwitchButton: FC<SwitchButtonProps> = ({ name, disabled,id }) => {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <Field name={name} id={id} disabled={disabled} type="checkbox"  className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="text-red-500 text-sm"><ErrorMessage name={name} /></span>
        </label>
    );
}

export default SwitchButton;
