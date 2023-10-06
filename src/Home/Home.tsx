import type { FC } from 'react';
import LeftBar from '../Pages/LeftBar';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    return (
        <div className="w-screen h-screen">
            <div className="w-full h-full bg-gray-100 p-2 relative">
                <div className="sm:w-[450px] w-full min-w-full sm:min-w-[450px] h-full border">
                    <LeftBar />
                </div>
                <div className="">
                    
                </div>
            </div>
        </div>
    );
}

export default Home;
