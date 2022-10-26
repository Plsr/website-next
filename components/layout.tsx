import Head from 'next/head'
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
      {children}
    </>
  )
}

type props = {
  children: ReactNode;
};
