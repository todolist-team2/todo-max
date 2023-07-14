import { ReactNode } from "react";

export default function Aside({ children }: { children: ReactNode }) {
  return (
    <aside>
      <h2 className="blind">별도</h2>
      {children}
    </aside>
  );
}

