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

function ProdCard(rec: Record) {
  return (
    <div className="flex-col flex-auto m-8 py-8 border-double border-neutral-900 border-4 rounded-md">
      <div>img</div>
      <div className="font-bold text-lg">product name</div>
      <div>product brand</div>
      <div className="font-thin">price</div>
      {rec.id}
    </div>
  );
}

const Home: NextPage<AirProps> = ({ recs }) => {
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
        <div className="w-3/5 md:w-2/5 items-center mx-auto">
          <Image src={heroImage} layout="intrinsic" />
        </div>
        <Link href="/products">
          <button className="py-4 px-8 m-4 rounded-md border-2 hover:border-black">
            products
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
