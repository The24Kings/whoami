import { useEffect, useState } from "react";

import { BreadCrumb } from "./BreadCrumb";
import type { CrumbProps } from "./BreadCrumb";

import "./CommandLine.css";

interface CommandLineProps {
  path: CrumbProps[];
  command: string;
}

// Types out `command` character-by-character, calling `onTick` after each step.
function animate(command: string, onTick: (text: string) => void) {
  const delay = 50;
  const speed = 35;

  let index = 0;
  let intervalId: ReturnType<typeof setInterval>;

  const startTimeout = setTimeout(() => {
    intervalId = setInterval(() => {
      index += 1;
      onTick(command.slice(0, index));
      if (index >= command.length) clearInterval(intervalId);
    }, speed);
  }, delay);

  return () => {
    clearTimeout(startTimeout);
    clearInterval(intervalId);
  };
}

export const CommandLine = ({ path, command }: CommandLineProps) => {
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [prevCommand, setPrevCommand] = useState(command);
  const [blink, setBlink] = useState(true);

  const isTyping = displayedCommand !== command;
  const showCursor = isTyping || blink;

  // Clear instantly whenever the command changes
  if (command !== prevCommand) {
    setPrevCommand(command);
    setDisplayedCommand("");
  }

  // Typing animation for the command
  useEffect(() => {
    if (command === "") return;

    return animate(command, setDisplayedCommand);
  }, [command]);

  // Blinking Cursor
  useEffect(() => {
    if (isTyping) return;

    const interval = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, [isTyping]);

  return (
    <div id="navbar" role="group" aria-label="Breadcrumb">
      <div className="prompt">
        <span className="user">portfolio</span>
        <span className="cli-separator">@</span>
        <span className="hostname">navigator</span>
        <span className="cwd">
          {path.map((crumb, i) => (
            <BreadCrumb
              key={`${crumb.name}-${i}`}
              current={i === path.length - 1}
              {...crumb}
            />
          ))}
        </span>
        <span className="separator">{"> "}</span>
        <span className="cmd">
          <bdi>{displayedCommand}</bdi>
        </span>
        <span
          className={`cursor${showCursor ? " is-visible" : ""}`}
          aria-hidden="true"
        >
          █
        </span>
      </div>
    </div>
  );
};
