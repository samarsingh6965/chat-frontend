import type { FC } from 'react';
import LeftHeader from './LeftHeader';
import { BsSearch } from 'react-icons/bs';
import avatar from '../Assets/avatar.jpg'

interface LeftBarProps { }

const LeftBar: FC<LeftBarProps> = () => {
    return (
        <div className="w-full h-full flex flex-col bg-blue-100">
            <div className="w-full">
                <LeftHeader />
            </div>
            <div className="w-full flex items-center justify-center p-2 relative border-b">
                <input type="search" name="search" id="search" placeholder='Search' className='w-full p-2 outline-none border-none rounded-md ps-10 placeholder:text-gray-600 placeholder:font-medium text-gray-900 font-medium' />
                <BsSearch className='text-xl absolute left-4' />
            </div>
            <div className="w-full">
                <div className="w-full border-b flex gap-3 items-center p-2 hover:bg-sky-100">
                    <img onClick={() => { window.alert('Clicked on Profile.') }} src={avatar} alt={'profile'} className='w-12 h-12 min-h-12 min-w-12 rounded-full cursor-pointer' />
                    <div className="flex flex-col cursor-pointer">
                        <h1 className='font-medium'>Name Name</h1>
                        <h3 className='text-sm'>username</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftBar;
