import { ReactNode } from "react";
export type ReactChildren = {
  children: ReactNode;
};
export default function Center({ children }: ReactChildren) {
  return (
    <div className="flex items-center justify-center h-screen">{children}</div>
  );
}
