import { User } from "../../../../types/Users";
import { LoggedUser } from "../../../../utils/utils";
import css from './ChatContainer.module.css';

type ChatData = {
    room?: string,
    message: string,
    user?: User | undefined
}

type Props = {
    chats: ChatData[],
    receiper: User
}

const ChatContainer = ({chats, receiper}: Props) => {
    const user = LoggedUser();

    function SenderChat(chat: ChatData) {
        return (
            <div className={css.senderRow}>
                <span className={css.senderCol}>
                    {chat.user?.email}<br />
                    {chat.message}
                </span>
            </div>
        )
    }

    function ReceiperChat(chat: ChatData) {
        return (
            <div className={css.receiperRow}>
                <span className={css.receiperCol}>
                    {chat.user?.email}<br />
                    {chat.message}
                </span>
            </div>
        )
    }

    return (
        <>
            <div className={css.chatContainer}>
                {
                    chats.map((chat, index) => (
                        <div key={index} className={css.chatRow}>
                            {
                                user?.email === chat.user?.email ? ReceiperChat(chat) : SenderChat(chat)
                            }
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default ChatContainer;