import { useContext, type FC, useEffect, useState } from 'react';
import LeftBar from '../Pages/LeftBar';
import { Outlet, useLocation } from 'react-router-dom';
import bgchat1 from '../Assets/bgchat1.jpeg'
import { DataContext } from '../Context/DataProvider';
import { io } from 'socket.io-client';
import NotificationIcon from '../Components/NotificationIcon';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const { pathname } = useLocation();
    const { setSocket } = useContext(DataContext);
    const token: string | null = sessionStorage.getItem('token');
    const [notificationCount, setNotificationCount] = useState<number>(0);

    useEffect(() => {
        const socket = io('http://localhost:5000', {
            extraHeaders: {
                token: token || ''
            }
        });
        socket?.on('connect', () => {
            console.log('Connected to the WebSocket server from notification icon', socket?.id);
        });

        socket?.on('notification', (data: any) => {
            setNotificationCount(prevCount => prevCount + 1);
        });

        setSocket(socket);
        // eslint-disable-next-line
    }, [])

    return (
        <div className="w-screen h-screen">
            <div className={`w-full h-full p-2 relative flex gap-2`}>
                <NotificationIcon count={notificationCount}/>
                <div className={`${pathname !== '/home' && 'hidden sm:block'} sm:w-[450px] w-full min-w-full sm:min-w-[450px] h-full border`}>
                    <LeftBar />
                </div>
                <div className={`w-full h-full relative ${pathname !== '/home' && 'block'}`}>
                    {pathname === '/home' ?
                        <div style={{ backgroundImage: `url(${bgchat1})` }} className="w-full h-full blur-container"></div>
                        :
                        <Outlet />}
                </div>
            </div>
        </div>
    );
}

export default Home;
