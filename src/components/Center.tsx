import { ReactNode } from "react";
export type ReactChildren = {
  children: ReactNode;
};
export default function Center({ children }: ReactChildren) {
  return (
    <div className="flex h-screen items-center justify-center">{children}</div>
  );
}
