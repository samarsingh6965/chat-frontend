import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { IoMdSend } from 'react-icons/io';
import { ImAttachment } from 'react-icons/im';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BsChevronDoubleDown, BsEmojiSmile } from 'react-icons/bs';
import { FaRegKeyboard } from 'react-icons/fa';
import { IUsers, responseType } from '../TypesAndInterfaces/TypesAndInterfaces';
import moment from 'moment';
import { DataContext } from '../Context/DataProvider';
import http from '../Services/http/http';
interface ChatPageProps {
    userDetails:IUsers|undefined
}
type MesssageMeta = {
    from?: string | undefined
    to?: string | undefined
    message?: any
}

const ChatPage: FC<ChatPageProps> = ({ userDetails}) => {
    const { socket } = useContext(DataContext);
    const [messages, setMessages] = useState<string[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<any>({});
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [messagesJSON, setMessagesJSON] = useState<MesssageMeta>({ from: loggedInUser?._id, to: userDetails?._id });
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    // emoji
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState('');
    // emoji

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
            const response2: responseType = await axios.get('http://localhost:5000/api/meaage/getMessages', {
                params: {
                    from: userDetails?._id,
                    to: loggedInUser?._id
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
                toast.error('Error fetching ChatPages.');
            }
        }
    }
    useEffect(() => {
        let ud = sessionStorage.getItem('userDetails')
        setTimeout(() => {
            setLoggedInUser(ud ? JSON.parse(ud) : {});
        }, 100);
    }, []);
    useEffect(() => {
        fetchMessages()
        // eslint-disable-next-line
    }, [loggedInUser]);

    useEffect(() => {
            if (messagesJSON) {
                socket?.emit("join_room", messagesJSON, (ack: string) => {
                    console.log("Joined room:", ack);
                });
            }
        // eslint-disable-next-line
    }, [open, userDetails])

    useEffect(() => {
        socket?.on('connect', () => {
            console.log('Connected to the WebSocket server', socket?.id);
        });

        socket?.on('message', (newMessage: any) => {
            console.log("newMessage:", newMessage);
            setMessages(prevMessages => [...prevMessages, newMessage]);
            // if (newMessage.from !== loggedInUser.id) {
            //     alert('from' + newMessage.from + ':' + newMessage.message);
            // }
        });
        // typing
        socket?.on("typing", (messageJson:any) => {
            if (messageJson?.from !== loggedInUser.id) {
                setIsTyping(true)
            }
        })
        socket?.on("stop_typing", () => {
            setIsTyping(false)
        })
        // typing
        return () => {
            socket?.off('message');
        };
        // eslint-disable-next-line
    }, []);
    const sendMessage = (): void => {
        socket?.emit('message', messagesJSON);
        socket?.emit('stop_typing', messagesJSON);
        setTyping(false);
        setShowEmojiPicker(false)
        setInputValue('')
    };
    const handleSend = () => {
        sendMessage()
        if (inputRef.current) {
            inputRef.current.value = ''; // Reset input using ref
        }
    }
    // typing...
    const handleTyping = (e: any) => {
        setMessagesJSON({ ...messagesJSON, message: inputValue})
        // emoji
        setInputValue(e.target.value)
        // emoji
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
    // typing...

    // group by date
    const groupedMessages: Record<string, any[]> = {};
    messages?.forEach((message: any) => {
        const messageDate = moment(message?.timestamp).format('YYYY-MM-DD');
        if (!groupedMessages[messageDate]) {
            groupedMessages[messageDate] = [];
        }
        groupedMessages[messageDate].push(message);
    });
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
    const containerRef = useRef(null); // Use 'null' initially
    useEffect(() => {
        scrollToBottom();
        // eslint-disable-next-line
    }, [messages, open]);
    const scrollToBottom = () => {
        if (containerRef.current) {
            const containerElement = containerRef.current as HTMLDivElement;
            containerElement.scrollTop = containerElement.scrollHeight;
        }
    };
    // scroll to bottom
    // three dots options
    const handleBackgroundImageChange = () => {
        setOpenModal(true)
    }
    const action = [
        { id: 1, name: 'Change BackGround', click: handleBackgroundImageChange }
    ]
    // three dots options

    return (
        <>
            {/* <h1>{JSON.stringify(loggedInUser)}</h1> */}
            <div className='w-full h-full flex justify-between flex-col'>
                <div className="w-full h-full ">
                    <div ref={containerRef} className="w-full h-full px-3 scrollbarparimary ChatPage-bg-image py-14">
                        {sortedGroupedMessages.map((group) => (
                            <div key={group.date}>
                                <div className='w-full py-1 flex items-center justify-center sticky top-1 z-20'>
                                    <p className='text-xs bg-gray-100 px-2 py-1 rounded-md'>{moment(group.date).isSame(moment(), 'day')
                                        ? 'Today'
                                        : moment(group.date).isSame(moment().subtract(1, 'days'), 'day')
                                            ? 'Yesterday'
                                            : moment(group.date).format('MMM D, YYYY')}</p>
                                </div>
                                {group.messages?.sort((a: any, b: any): number => { const timeA = new Date(a.timestamp).getTime(); const timeB = new Date(b.timestamp).getTime(); return timeA - timeB; })?.map((message: any, index) => (
                                    <React.Fragment key={index}>
                                        {
                                            <div className={`flex gap-1 items-center ${message.from === loggedInUser?.id ? 'justify-end' : 'justify-start'} my-2 text-sm`}>
                                                <div className={`flex gap-4 ${message.from !== loggedInUser?.id && 'flex-row-reverse'}`}>
                                                    <p className={`py-1.5 flex gap-3 rounded-b-md px-2 drop-shadow-2xl relative ${message.from === loggedInUser?.id ? 'bg-green-100 receiver rounded-tl-md' : 'bg-white sender rounded-tr-md'}`}>
                                                        {message.message}
                                                        <span className='text-[10px] leading-none flex items-end'> {moment(message?.timestamp).format('h:mm A')}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                    </React.Fragment>
                                ))}
                                {isTyping === true ?
                                    <p className='px-3 py-1 w-[100px] rounded-xl mt-1 text-gray-800 bg-gray-100'>typing....</p>
                                    : null
                                }
                            </div>
                        ))}
                    </div>
                    <BsChevronDoubleDown onClick={scrollToBottom} className='fixed bottom-20 z-50 right-6 cursor-pointer w-8 h-8 bg-gray-600 text-white rounded-full p-1.5 bg-opacity-70' />
                    
                </div>
                <div className='flex px-3 pt-1 w-full gap-1 -mb-1.5 fixed bottom-0 bg-white'>
                    <div className='flex justify-center relative w-[90%]'>
                        <input
                        value={inputValue}
                            ref={inputRef}
                            onChange={(e) => handleTyping(e)}
                            onKeyDown={e => { if (e.key === 'Enter') { sendMessage(); e.currentTarget.value = ''; } }}
                            type="text" placeholder='Message' className='border-2 rounded-full outline-none px-8 py-1.5 w-full mb-3 bg-white text-gray-500' />
                        <ImAttachment className=' absolute top-3 right-2.5 text-lg cursor-pointer' />
                        {showEmojiPicker?<FaRegKeyboard onClick={() => setShowEmojiPicker(false)} className={`${showEmojiPicker && 'text-secondary'} absolute top-3 left-2.5 text-lg cursor-pointer`}/>:
                        <BsEmojiSmile onClick={() => setShowEmojiPicker(true)} className={`${showEmojiPicker && 'text-secondary'} absolute top-3 left-2.5 text-lg cursor-pointer`} />}
                    </div>
                    <div className='bg-secondary w-10 h-10 rounded-full flex justify-center items-center'>
                        <button type='submit' onClick={handleSend}>< IoMdSend className=' text-lg text-white' /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage;