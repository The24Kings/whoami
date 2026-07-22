import { useState } from "react";
import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

import { useDirectoryNavigation } from "./lib/useDirectoryNavigation";
import { CommandContext } from "./lib/contexts";
import { useCwdPath } from "./lib/useCwdPath";
import { CommandLine } from "./components/shell/CommandLine";
import { Navigation } from "./components/shell/Navigation";

/** Persistent navigation and main-content frame for every route. */
export default function App({ children }: { children: ReactNode }) {
  const directoryNavigation = useDirectoryNavigation();
  const [command, setCommand] = useState("echo welcome");
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const showNav = hovering || focused;

  const setNavOpen = (open: boolean) => setCommand(open ? "ls -a" : "");

  const closeNav = () => {
    setHovering(false);
    setFocused(false);
    setNavOpen(false);
  };

  const handleBlur = () => {
    setFocused(false);
    setNavOpen(hovering);
  };

  const handleFocus = () => {
    if (!focused) setNavOpen(true);
    setFocused(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <CommandContext.Provider value={setCommand}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <header
          id="top-bar"
          onMouseEnter={() => {
            setHovering(true);
            setNavOpen(true);
          }}
          onMouseLeave={() => {
            setHovering(false);
            setFocused(false);
            setNavOpen(false);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <CommandLine path={useCwdPath(setCommand)} command={command} />
          <Navigation open={showNav} directory={directoryNavigation} />
        </header>

        {showNav && (
          <div
            className="nav-backdrop"
            aria-hidden="true"
            onPointerDown={closeNav}
          />
        )}

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </CommandContext.Provider>
    </MotionConfig>
  );
}
