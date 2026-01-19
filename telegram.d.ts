export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            first_name?: string;
            last_name?: string;
            username?: string;
            id?: number;
          };
        };
      };
    };
  }
}