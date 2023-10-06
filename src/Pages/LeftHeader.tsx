import type { FC } from 'react';
import avatar from '../Assets/avatar.jpg'
import { BsThreeDotsVertical } from 'react-icons/bs';

interface LeftHeaderProps {}

const LeftHeader: FC<LeftHeaderProps> = () => {
    return (
        <div className="w-full h-20 bg-sky-100 flex items-center justify-between px-2 border-b">
            <img onClick={() => {window.alert('Clicked on Profile.')}} src={avatar} alt={'profile'} className='w-14 h-14 min-h-14 min-w-14 rounded-full cursor-pointer'/>
            <div className="flex items-center gap-2">
                <BsThreeDotsVertical onClick={() => {window.alert('Clicked on Three Dots.')}} className='text-2xl cursor-pointer'/>
            </div>
        </div>
    );
}

export default LeftHeader;
