'use client';

import React, { useContext, use } from 'react';
import { useSupabase } from 'auth/providers/supabase-provider';
import { sendMessage, getMessages } from 'utils/chat';
import { profileContext } from 'auth/providers/profile-provider';
import { ChatMessage } from 'types/database';
import { Message } from './Message';

function scrollDown(element: HTMLDivElement) {
    element.scrollTo(0, element.scrollHeight);
}

export const Chat = () => {
    const supabase = useSupabase().supabase;
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState<ChatMessage[]>(
        use(getMessages())
    );
    const [chatState, setChatState] = React.useState<
        'SUBSCRIBED' | 'TIMED_OUT' | 'CLOSED' | 'CHANNEL_ERROR'
    >('CLOSED');
    const profile = useContext(profileContext);
    const chatRef = React.useRef<HTMLDivElement>(null);
    const channel = React.useMemo(
        () =>
            supabase
                .channel('chat-messages')
                .on(
                    'postgres_changes',
                    {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'chat-messages',
                    },
                    (payload: { new: ChatMessage }) => {
                        setMessages([...messages, payload.new]);
                        scrollDown(chatRef.current!);
                    }
                )
                .on(
                    'postgres_changes',
                    {
                        event: 'DELETE',
                        schema: 'public',
                        table: 'chat-messages',
                    },
                    (payload) => {
                        setMessages(
                            messages.filter(
                                (message) => message.id !== payload.old.id
                            )
                        );
                    }
                )
                .on(
                    'postgres_changes',
                    {
                        event: 'UPDATE',
                        schema: 'public',
                        table: 'chat-messages',
                    },
                    (payload) => {
                        const updatedMessages = messages.map((message) => {
                            if (message.id === payload.new.id) {
                                return payload.new;
                            }
                        }) as ChatMessage[];

                        setMessages(updatedMessages);
                    }
                ),
        [messages, supabase]
    );

    React.useEffect(() => {
        scrollDown(chatRef.current!);
    }, [messages]);

    React.useEffect(() => {
        if (channel.state.toString() !== 'closed') return;

        channel.subscribe((res) => {
            setChatState(res);
        });
    }, [channel]);

    return (
        <div className="flex flex-col relative w-full h-fit border-2 border-lightgrey-48 bg-grey-100 overflow-hidden rounded-3xl">
            <div className="w-full h-fit py-4 px-[14px] border-b-2 border-lightgrey-48 rounded-t-3xl">
                <h1>Chat</h1>
            </div>
            <span className="block w-full h-24 absolute top-14 left-0 z-10 bg-gradient-to-b from-[rgba(0,0,0,0.4)] to-transparent"></span>
            <div
                className="flex flex-col gap-3 h-44 overflow-y-scroll relative pb-4"
                ref={chatRef}
            >
                {messages.map((message, index) => (
                    <Message key={index} message={message}></Message>
                ))}
            </div>
            <div className="flex px-4 py-[14px] border-t-darkgrey-100 border-t-2">
                <input
                    type="text"
                    placeholder="Ecrit quelque chose"
                    className="bg-transparent focus:outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyUp={(KEY) => {
                        if (KEY.key === 'Enter' && chatState === 'SUBSCRIBED') {
                            sendMessage({
                                message: message,
                                user_id: profile?.id ?? '',
                            });
                            setMessage('');
                        }
                    }}
                />
            </div>
        </div>
    );
};
