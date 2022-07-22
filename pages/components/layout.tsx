import Head from "next/head";
import Link from "next/link";
import Script from "next/script";

export default function Layout({ children }: any) {
  return (
    <>
      <Head>f</Head>
      <div className="container flex flex-col mx-auto ">
        <nav className="text-center py-4 flex self-center ">
          <div className="">
            <Link href="/">
              <h1 className="text-bold font-black text-4xl text-center cursor-pointer">
                LILLIES
              </h1>
            </Link>
            <p className="text-xs font-extralight">BCN • LDN • SAN</p>
          </div>
          {/* <div className="justify-end">cart</div> */}
          {/* <hr /> */}
          {/* <div className="snipcart-checkout">cart</div>
          <span className="snipcart-items-count"></span>
          <span className="snipcart-total-price"></span>
          <div className="flex justify-evenly py-4">
            <p>cat2</p>
            <p>cat2</p>
            <p>cat2</p>
          </div> */}
          {/* <p className="text-xl">custom couture</p> */}
        </nav>
        <main className="text-center ">{children}</main>

        <footer className="text-center">
          <div className="btm-nav  backdrop-blur-xl bg-white/20 dark:bg-black/20 py-4  bottom-0">
            <Link href="/about">
              <button className="active">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {/* <span className="btm-nav-label">about</span> */}
              </button>
            </Link>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {/* <span className="btm-nav-label">home</span> */}
            </button>

            <button className="snipcart-checkout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              {/* <span className="btm-nav-label">cart</span> */}
            </button>
          </div>
          {/* <div>
            <Link href="/about">about</Link>
          </div> */}
        </footer>
      </div>
    </>
  );
}
