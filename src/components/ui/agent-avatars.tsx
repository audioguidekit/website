import React from "react";
import { cn } from "@/lib/utils";

// Rounded brand avatars, matching the shape/proportions of @lobehub/icons'
// `<Brand>.Avatar` components (circle background + scaled mono glyph),
// hand-rolled here to avoid pulling in the antd-style runtime that package depends on.

const avatarClass = "size-6 rounded-full ring-2 ring-background shrink-0";

export function ClaudeAvatar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(avatarClass, className)}
      style={{ background: "#D97757" }}
      aria-label="Claude"
    >
      <title>Claude</title>
      <path
        transform="translate(3 3) scale(0.75)"
        fill="#fff"
        fillRule="evenodd"
        d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"
      />
    </svg>
  );
}

export function CursorAvatar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(avatarClass, className)}
      style={{ background: "#000" }}
      aria-label="Cursor"
    >
      <title>Cursor</title>
      <path
        transform="translate(4.8 4.8) scale(0.6)"
        fill="#fff"
        d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z"
      />
    </svg>
  );
}

export function V0Avatar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(avatarClass, className)}
      style={{ background: "#000" }}
      aria-label="v0"
    >
      <title>v0</title>
      <path
        transform="translate(3 3) scale(0.75)"
        fill="#fff"
        fillRule="evenodd"
        d="M14.252 8.25h5.624c.088 0 .176.006.26.018l-5.87 5.87a1.889 1.889 0 01-.019-.265V8.25h-2.25v5.623a4.124 4.124 0 004.125 4.125h5.624v-2.25h-5.624c-.09 0-.179-.006-.265-.018l5.874-5.875a1.9 1.9 0 01.02.27v5.623H24v-5.624A4.124 4.124 0 0019.876 6h-5.624v2.25zM0 7.5v.006l7.686 9.788c.924 1.176 2.813.523 2.813-.973V7.5H8.25v6.87L2.856 7.5H0z"
      />
    </svg>
  );
}

export function CodexAvatar({ className }: { className?: string }) {
  return (
    // The static Codex mark already ships its own white rounded backing
    // square; clipping it to a circle here matches the other two avatars.
    <span className={cn(avatarClass, "inline-flex overflow-hidden bg-white", className)}>
      <img src="/icons/codex.svg" alt="Codex" className="w-full h-full" />
    </span>
  );
}

export function LovableAvatar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(avatarClass, className)}
      style={{ background: "#000" }}
      aria-label="Lovable"
    >
      <title>Lovable</title>
      <path
        transform="translate(4.2 4.2) scale(0.65)"
        fillRule="evenodd"
        fill="url(#lovable-avatar-gradient)"
        d="M7.082 0c3.91 0 7.081 3.179 7.081 7.1v2.7h2.357c3.91 0 7.082 3.178 7.082 7.1 0 3.923-3.17 7.1-7.082 7.1H0V7.1C0 3.18 3.17 0 7.082 0z"
      />
      <defs>
        <radialGradient
          id="lovable-avatar-gradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-1 22.49999 -30.45394 -1.3535 14 3)"
        >
          <stop offset=".25" stopColor="#FE7B02" />
          <stop offset=".433" stopColor="#FE4230" />
          <stop offset=".548" stopColor="#FE529A" />
          <stop offset=".654" stopColor="#DD67EE" />
          <stop offset=".95" stopColor="#4B73FF" />
        </radialGradient>
      </defs>
    </svg>
  );
}
