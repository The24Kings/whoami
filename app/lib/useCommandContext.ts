import { useContext } from "react";
import { CommandContext } from "./contexts";

export const useCommandContext = () => {
    const context = useContext(CommandContext);
    if (!context) {
        throw new Error("useCommandContext must be used within a CommandContext.Provider");
    }
    return context;
};
