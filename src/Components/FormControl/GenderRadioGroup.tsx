import { useFormikContext } from 'formik';
import type { FC } from 'react';

interface GenderRadioGroupProps {
    disabled?: boolean
}

const GenderRadioGroup: FC<GenderRadioGroupProps> = ({ disabled }) => {
    const { values, handleChange }: any = useFormikContext();
    return (
        <div className="space-x-4">
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={values.gender === "male"}
                    onChange={handleChange}
                    className="hidden"
                    disabled={disabled}
                />
                <div className={`
                ${(disabled && values.gender !== 'male') ? ' hover:bg-transparent bg-gray-200 text-gray-700 hover:text-gray-700' : 'hover:bg-blue-500 hover:text-white cursor-pointer'}
                ${disabled && 'cursor-default'} 
                w-16 h-7 rounded-lg flex items-center justify-center border border-gray-300  transition duration-300 ease-in-out 
                ${values.gender === 'male' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}>
                    Male
                </div>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={values.gender === "female"}
                    onChange={handleChange}
                    className="hidden"
                    disabled={disabled}
                />
                <div className={`
                ${(disabled && values.gender !== 'female') ? ' hover:bg-transparent bg-gray-200 text-gray-700 hover:text-gray-700' : 'hover:bg-pink-500 hover:text-white cursor-pointer'}
                ${disabled && 'cursor-default'} 
                w-16 h-7 rounded-lg flex items-center justify-center border border-gray-300  transition duration-300 ease-in-out 
                ${values.gender === 'female' ? 'bg-pink-500 text-white' : 'bg-white text-gray-700'}`}>
                    Female
                </div>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={values.gender === "other"}
                    onChange={handleChange}
                    className="hidden"
                    disabled={disabled}
                />
                <div className={`
                ${(disabled && values.gender !== 'other') ? ' hover:bg-transparent bg-gray-200 text-gray-700 hover:text-gray-700' : 'hover:bg-green-500 hover:text-white cursor-pointer'}
                ${disabled && 'cursor-default'} 
                w-16 h-7 rounded-lg flex items-center justify-center border border-gray-300  transition duration-300 ease-in-out
                ${values.gender === 'other' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}>
                    Other
                </div>
            </label>
        </div>
    );
}

export default GenderRadioGroup;
