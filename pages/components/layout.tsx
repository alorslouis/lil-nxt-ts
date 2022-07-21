import Link from "next/link";
import Image from "next/image";
import styles from "../styles/globals.module.css";

export default function Layout({ children }: any) {
  return (
    <>
      <div className="container mx-auto min-h-screen">
        <div className="text-center py-4 ">
          <Link href="/">
            <h1 className="text-bold font-black text-4xl text-center">
              LILLIES
            </h1>
          </Link>
          <div className="text-xs">BCN • LDN • SAN</div>
          {/* <p className="text-xl">custom couture</p> */}
        </div>
        <main className="text-center h-full">{children}</main>

        <footer className="text-center">
          <p>footer</p>
        </footer>
      </div>
    </>
  );
}
