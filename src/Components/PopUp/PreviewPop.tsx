import { type FC, type MouseEvent } from 'react';
import { motion } from 'framer-motion'

interface PreviewPopProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    url?: string
    username?: string
}

const PreviewPop: FC<PreviewPopProps> = ({ open, setOpen, url, username }) => {
    const handleChildClickPrevent = (event: MouseEvent) => {
        event.stopPropagation();
    }
    const handleDownload = () => {
        const anchor: any = document.createElement('a');
        anchor.href = url;
        anchor.download = username + Date.now().toString();
        anchor.click();
    }
    return (
    <div>
        {open && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className={`fixed z-50 left-0 top-0 w-screen flex items-center justify-center h-screen bg-black bg-opacity-70`}
            >
                <motion.div
                    initial={{ opacity: 0, y: -70 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -70 }}
                    onClick={(event) => handleChildClickPrevent(event)}
                    className="sm:w-[450px] relative rounded-lg shadow-2xl shadow-blue-100 flex flex-col gap-3 items-center sm:mx-0 mx-6 w-full sm:min-w-[450px] h-auto px-4 py-8 bg-white"
                >
                    <div className="w-full h-full min-h-full min-w-full border relative">
                        <img src={url} alt={'profile'} className='w-full h-96 cursor-pointer' />
                    </div>
                    <button onClick={handleDownload} className="bg-blue-500 text-white py-1.5 px-4 rounded-lg">
                        Download
                    </button>
                </motion.div>
            </motion.div>
        )}
    </div>
    );
}

export default PreviewPop;
