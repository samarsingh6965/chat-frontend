import type { FC } from 'react';
import RightHeader from './RightHeader';

interface RightBarProps {}

const RightBar: FC<RightBarProps> = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') ?? '[]')
    return (
        <div className="w-full h-full">
            <div className="w-full h-auto">
                <RightHeader userDetails={userDetails}/>
            </div>
            <div className="w-full">

            </div>
        </div>
    );
}

export default RightBar;
