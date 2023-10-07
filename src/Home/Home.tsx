import type { FC } from 'react';
import LeftBar from '../Pages/LeftBar';
import { Outlet, useLocation } from 'react-router-dom';
import bgchat1 from '../Assets/bgchat1.jpeg'

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const { pathname } = useLocation();
    return (
        <div className="w-screen h-screen">
            <div className="w-full h-full bg-gray-100 p-2 relative flex gap-2">
                <div className="sm:w-[450px] w-full min-w-full sm:min-w-[450px] h-full border">
                    <LeftBar />
                </div>
                <div className={`w-full h-full relative`}>
                    {pathname === '/home' ?
                        <div style={{backgroundImage:`url(${bgchat1})`}} className="w-full h-full blur-container"></div>
                        :
                        <Outlet />}
                </div>
            </div>
        </div>
    );
}

export default Home;
