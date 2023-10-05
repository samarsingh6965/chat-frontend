import type { FC } from 'react';
import LeftHeader from './LeftHeader';
import { BsSearch} from 'react-icons/bs';

interface LeftBarProps {}

const LeftBar: FC<LeftBarProps> = () => {
    return (
        <div className="w-full h-full flex flex-col bg-blue-100">
            <div className="w-full">
                <LeftHeader/>
            </div>
            <div className="w-full flex items-center justify-center p-2 relative border-b">
                <input type="search" name="search" id="search" placeholder='Search' className='w-full p-2 outline-none border-none rounded-md ps-10 placeholder:text-gray-600 placeholder:font-medium text-gray-900 font-medium'/>
                <BsSearch className='text-xl absolute left-4'/>
            </div>
            <div className="w-full">

            </div>
        </div>
    );
}

export default LeftBar;
