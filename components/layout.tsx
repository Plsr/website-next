import Head from "next/head";
import Header from "./header";
import { ReactNode } from "react";

export default function Layout({ children }: props) {
  return (
    <>
      <Head>
        <title>Chris Jarling</title>
        <meta
          name="description"
          content="Personal website of Chris Jarling, full stack developer from Germany."
        />
      </Head>
      <Header />
      <div className="mt-48 max-w-screen-md mx-auto">
        {children}
      </div>
    </>
  );
}

type props = {
  children: ReactNode;
};
