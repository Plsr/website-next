import { ReactNode } from "react";

export default function Layout({ children }: props) {
  return <div>{children}</div>;
}

type props = {
  children: ReactNode;
};
