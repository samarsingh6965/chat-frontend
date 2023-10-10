import { useContext, type FC, useEffect } from 'react';
import LeftBar from '../Pages/LeftBar';
import { Outlet, useLocation } from 'react-router-dom';
import bgchat1 from '../Assets/bgchat1.jpeg'
import { DataContext } from '../Context/DataProvider';
import { io } from 'socket.io-client';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const { pathname } = useLocation();
    const { setSocket } = useContext(DataContext);
    const token: string | null = sessionStorage.getItem('token');

    useEffect(() => {
        const socket = io('http://localhost:5000', {
            extraHeaders: {
                token: token || ''
            }
        });
        setSocket(socket);
        // eslint-disable-next-line
    }, [])

    return (
        <div className="w-screen h-screen">
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
        </div>
    );
}

export default Home;
