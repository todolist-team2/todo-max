import React from "react";

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header>
      <h1 className="blind">헤더</h1>
      {children}
    </header>
  );
}
