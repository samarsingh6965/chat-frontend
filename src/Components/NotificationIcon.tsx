import {  type FC } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { Link } from 'react-router-dom';

interface NotificationIconProps { count:number}

const NotificationIcon: FC<NotificationIconProps> = ({count}) => {
    return (
        <div className="fixed top-7 right-12 z-10">
            <Link to={'/notification'} className="relative">
                <IoMdNotifications size={35} className='cursor-pointer' />
                <p className='absolute right-0 -top-1 text-white bg-red-600 h-6 w-6 text-xs font-medium rounded-full flex items-center justify-center'>{count}</p>
            </Link>
        </div>
    );
}

export default NotificationIcon;
