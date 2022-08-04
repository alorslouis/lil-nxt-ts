import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import type { Record, AirRecords } from "./products/[name]";

export interface AirProps {
  recs: {
    records: Record[];
  };
}

// function to return unqiue values from a nested object array

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
        <ul className="grid grid-cols-2 gap-4 p-2">
          {products &&
            products.records.map((record) => (
              <li key={record.id} className="flex flex-grow">
                <Link href={`/products/${record.id}`}>
                  <div className="flex flex-col flex-1 cursor-pointer mx-2 mt-auto py-2 self-center rounded-3xl hover:-translate-y-1 transition ease-in-out hover:shadow-lg active:translate-y-1 active:shadow-lg">
                    <div>
                      {record.fields?.attach ? (
                        <Image
                          key={record.fields.attach[0].url}
                          alt={record.fields.title}
                          src={record.fields.attach[0].url}
                          width={record.fields.attach[0].width}
                          height={record.fields.attach[0].height}
                          layout="responsive"
                        />
                      ) : (
                        <Image
                          // key={}
                          src={"/lilsOg.png"}
                          width={700}
                          height={400}
                          // layout="fill"
                        />
                      )}
                    </div>

                    <p className="font-thin text-base py-2 mt-auto lowercase">
                      {record.fields.title}
                    </p>
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
