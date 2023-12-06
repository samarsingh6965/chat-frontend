import { useState, type FC, useEffect, useContext } from 'react';
import RightHeader from './RightHeader';
import { useParams } from 'react-router-dom';
import { IUsers, responseType } from '../TypesAndInterfaces/TypesAndInterfaces';
import http from '../Services/http/http';
import { toast } from 'react-toastify';
import ChatPage from './ChatPage';
import RightHeaderSkeleton from '../Components/Skeletons/RightHeaderSkeleton';
import ChatPageSkeleton from '../Components/Skeletons/ChatPageSkeleton';
import { DataContext } from '../Context/DataProvider';

interface RightBarProps { }

const RightBar: FC<RightBarProps> = () => {
    const { userId } = useParams();
    const [loading, setLoading] = useState<boolean>(true)
    const { isRender } = useContext(DataContext);
    const [user, setUser] = useState<IUsers>()
    const getUserByUserId = async () => {
        try {
            const response: responseType = await http({
                url: '/user/getUserByUserId',
                method: 'get',
                data: { _id: userId }
            });
            if (response.data?.code === 'SUCCESS_200') {
                setUser(response.data.data)
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error: any | unknown) {
            toast.error((error as any)?.response?.data?.message);
        }
    }
    useEffect(() => {
        getUserByUserId()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
        // eslint-disable-next-line
    }, [userId, isRender])
    return (
        <div className="w-full h-full relative">
            {loading ?
                <div className={`h-full w-full z-50 fixed`}>
                    <div className="w-full sm:h-[80px] h-auto fixed inset-x-0 sm:sticky top-2">
                        <RightHeaderSkeleton />
                    </div>
                    <div className="w-full h-full pt-[85px] mt-[5px] sm:pt-0 sm:h-[91%]">
                        <ChatPageSkeleton />
                    </div>
                </div>
                :
                <>
                    <div className={`fixed inset-x-0 sm:sticky top-0 w-full sm:h-[80px] h-auto z-50`}>
                        <RightHeader userDetails={user} />
                    </div>
                    <div className={`w-full h-full pt-[80px] sm:pt-0 sm:h-[91%]`}>
                        <ChatPage userDetails={user} />
                    </div>
                </>
            }
        </div>
    );
}

export default RightBar;
