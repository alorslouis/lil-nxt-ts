import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import type { Record, AirRecords } from "./products/[name]";
import heroImage from "../public/IMG_8603-PhotoRoom.png";

export interface AirProps {
  recs: {
    records: Record[];
  };
}

// function to return unqiue values from a nested object array

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch(
//     `https://api.airtable.com/v0/${process.env.base_id}/products/?api_key=${process.env.api_key}`
//   );
//   const recs = (await res.json()) as AirRecords;

//   return {
//     props: {
//       recs,
//     },
//   };
// };

const Home: NextPage<AirProps> = () => {
  // const products = recs;
  // console.log(products);
  // console.log(products.records[0]);
  // console.log(recs.records);
  // console.log(dummy);
  return (
    <>
      <div className="container text-center">
        {/* <div>{products}</div> */}
        {/* <ul>
          {dummy.records.map((record) => (
            <li key={record.id}>
              <Link href={`/products/${record.id}`}>
                <div>{record.fields.title}</div>
              </Link>
            </li>
          ))}
        </ul> */}

        {/* <div>{records[0].fields.brand}</div> */}
        <h1 className="font-thin">LANDING PAGE PLACEHOLDER</h1>
        <div className="items-center justify-center mx-auto my-12 flex flex-col md:flex-row">
          <Image src={heroImage} layout="intrinsic" />
          <Image src={heroImage} layout="intrinsic" />
          <Image src={heroImage} layout="intrinsic" />
        </div>
        <Link href="/products">
          <button className="py-4 px-8 m-4 mb-auto rounded-md border-2 hover:border-black">
            products
          </button>
        </Link>
        <div className="items-center justify-center mx-auto my-12 flex flex-col md:flex-row">
          <Image src={heroImage} layout="intrinsic" />
          <Image src={heroImage} layout="intrinsic" />
          <Image src={heroImage} layout="intrinsic" />
        </div>
        <Link href="/products">
          <button className="py-4 px-8 m-4 mb-auto rounded-md border-2 hover:border-black">
            products
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
