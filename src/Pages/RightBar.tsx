import { useState, type FC, useEffect } from 'react';
import RightHeader from './RightHeader';
import Loader from '../Components/Loader';
import { useParams } from 'react-router-dom';
import { IUsers, responseType } from '../TypesAndInterfaces/TypesAndInterfaces';
import http from '../Services/http/http';
import { toast } from 'react-toastify';
import ChatPage from './ChatPage';

interface RightBarProps { }

const RightBar: FC<RightBarProps> = () => {
    const { userId } = useParams();
    const [loading, setLoading] = useState<boolean>(true)
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
        }, 500);
        // eslint-disable-next-line
    }, [userId])
    return (
        <div className="w-full h-full">
            {loading ?
                <Loader loader={loading} />
                :
                <>
                    <div className="w-full sm:h-[80px] h-auto fixed inset-x-0 sm:sticky top-2">
                        <RightHeader userDetails={user} />
                    </div>
                    <div className="w-full h-full pt-[85px] sm:pt-0 sm:h-[91%]">
                        <ChatPage userDetails={user}/>
                    </div>
                </>
            }
        </div>
    );
}

export default RightBar;
