// types/telegram.d.ts или global.d.ts
interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
}

interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    close: () => void;
    initDataUnsafe: {
        user?: TelegramUser;
        query_id?: string;
    };
    // другие методы...
}

declare global {
    interface Window {
        Telegram?: {
            WebApp: TelegramWebApp;
        };
        tg?: TelegramWebApp;
    }
}

export {};