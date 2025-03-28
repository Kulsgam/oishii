import { ReactNode } from "react";
export type ReactChildren = {
  children: ReactNode;
};
export default function Center({ children }: ReactChildren) {
  return (
    <div className="flex h-screen items-center justify-center bg-[#f57600]">{children}</div>
  );
}
