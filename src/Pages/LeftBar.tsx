import { useState, type FC, useEffect } from 'react';
import LeftHeader from './LeftHeader';
import { BsSearch } from 'react-icons/bs';
import maleavatar from '../Assets/maleavatar.jpg'
import femaleavatar from '../Assets/femaleavatar.jpg'
import otheravatar from '../Assets/otheravatar.jpg'
import { IUsers, responseType } from '../TypesAndInterfaces/TypesAndInterfaces';
import http from '../Services/http/http';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

interface LeftBarProps { }

const LeftBar: FC<LeftBarProps> = () => {
    const [users, setUsers] = useState<IUsers[] | null>(null)
    const [search,setSearch] = useState<string>('')
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const fetchUsers = async () => {
        try {
            const response: responseType = await http({
                url: '/user/getUsers',
                method: 'get',
                data:{search}
            });
            if (response.data?.code === 'SUCCESS_200') {
                setUsers(response.data.data)
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error: ErrorCallback | unknown) {
            toast.error((error as any)?.response?.data?.message);
        }
    }
    useEffect(() => {
        fetchUsers()
        // eslint-disable-next-line
    }, [search,pathname])
    return (
        <div className="w-full h-full flex flex-col bg-blue-100">
            <div className="w-full">
                <LeftHeader />
            </div>
            <div className="w-full flex items-center justify-center p-2 relative border-b">
                <input onChange={(e) => setSearch(e.target.value)} type="search" name="search" id="search" placeholder='Search' className='w-full p-2 outline-none border-none rounded-md ps-10 placeholder:text-gray-600 placeholder:font-medium text-gray-900 font-medium' />
                <BsSearch className='text-xl absolute left-4' />
            </div>
            <div className="w-full h-auto overflow-y-scroll scrollbar-thin scrollbar-thumb-sky-200">
                {users?.map((user:IUsers) => (
                    <div onClick={() => navigate(`/home/chat/${user._id}`)} key={user._id} className="w-full border-b flex gap-3 items-center p-2 hover:bg-sky-100 cursor-pointer">
                        <img onClick={() => { window.alert('Clicked on Profile.') }} src={user.profileImage === null ? (user.gender === 'male' ? maleavatar : user.gender === 'female' ? femaleavatar : otheravatar) : user.profileImage} alt={'profile'} className='w-12 h-12 min-h-12 min-w-12 rounded-full cursor-pointer' />
                        <div className="flex flex-col">
                            <h1 className='font-medium'>{user.name}</h1>
                            <h3 className={`${user?.lastMessage?.seen === false ? 'font-bold' : 'font-normal'} text-sm truncate`}>{user.lastMessage?.message ?? user.bio}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeftBar;
