import { useEffect, type FC, useContext, useState } from 'react';
import { } from 'react-icons'
import { IoMdNotifications } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { DataContext } from '../Context/DataProvider';

interface NotificationIconProps { }

const NotificationIcon: FC<NotificationIconProps> = () => {
    const { socket } = useContext(DataContext);
    const [notificationCount, setNotificationCount] = useState<number>(0);
    console.log(notificationCount)
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') ?? '[]')
    console.log(userDetails)
    useEffect(() => {
        // notification
        socket?.on('connect', () => {
            console.log('Connected to the WebSocket server from notification icon', socket?.id);
        });

        socket?.on('notification', (data: any) => {
            console.log('notification', data);
            setNotificationCount(prevCount => prevCount + 1);
        });

        return () => {
            socket?.off('notification');
        };
        // eslint-disable-next-line
    }, []);
    return (
        <div className="fixed top-7 right-12 z-50">
            <Link to={'/notification'} className="relative">
                <IoMdNotifications size={35} className='cursor-pointer' />
                <p className='absolute right-0 -top-1 text-white bg-red-600 h-6 w-6 text-xs font-medium rounded-full flex items-center justify-center'>{notificationCount}</p>
            </Link>
        </div>
    );
}

export default NotificationIcon;
