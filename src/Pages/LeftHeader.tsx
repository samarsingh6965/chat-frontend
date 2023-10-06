import type { FC } from 'react';
import avatar from '../Assets/avatar.jpg'

interface LeftHeaderProps {}

const LeftHeader: FC<LeftHeaderProps> = () => {
    return (
        <div className="w-full h-20 bg-sky-100 flex items-center px-2 border-b">
            <img src={avatar} alt={'profile'} className='w-14 h-14 min-h-14 min-w-14 rounded-full cursor-pointer filter'/>
        </div>
    );
}

export default LeftHeader;
