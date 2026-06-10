"use client";

import Link from "next/link";

export default function HomeButton() {
  return (
    <Link
      href="/"
      className="
        fixed
        top-6
        right-6
        z-50
        opacity-80
        hover:opacity-100
        transition-opacity
        duration-500
      "
    >
      <img
        src="/aa-logo.png"
        alt="Home"
        className="
          w-[58px]
          h-[58px]
          object-contain
        "
      />
    </Link>
  );
}