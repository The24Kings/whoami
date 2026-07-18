import { createContext } from "react";

export const CommandContext = createContext<((cmd: string) => void) | null>(null);

