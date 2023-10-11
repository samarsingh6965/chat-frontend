import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { IoMdSend } from 'react-icons/io';
import { GoDotFill } from 'react-icons/go';
import { toast } from 'react-toastify';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { IUsers, responseType } from '../TypesAndInterfaces/TypesAndInterfaces';
import moment from 'moment';
import { DataContext } from '../Context/DataProvider';
import http from '../Services/http/http';
interface ChatPageProps {
    userDetails: IUsers | undefined
}
type MesssageMeta = {
    from?: string | undefined
    to?: string | undefined
    message?: any
}

const ChatPage: FC<ChatPageProps> = ({ userDetails }) => {
    const { socket } = useContext(DataContext);
    const containerRef: React.MutableRefObject<null> = useRef(null); // Use 'null' initially
    const [messages, setMessages] = useState<any[]>([]);
    const loggedInUser = JSON.parse(sessionStorage.getItem('userDetails') ?? '[]')
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [messagesJSON, setMessagesJSON] = useState<MesssageMeta>({ from: loggedInUser?._id, to: userDetails?._id });
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    // const [isInputActive, setInputActive] = useState(false);
    // console.log(isInputActive)

    const fetchMessages = async () => {
        try {
            const response: responseType = await http({
                url: '/message/getMessages',
                method: 'get',
                data: {
                    from: userDetails?._id,
                    to: loggedInUser?._id
                }
            });
            const response2: responseType = await http({
                url: '/message/getMessages',
                method: 'get',
                data: {
                    from: loggedInUser?._id,
                    to: userDetails?._id
                }
            });
            if (response?.data?.code === 'SUCCESS_200' && response2?.data?.code === 'SUCCESS_200') {
                setMessages(response?.data?.data?.concat(response2?.data?.data))
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error('Error fetching Chats.');
            }
        }
    }

    useEffect(() => {
        fetchMessages()
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // message
        socket?.on('connect', () => {
            console.log('Connected to the WebSocket server', socket?.id);
        });
        socket?.on('message', (newMessage: any) => {
            if (newMessage.from === userDetails?._id) {
                setMessages(prevMessages => [...prevMessages, newMessage]);
            } else {
                // notification logic here
                console.log('message from other chat')
            }
        });
        // typing
        socket?.on("typing", (newMessage: any) => {
            if (newMessage?.from === userDetails?._id) {
                setIsTyping(true)
            } else {
                console.log('someone else is typing...')
            }
        })
        socket?.on("stop_typing", () => {
            setIsTyping(false)
        })

        return () => {
            socket?.off('message');
        };
        // eslint-disable-next-line
    }, []);
    const sendMessage = (): void => {
        socket?.emit('message', messagesJSON);
        setMessages([...messages, messagesJSON]);
        socket?.emit('stop_typing', messagesJSON);
        setTyping(false);
    };
    useEffect(() => {
        const ActiveChat = (): void => {
            socket?.emit('active_chat', messagesJSON);
        };
        ActiveChat();
        // eslint-disable-next-line
    }, [userDetails])
    const handleSend = () => {
        sendMessage()
        if (inputRef.current) {
            inputRef.current.value = ''; // Reset input using ref
        }
    }
    // typing...
    const handleTyping = (e: any) => {
        setMessagesJSON({ ...messagesJSON, message: e.target.value })
        if (!typing) {
            setTyping(true)
            socket?.emit("typing", messagesJSON)
        }
        let lastTypingTime = new Date().getTime();
        setTimeout(() => {
            let timeNow = new Date().getTime();
            let timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= 3000 && typing) {
                socket?.emit('stop_typing', messagesJSON);
                setTyping(false);
            }
        }, 3000);
    }

    // group by date
    const groupedMessages: Record<string, any[]> = {};
    if (Array.isArray(messages)) {
        messages?.forEach((message: any) => {
            const messageDate = moment(message?.timestamp).format('YYYY-MM-DD');
            if (!groupedMessages[messageDate]) {
                groupedMessages[messageDate] = [];
            }
            groupedMessages[messageDate].push(message);
        });
    }

    const sortedGroupedMessages = Object.keys(groupedMessages).map((date) => {
        return {
            date,
            messages: groupedMessages[date]
                .sort((a, b) => {
                    const timeA = new Date(a.timestamp).getTime();
                    const timeB = new Date(b.timestamp).getTime();
                    return timeA - timeB;
                })
        };
    }).sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
    });
    // group by date

    // scroll bottom 
    const scrollToBottom = () => {
        if (containerRef.current) {
            const containerElement = containerRef.current as HTMLDivElement;
            containerElement.scrollTop = containerElement.scrollHeight;
        }

    };
    useEffect(() => {
        scrollToBottom();
        // eslint-disable-next-line
    }, [messages]);

    return (
        <div className={`w-full h-full flex flex-col`}>
            <div ref={containerRef} className={`w-full h-[94%] bg-gray-100 px-4 overflow-y-scroll`}>
                {sortedGroupedMessages?.map((group: any) => (
                    <div key={group.date}>
                        <div className='w-full py-1 flex items-center justify-center sticky top-2 z-20'>
                            <p className='text-xs bg-gray-200 px-2 py-1 rounded-md'>{moment(group.date).isSame(moment(), 'day')
                                ? 'Today'
                                : moment(group.date).isSame(moment().subtract(1, 'days'), 'day')
                                    ? 'Yesterday'
                                    : moment(group.date).format('MMM D, YYYY')}</p>
                        </div>
                        {group.messages?.sort((a: any, b: any): number => { const timeA = new Date(a.timestamp).getTime(); const timeB = new Date(b.timestamp).getTime(); return timeA - timeB; })?.map((message: any, index: number) => (
                            <React.Fragment key={index}>
                                {
                                    <div className={`flex gap-1 items-center ${message.from === loggedInUser?._id ? 'justify-end' : 'justify-start'} my-2 text-sm`}>
                                        <div className={`flex gap-4 ${message.from !== loggedInUser?._id && 'flex-row-reverse'}`}>
                                            <p className={`py-1.5 flex gap-3 rounded-b-md px-2 drop-shadow-2xl relative ${message.from === loggedInUser?._id ? 'bg-green-100 rounded-tl-md' : 'bg-white rounded-tr-md'}`}>
                                                {message.message}
                                                <span className='text-[10px] leading-none flex items-end'> {moment(message?.timestamp).format('h:mm A')}</span>
                                            </p>
                                        </div>
                                    </div>
                                }
                            </React.Fragment>
                        ))}
                        {isTyping === true ?
                            <div className="flex items-center justify-center w-16 border h-8 rounded-2xl">
                                <p className='flex items-center justify-center animate-bounce'><GoDotFill/></p>
                                <p className='flex items-center justify-center animate-bounce'><GoDotFill/></p>
                                <p className='flex items-center justify-center animate-bounce'><GoDotFill/></p>
                            </div>
                            : null
                        }
                    </div>
                ))}
            </div>
            <BsChevronDoubleDown onClick={scrollToBottom} className='fixed bottom-[7%] z-50 right-6 cursor-pointer w-8 h-8 bg-gray-600 text-white rounded-full p-1.5 bg-opacity-70' />
            <div className='w-full h-[6%] flex items-center justify-center gap-2'>
                <input
                    ref={inputRef}
                    // onFocus={() => setInputActive(true)}
                    // onBlur={() => setInputActive(false)}
                    onChange={(e) => handleTyping(e)}
                    onKeyDown={e => { if (e.key === 'Enter') { sendMessage(); e.currentTarget.value = ''; } }}
                    type="text" placeholder='Message' className='border-2 rounded-full outline-none px-3 py-1.5 w-[90%] bg-white text-gray-500' />
                <div className='bg-blue-400 w-10 h-10 rounded-full flex justify-center items-center'>
                    <button type='submit' onClick={handleSend}><IoMdSend className='text-lg text-white' /></button>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;