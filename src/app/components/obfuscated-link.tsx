import { type AnchorHTMLAttributes, type ReactNode } from "react";

interface ObfuscatedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  encodedHref: string; // base64-encoded href value
  children: ReactNode;
}

/**
 * Renders a plain <a> tag whose href is base64-encoded in the source.
 * Static HTML scrapers won't find email/phone values; appearance is unchanged.
 */
export function ObfuscatedLink({ encodedHref, children, ...props }: ObfuscatedLinkProps) {
  const href = atob(encodedHref);
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
