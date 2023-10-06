import { useFormikContext } from 'formik';
import type { FC } from 'react';

interface GenderRadioGroupProps { }

const GenderRadioGroup: FC<GenderRadioGroupProps> = () => {
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
                />
                <div className={`w-16 h-7 rounded-lg flex items-center justify-center border border-gray-300 hover:bg-blue-500 hover:text-white cursor-pointer transition duration-300 ease-in-out ${values.gender === 'male' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}>
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
                />
                <div className={`w-16 h-7 rounded-lg flex items-center justify-center border border-gray-300 hover:bg-pink-500 hover:text-white cursor-pointer transition duration-300 ease-in-out ${values.gender === 'female' ? 'bg-pink-500 text-white' : 'bg-white text-gray-700'}`}>
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
                />
                <div className={`w-16 h-7 rounded-lg flex items-center justify-center border border-gray-300 hover:bg-green-500 hover:text-white cursor-pointer transition duration-300 ease-in-out ${values.gender === 'other' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}>
                    Other
                </div>
            </label>
        </div>
    );
}

export default GenderRadioGroup;
