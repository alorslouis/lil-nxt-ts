import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import type { Record, AirRecords } from "./products/[name]";

const dummy = {
  records: [
    {
      id: "recL5Yp4djMfD0FMA",
      createdTime: "2022-07-16T22:58:24.000Z",
      fields: {
        date: "2022-06-10",
        isActive: true,
        brand: "levis",
        title: "test",
        size: "34",
      },
    },
    {
      id: "recXjDYbg6IEuAoMq",
      createdTime: "2022-07-16T23:05:00.000Z",
      fields: {
        date: "2022-06-10",
        isActive: true,
        brand: "levis",
        title: "testte",
        size: "34",
      },
    },
  ],
};

interface AirProps {
  recs: {
    records: {
      id: string;
      createdTime: string;
      fields: {
        date: string;
        isActive: boolean;
        brand: string;
        title: string;
        size: string;
      };
    }[];
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products/?api_key=${process.env.api_key}`
  );
  const recs = (await res.json()) as AirProps;

  return {
    props: {
      recs,
    },
  };
};

const Home: NextPage<AirProps> = ({ recs }) => {
  const products = recs;
  // console.log(products);
  // console.log(products.records[0]);
  // console.log(recs.records);
  // console.log(dummy);
  return (
    <>
      <div className="container text-center py-8">
        {/* <div>{products}</div> */}
        <ul>
          {dummy.records.map((record) => (
            <li key={record.id}>
              <Link href={`/products/${record.id}`}>
                <div>{record.fields.title}</div>
              </Link>
            </li>
          ))}
        </ul>

        {/* <div>{records[0].fields.brand}</div> */}
        <ul>
          {products &&
            products.records.map((record) => (
              <li key={record.id}>
                <Link href={`/products/${record.id}`}>
                  <div>
                    {record.fields.title}, {record.fields.brand}
                  </div>
                </Link>
              </li>
            ))}
        </ul>
        <div className="flex-col flex-auto m-8 py-8 border-double border-neutral-900 border-4 rounded-md">
          <div>img</div>
          <div className="font-bold text-lg">product name</div>
          <div>product brand</div>
          <div className="font-thin">price</div>
        </div>
        {/* <div>{products ? products.records[0].fields.date : "loading"}</div> */}
        {/* <div>{records ? records.length : "loading"}</div> */}
      </div>
      {/* <div>{records[0].id}</div> */}
      {/* <div>{Object(records)</div> */}
    </>
  );
};

export default Home;
