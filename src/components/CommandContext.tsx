import { createContext, useContext } from 'react';

export const CommandContext = createContext<((cmd: string) => void) | null>(null);

export function useSetCommand() {
    const set = useContext(CommandContext);
    if (!set) throw new Error('useSetCommand must be used inside CommandContext.Provider');
    return set;
}