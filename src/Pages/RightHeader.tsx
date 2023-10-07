import { type FC } from 'react';
import maleavatar from '../Assets/maleavatar.jpg'
import femaleavatar from '../Assets/femaleavatar.jpg'
import otheravatar from '../Assets/otheravatar.jpg'
import ActionPop from '../Components/PopUp/ActionPop';
import { useNavigate } from 'react-router-dom';
import { IUsers } from '../TypesAndInterfaces/TypesAndInterfaces';
import { BsArrowLeft } from 'react-icons/bs';

interface RightHeaderProps {
    userDetails: IUsers
}

const RightHeader: FC<RightHeaderProps> = ({ userDetails }) => {
    const navigate = useNavigate();
    const handleBlock = () => {
        window.alert('Clicked On Block.')
    }
    const handleProfile = () => {
        window.alert('Clicked On View Profile.')
    }
    const actios = [
        { id: 1, name: 'View Profile', click: handleProfile },
        { id: 2, name: 'Block', click: handleBlock },
    ]
    
    return (
        <div className="w-full h-20 bg-sky-100 flex items-center justify-between px-3 border-b">
            <div className="flex items-center gap-3">
                <span onClick={() => navigate('/home')} className='text-2xl cursor-pointer text-blue-600'><BsArrowLeft /></span>
                <img src={userDetails.profileImage === null ? (userDetails.gender === 'male' ? maleavatar : userDetails.gender === 'female' ? femaleavatar : otheravatar) : `http://localhost:5000/api/${userDetails.profileImage.url}`} alt={'profile'} className='w-14 h-14 min-h-14 min-w-14 rounded-full' />
            </div>
            <div className="flex items-center gap-2">
                <ActionPop action={actios} icon='FiMoreVertical' />
            </div>
        </div>
    );
}

export default RightHeader;
