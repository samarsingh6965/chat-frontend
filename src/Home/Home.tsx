import { useContext, type FC, useEffect, useState } from 'react';
import LeftBar from '../Pages/LeftBar';
import { Outlet, useLocation } from 'react-router-dom';
import bgchat1 from '../Assets/bgchat1.jpeg'
import { DataContext } from '../Context/DataProvider';
import { io } from 'socket.io-client';
import { motion } from 'framer-motion'

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const { pathname } = useLocation();
    const { setSocket, setShowProgress, setProgress, setShowTick, setIsRender } = useContext(DataContext);
    const token: string | null = sessionStorage.getItem('token');
    const [notifications, setNotifications] = useState<any>({});
    const [showNotification, setShowNotification] = useState<boolean>(false);

    useEffect(() => {
        const socket = io(`${process.env.REACT_APP_SOCKET_URL}`, {
            extraHeaders: {
                token: token || ''
            }
        });
        socket?.on('connect', () => {
            console.log('Connected to the WebSocket server from notification icon', socket?.id);
        });
        socket?.on('notification', (data: any) => {
            setNotifications(data);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 5000);
        });
        socket?.on('blocked', () => {
            setIsRender((prevStatus) => !prevStatus);
        });
        socket?.on('unblocked', () => {
            setIsRender((prevStatus) => !prevStatus);
        });
        socket?.on('upload_progress', (data: number) => {
            // console.log(data)
            setShowProgress(true)
            setProgress(data)
            if (data === 100) {
                setTimeout(() => {
                    setShowProgress(false)
                    setShowTick(true)
                    setTimeout(() => {
                        setShowTick(false)
                    }, 2000);
                }, 500);
            }
        })
        setSocket(socket);
        return () => {
            socket.off('notification')
            socket.off('blocked')
            socket.off('unblocked')
            socket.off('upload_progress')
        }
        // eslint-disable-next-line
    }, [])

    const variants = {
        hidden: {
            translateY: -100,
            opacity: 0,
        },
        visible: {
            translateY: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
            },
        },
    };


    return (
        <div className="w-screen h-screen">
            {showNotification === true &&
                <motion.div
                    className={`w-full fixed top-2 transition-all duration-1000 h-20 bg-sky-200 z-50 flex flex-col px-4 py-2 justify-center`}
                    initial="hidden"
                    animate={showNotification ? "visible" : "hidden"}
                    variants={variants}
                >
                    <h1 className="text-lg font-semibold">
                        {notifications?.from?.name}
                    </h1>
                    <p>
                        {notifications?.lastMessage?.message}
                    </p>
                </motion.div>
            }
            <div className={`w-full h-full p-2 relative flex gap-2`}>
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
        </div >
    );
}

export default Home;
