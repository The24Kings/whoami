import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router";

import { useCommandContext } from "../../lib";
import { BreadCrumb } from "./BreadCrumb";
import {
  slideDown,
  staggerContainer,
  staggerItem,
  type DirectoryNavigation,
} from "../../lib";
import type { ExternalLink, PostResp } from "../../types";

import "./Navigation.css";

interface PageEntryProps {
  post: PostResp;
  base: string;
}

const PageEntry = ({ post, base }: PageEntryProps) => {
  const navigate = useNavigate();
  const setCommand = useCommandContext();
  const variant = /\.[^/]+$/.test(post.slug) ? "file" : "folder";
  const label =
    variant === "folder" ? `${post.slug} folder` : `${post.slug} file`;

  return (
    <motion.li variants={staggerItem}>
      <BreadCrumb
        name={post.slug}
        variant={variant}
        aria-label={label}
        onClick={() => {
          setCommand(
            variant === "folder" ? `cd ${post.slug}/` : `cat ${post.slug}`,
          );
          navigate(`${base}/${post.slug}`);
        }}
      />
    </motion.li>
  );
};

interface LinkEntryProps {
  link: ExternalLink;
}

const LinkEntry = ({ link }: LinkEntryProps) => {
  return (
    <motion.li variants={staggerItem}>
      <a
        className="symlink"
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${link.name} (opens in a new tab)`}
      >
        <em>{link.name}</em> {"->"} <em>{link.url}</em>
      </a>
    </motion.li>
  );
};

interface NavigateEntryProps {
  name: string;
  to: string;
  label: string;
}

const NavigateEntry = ({ name, to, label }: NavigateEntryProps) => {
  const navigate = useNavigate();
  const setCommand = useCommandContext();

  return (
    <motion.li variants={staggerItem}>
      <BreadCrumb
        name={name}
        variant="folder"
        aria-label={label}
        onClick={() => {
          setCommand(`cd ${name}`);
          navigate(to);
        }}
      />
    </motion.li>
  );
};

interface NavigationProps {
  open: boolean;
  directory: DirectoryNavigation;
}

export const Navigation = ({ open, directory }: NavigationProps) => {
  const { pathname } = useLocation();
  const { base, pages, links } = directory;

  function parentDir(path: string) {
    const parts = path.split("/");
    const parent = parts.slice(0, -1).join("/");

    return parent === "" ? "/" : parent;
  }

  return (
    <motion.nav
      id="navigation"
      role="navigation"
      aria-label="Directory contents"
      variants={slideDown}
      initial="exit"
      animate={open ? "animate" : "exit"}
    >
      <motion.ul className="pages" variants={staggerContainer} inert={!open}>
        <NavigateEntry name="." to={pathname} label="Current directory" />
        <NavigateEntry name=".." to={parentDir(pathname)} label="Back" />

        {pages.map((page) => (
          <PageEntry key={page.slug} post={page} base={base} />
        ))}
        {links.map((link) => (
          <LinkEntry key={link.url} link={link} />
        ))}
      </motion.ul>
    </motion.nav>
  );
};
