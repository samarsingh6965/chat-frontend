import { useState, type FC, useEffect, useContext } from 'react';
import maleavatar from '../Assets/maleavatar.jpg'
import femaleavatar from '../Assets/femaleavatar.jpg'
import otheravatar from '../Assets/otheravatar.jpg'
import ActionPop from '../Components/PopUp/ActionPop';
import { useNavigate } from 'react-router-dom';
import { IUsers, responseType } from '../TypesAndInterfaces/TypesAndInterfaces';
import { BsArrowLeft } from 'react-icons/bs';
import UserProfilePop from '../Components/PopUp/UserProfilePop';
import http from '../Services/http/http';
import { toast } from 'react-toastify';
import { DataContext } from '../Context/DataProvider';

interface RightHeaderProps {
    userDetails: IUsers | undefined
}

const RightHeader: FC<RightHeaderProps> = ({ userDetails }) => {
    const [openProfile, setOpenProfile] = useState<boolean>(false);
    const [actions, setActions] = useState<any[]>([])
    const loggedInUser = JSON.parse(sessionStorage.getItem('userDetails') ?? '[]');
    const { isRender, setIsRender } = useContext(DataContext)
    const navigate = useNavigate();
    const handleBlock = async () => {
        try {
            const response: responseType = await http({
                url: '/user/addToBlockList',
                method: 'put',
                data: { _id: loggedInUser?._id, userId: userDetails?._id }
            });
            if (response.data?.code === 'SUCCESS_200') {
                toast.success(response?.data?.message);
                setIsRender(!isRender)
                sessionStorage.setItem('userDetails', JSON.stringify(response.data.data));
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error: any) {
            toast.error((error as any)?.response?.data?.message)
        }
    }
    const handleUnBlock = async () => {
        try {
            const response: responseType = await http({
                url: '/user/removeFromBlockList',
                method: 'put',
                data: { _id: loggedInUser?._id, userId: userDetails?._id }
            });
            if (response.data?.code === 'SUCCESS_200') {
                toast.success(response?.data?.message);
                setIsRender(!isRender)
                sessionStorage.setItem('userDetails', JSON.stringify(response.data.data))
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error: any) {
            toast.error((error as any)?.response?.data?.message)
        }
    }
    const handleProfile = () => {
        setOpenProfile(true);
    }
    useEffect(() => {
        if (loggedInUser?.block_list?.includes(userDetails?._id)) {
            setActions([
                { id: 1, name: 'View Profile', click: handleProfile },
                { id: 2, name: 'Unblock', click: handleUnBlock }
            ])
        } else {
            setActions([
                { id: 1, name: 'View Profile', click: handleProfile },
                { id: 2, name: 'Block', click: handleBlock }
            ])
        }
        // eslint-disable-next-line 
    }, [userDetails, isRender]);

    return (
        <div className="w-full h-20 bg-sky-100 flex items-center justify-between px-3 border-b">
            <div className="flex items-center gap-3">
                <span onClick={() => navigate('/home')} className='text-2xl cursor-pointer text-blue-600'><BsArrowLeft /></span>
                <img
                    src={userDetails?.profileImage === null ? (userDetails?.gender === 'male' ? maleavatar : userDetails?.gender === 'female' ? femaleavatar : otheravatar) : userDetails?.profileImage}
                    alt={userDetails?.profileImage === null ? 'avatar' : 'profile'}
                    className='w-14 h-14 min-h-14 min-w-14 rounded-full' />
                <div className="flex flex-col items-start">
                    <h1 className='text-lg font-medium'>{userDetails?.name}</h1>
                    <h1 className='text-sm'>{userDetails?.bio}</h1>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <ActionPop action={actions} icon='FiMoreVertical' />
            </div>
            {openProfile && <UserProfilePop open={openProfile} setOpen={setOpenProfile} userDetails={userDetails} />}
        </div>
    );
}

export default RightHeader;
