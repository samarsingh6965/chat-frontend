import type { FC } from 'react';

interface ChatPageSkeletonProps { }

const ChatPageSkeleton: FC<ChatPageSkeletonProps> = () => {
    return (
        <div className="w-full h-full flex flex-col px-2 bg-gray-100">
            <div className="w-full h-[94%] flex flex-col gap-2 px-4 py-2">
                <div className='py-3.5 w-24 shadow-md bg-white animate-pulse rounded-md' />
                <div className='py-3.5 w-24 shadow-md bg-green-200 animate-pulse rounded-md self-end' />
                <div className='py-3.5 w-24 shadow-md bg-white animate-pulse rounded-md' />
                <div className='py-3.5 w-24 shadow-md bg-green-200 animate-pulse rounded-md self-end' />
                <div className='py-3.5 w-24 shadow-md bg-green-200 animate-pulse rounded-md self-end' />
                <div className='py-3.5 w-24 shadow-md bg-white animate-pulse rounded-md' />
                <div className='py-3.5 w-24 shadow-md bg-green-200 animate-pulse rounded-md self-end' />
                <div className='py-3.5 w-24 shadow-md bg-green-200 animate-pulse rounded-md self-end' />
                <div className='py-3.5 w-24 shadow-md bg-white animate-pulse rounded-md' />
                <div className='py-3.5 w-24 shadow-md bg-white animate-pulse rounded-md' />
                <div className='py-3.5 w-24 shadow-md bg-green-200 animate-pulse rounded-md self-end' />
                <div className='py-3.5 w-24 shadow-md bg-green-200 animate-pulse rounded-md self-end' />
                <div className='py-3.5 w-24 shadow-md bg-green-200 animate-pulse rounded-md self-end' />
                <div className='py-3.5 w-24 shadow-md bg-white animate-pulse rounded-md' />
                <div className='py-3.5 w-24 shadow-md bg-green-200 animate-pulse rounded-md self-end' />
                <div className='py-3.5 w-24 shadow-md bg-white animate-pulse rounded-md' />
                <div className='py-3.5 w-24 shadow-md bg-green-200 animate-pulse rounded-md self-end' />
            </div>
            <div className="w-full h-[6%] bg-gray-100 flex items-center gap-2 justify-center px-4 py-2">
                <div className="w-[90%] bg-white py-5 rounded-full animate-pulse shadow-md"/>
                <div className="w-[10%]">
                    <div className='w-10 h-10 min-h-10 min-w-10 bg-white rounded-full animate-pulse shadow-md'/>
                </div>
            </div>
        </div>
    );
}

export default ChatPageSkeleton;
