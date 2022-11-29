import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
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
      <main className="mt-48 max-w-screen-md mx-auto  text-black dark:text-white font-body mb-24">
        {children}
      </main>
      <Footer />
    </>
  );
}

type props = {
  children: ReactNode;
};
