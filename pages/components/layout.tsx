import Head from "next/head";
import Link from "next/link";
import Script from "next/script";

export default function Layout({ children }: any) {
  return (
    <>
      <Head>f</Head>
      <div className="container flex flex-col mx-auto h-screen">
        <nav className="text-center py-4 ">
          <Link href="/">
            <h1 className="text-bold font-black text-4xl text-center cursor-pointer">
              LILLIES
            </h1>
          </Link>
          <p className="text-xs">BCN • LDN • SAN</p>
          <div className="flex justify-evenly py-4">
            <p>cat2</p>
            <p>cat2</p>
            <p>cat2</p>
          </div>
          {/* <p className="text-xl">custom couture</p> */}
        </nav>
        <main className="text-center h-full ">{children}</main>

        <footer className="text-center">
          <p>footer</p>
        </footer>
      </div>
    </>
  );
}
