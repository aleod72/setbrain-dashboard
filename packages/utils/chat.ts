import { ChatMessage } from 'types/database';
import { createClient } from './supabase-browser';
import { cache } from 'react';

const supabase = createClient();

export const sendMessage = async (message: ChatMessage) => {
    await supabase.from('chat-messages').insert(message);
};

export const getMessages = cache(async () => {
    const { data, error } = await supabase
        .from('chat-messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(100);

    if (error) {
        throw error;
    }
    return data as unknown as ChatMessage[];
});
