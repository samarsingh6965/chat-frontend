import type { FC } from 'react';

interface CancelButtonProps {
    label?:string
    onClick:React.MouseEventHandler<HTMLParagraphElement> | undefined
}

const CancelButton: FC<CancelButtonProps> = ({onClick,label}) => {
    return (
        <p onClick={onClick} className='py-1 px-4 border cursor-pointer border-secondary rounded text-sm hover:text-white hover:bg-secondary hover:bg-opacity-60 transition-all duration-300'>{label ?label : 'CANCEL'}</p>
    );
}

export default CancelButton;
