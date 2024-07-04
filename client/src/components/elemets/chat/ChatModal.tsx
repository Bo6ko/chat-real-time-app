import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import css from './ChatModal.module.css';
import { io, Socket } from 'socket.io-client';
import { LoggedUser } from '../../../utils/utils';
import { User } from '../../../types/Users';
import ChatContainer from './chatContainer/ChatContainer';

const apiUrl = process.env.REACT_APP_API_URL;

type ChatData = {
    room?: string,
    message: string,
    user?: User | undefined
}

type Props = {
    receiper: User
}

const chatDataInitial: ChatData = {
    room: '1',
    message: '',
    user: undefined
}

Modal.setAppElement('#root');

const Chat = ({receiper}: Props) => {
    const [chatData, setChatData] = useState<ChatData>(chatDataInitial);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [chats, setChats] = useState<ChatData[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const user = LoggedUser();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setChatData({
            ...chatData, [name]: value
        });
    };

    const onClickOpenChatModal = () => {
        if (!socket) {
            const newSocket = io(`${apiUrl}`);
            setSocket(newSocket);

            newSocket.emit("join_room", user?.id, receiper.id);

            newSocket.on('receive_message', (message: string) => {
                setChats(prevChats => [...prevChats, {message, user: receiper}]);
                console.log(message);
            });

            newSocket.on('connect', () => {
                console.log('Socket connected: ', newSocket.id);
            });

            newSocket.on('disconnect', () => {
                console.log('Socket disconnected');
            });
        }
        setIsModalOpen(true);
    };

    const onClickSend = (e: FormEvent) => {
        e.preventDefault();
        if (chatData.message !== '') {
            // TO DO: Create chat message
            socket?.emit("send_message", chatData);
            setChats(prevChats => [...prevChats, {message: chatData.message, user: user ? user : undefined }]);
            setChatData({ ...chatData, message: '' }); // Clear the message input
        }
    };

    useEffect(() => {        
        return () => {
            socket?.disconnect();
        };
    }, [socket]);

    return (
        <>
            <button onClick={onClickOpenChatModal}>chat</button>
            {isModalOpen && 
                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                    <form onSubmit={onClickSend}>
                        <input
                            type="text"
                            name="message"
                            value={chatData.message}
                            onChange={handleInputChange}
                            placeholder="Input message ..."
                        />
                        <button type='submit'>Send</button>
                        <button type='button' onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </form>
                    <ChatContainer 
                        chats={chats}
                        receiper={receiper}
                    />
                </Modal>
            }
        </>
    );
};

export default Chat;
