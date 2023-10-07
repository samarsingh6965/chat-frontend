import { useState, type FC } from 'react';
import maleavatar from '../Assets/maleavatar.jpg'
import femaleavatar from '../Assets/femaleavatar.jpg'
import otheravatar from '../Assets/otheravatar.jpg'
import ActionPop from '../Components/PopUp/ActionPop';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProfilePop from '../Components/PopUp/ProfilePop';

interface LeftHeaderProps { }

const LeftHeader: FC<LeftHeaderProps> = () => {
    const [open,setOpen] = useState<boolean>(false)
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') ?? '[]');
    const navigate = useNavigate();
    const handleLogOut = () => {
        sessionStorage.clear();
        // disconnect socket here
        toast.success('Logged Out Successfully.')
        setTimeout(() => {
            navigate('/')
        }, 2000);
    }
    const actios = [
        {id:1,name:'Log Out',click:handleLogOut}
    ]
    const handleProfile = () => {
        setOpen(true)
    }
    return (
        <div className="w-full h-20 bg-sky-100 flex items-center justify-between px-2 border-b">
            <img onClick={handleProfile} src={userDetails.profileImage === null ? (userDetails.gender === 'male' ? maleavatar : userDetails.gender === 'female' ? femaleavatar : otheravatar) : `http://localhost:5000/api/${userDetails.profileImage.url}`} alt={'profile'} className='w-14 h-14 min-h-14 min-w-14 rounded-full cursor-pointer' />
            <div className="flex items-center gap-2">
                <ActionPop action={actios} icon='FiMoreVertical'/>
            </div>
            {open && <ProfilePop open={open} setOpen={setOpen}/>}
        </div>
    );
}

export default LeftHeader;
