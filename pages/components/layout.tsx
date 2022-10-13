import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";

export default function Layout({
  children,
  pageTitle,
}: {
  children: React.ReactNode;
  pageTitle?: string;
}) {
  // get the current pathname
  const path = typeof window !== "undefined" ? window.location.pathname : "";

  const { asPath, pathname } = useRouter();
  console.log(asPath);

  const p = asPath.split("/");
  const pp = p[p.length - 1];
  console.log(pp);

  function FormatPath(p: string) {
    if (p.includes("-")) {
      const ppp = pp.split("-").join(" ").toUpperCase();
      return ppp;
    } else {
      const ppp = pp.toUpperCase();
      return ppp;
    }
  }

  // if @ root then is fine to use the empty string
  // else format the path & prepend with //
  const q = pp == "" ? pp : `LILLIES // ${FormatPath(pp)}`;

  return (
    <>
      <Head>
        <title>{q}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={q} key="ogtitle" />
        <meta
          property="og:description"
          content="custom couture, hecho en barcelona"
          key="ogdesc"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://lillies.vercel.app/lilsOG.png"
          // content="https://dl.airtable.com/.attachments/3d84ed731f5630b1dc71fd53d6f952b4/878dea8e/IMG_3308.PNG"
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content={`LILLIES ${q}`}
          key="ogsitename"
        />
      </Head>
      <div className="container flex flex-col mx-auto ">
        <nav className="text-center py-4 flex self-center ">
          <div className="">
            <Link href="/">
              <h1 className="text-bold font-black font-futura text-8xl text-center cursor-pointer">
                LILLIES
              </h1>
            </Link>
            <p className="text-sm font-extralight font-nimbus">
              BCN • LDN • SAN
            </p>
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
        <main className="text-center mb-12">{children}</main>

        <footer className="text-center">
          <div className="btm-nav flex flex-1 backdrop-blur-xl bg-white/20 dark:bg-black/20 py-4 bottom-0">
            <Link href="/about">
              <button className="active hover:-translate-y-1 transition-transform ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5  hover:stroke-amber-500"
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
            <Link href="/products/category">
              <button className="active hover:-translate-y-1 transition-transform ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-tag hover:stroke-amber-500"
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                {/* <span className="btm-nav-label">about</span> */}
              </button>
            </Link>
            <Link href="/">
              <button className="hover:-translate-y-1 transition-transform ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5  hover:stroke-amber-500"
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
            </Link>

            <Link href="/products">
              <button className="hover:-translate-y-1 transition-transform ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-list hover:stroke-amber-500"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                {/* <span className="btm-nav-label">home</span> */}
              </button>
            </Link>

            <div className="indicator">
              {/* <span className="indicator-item badge badge-secondary">99</span> */}

              <button className="snipcart-checkout hover:-translate-y-1 transition-transform ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-shopping-bag  hover:stroke-amber-500"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {/* <span className="btm-nav-label">cart</span> */}
              </button>
              {/* <span className="indicator-item badge badge-secondary snipcart-items-count"></span> */}
            </div>
          </div>
          {/* <div>
            <Link href="/about">about</Link>
          </div> */}
        </footer>
      </div>
    </>
  );
}
