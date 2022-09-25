import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

import heroImage from "../public/IMG_8603-PhotoRoom.png";
import { Attachment } from "./products/[name]";

export interface Re {
  id: string;
  createdTime: string;
  fields: Fields;
}

export interface Fields {
  Images: Attachment[];
  Caption: string;
  linkTo: string;
  isActive: boolean;
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/Sections/?api_key=${process.env.api_key}`
  );
  // const records = (await res.json()) as Record[];
  const rea = await res.json();

  return {
    props: {
      rea,
    },
  };
};

interface PageProps {
  rea: {
    records: Re[];
  };
}

const Home: NextPage<PageProps> = ({ rea }) => {
  // const products = recs;
  // console.log(products);
  // console.log(products.records[0]);
  // console.log(recs.records);
  // console.log(dummy);

  // console.log(records);

  // const f = x.map((r) => r.id);

  // const f = x[0].id;
  // console.log(f);

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

        {/* <div>{rea.records.map((record) => record.fields.Images.attach)}</div> */}
        <div>
          {rea.records.map((record) => {
            return (
              <div key={record.id}>
                <div className="items-center justify-center gap-8 mx-auto my-12 flex flex-col md:flex-row">
                  {record.fields.Images.map((img) => {
                    return (
                      <div key={img.id} className="w-3/4 md:w/1/3">
                        <Image
                          src={img.url}
                          alt="hero"
                          width={img.width}
                          height={img.height}
                          layout="responsive"
                        />
                      </div>
                    );
                  })}
                </div>
                <button className="p-4 my-2 border-black border-2 rounded-md dark:border-gray-200 hover:border-opacity-20 transition-all ease-in-out ">
                  <Link href={record.fields.linkTo}>
                    {record.fields.Caption}
                  </Link>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
