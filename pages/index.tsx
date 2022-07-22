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
    records: Record[];
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products/?api_key=${process.env.api_key}`
  );
  const recs = (await res.json()) as AirRecords;

  return {
    props: {
      recs,
    },
  };
};

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
  const products = recs;
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
        <ul className="grid grid-cols-2 gap-4">
          {products &&
            products.records.map((record) => (
              <li key={record.id}>
                <Link href={`/products/${record.id}`}>
                  <div className="flex-col aspect-square cursor-pointer m-2 py-2  rounded-3xl hover:-translate-y-1 transition hover:ease-in-out hover:shadow-lg active:translate-y-1  active:ease-in-out active:shadow-lg">
                    <Image
                      key={record.fields.attach[0].url}
                      src={record.fields.attach[0].url}
                      width={record.fields.attach[0].width}
                      height={record.fields.attach[0].height}
                      // layout="fill"
                    />

                    <div className="font-bold text-base">
                      {record.fields.title}
                    </div>
                    {/* <div>{record.fields.brand}</div> */}
                  </div>

                  {/* <div>{record.fields}</div> */}
                  {/* <div className="font-thin">price</div> */}
                </Link>
              </li>
            ))}
        </ul>

        {/* <div className="flex-col flex-auto m-8 py-8 border-double border-neutral-900 border-4 rounded-md">
          <div>img</div>
          <div className="font-bold text-lg">product name</div>
          <div>product brand</div>
          <div className="font-thin">price</div>
        </div> */}

        {/* <div>{products ? products.records[0].fields.date : "loading"}</div> */}
        {/* <div>{records ? records.length : "loading"}</div> */}
      </div>
      {/* <div>{records[0].id}</div> */}
      {/* <div>{Object(records)</div> */}
    </>
  );
};

export default Home;
