import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <main>
      <h2 className="blind">메인</h2>
      {children}
    </main>
  );
}
