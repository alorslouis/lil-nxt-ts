import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

// export interface AirRecords {
//   records: Array<Record>;
// }

export interface AirRecords {
  records: Array<{
    record: Record;
  }>;
}

export interface AirRecord {
  records: Array<{
    id: string;
    createdTime: string;
    fields: Fields;
  }>;
}

export interface Record {
  id: string;
  createdTime: string;
  fields: Fields;
}

export interface Fields {
  date: string;
  isActive: boolean;
  brand: string;
  category: string;
  title: string;
  route: string;
  size: string;
  priceEur: number;
  inventory: number;
  description: string;
  attach: Attachment[];
}

export interface Attachment {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: {
      url: string;
      width: number;
      height: number;
    };
    large: {
      url: string;
      width: number;
      height: number;
    };
    full: {
      url: string;
      width: number;
      height: number;
    };
  };
}

// const which returns x if in dev mode, y if in prod mode
const devOrProd = (x: string, y: string) =>
  process.env.NODE_ENV === "development" ? x : y;

const siteUrl = devOrProd("localhost:3000", "https://lillies.vercel.app");

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products?api_key=${process.env.api_key}`
  );
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.records.map((post: Record) => ({
    params: { name: post.fields.route },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const route = params?.name;
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products?filterByFormula=AND(({route}="${route}"))&api_key=${process.env.api_key}`
  );
  const post = (await res.json()) as Record;

  return {
    props: {
      post,
    },
  };
};

function Product({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { name } = router.query;

  const product: Record = post.records[0];

  // console.log(`${siteUrl}/products/${product.id}`);
  // console.log(product);

  return (
    <>
      <Head>
        <meta
          property="og:image"
          // content="https://lillies.vercel.app/lilsOG.png"
          // content="https://dl.airtable.com/.attachments/3d84ed731f5630b1dc71fd53d6f952b4/878dea8e/IMG_3308.PNG"
          content={product.fields.attach[0].url}
          key="ogimage"
        />
      </Head>
      <div className="flex flex-col items-center lg:flex-row mx-4 my-8">
        <div className="w-2/3 lg:w-2/5 ">
          <div className="carousel rounded-box w-full">
            {/* <div className="flex flex-auto flex-col"> */}
            {/* {product[0].fields.title} */}
            {product?.fields?.attach &&
              product?.fields?.attach.map((attach) => (
                <div
                  key={attach.url}
                  className="carousel-item w-full self-center cursor-all-scroll"
                >
                  <Zoom>
                    <Image
                      src={attach.url}
                      alt={product.fields.title}
                      width={attach.width}
                      height={attach.height}
                      className="w-full"
                      unoptimized
                    />
                  </Zoom>
                </div>
              ))}
          </div>

          {/* </div> */}
        </div>

        {/* <div className="self-center flex flex-auto gap-2"> */}
        <div className="flex flex-auto mx-auto p-8 flex-col self-center items-center md:w-2/5">
          <div className="my-1 font-thin text-2xl lowercase">
            {product?.fields?.title}
          </div>
          <div className="my-1 font-bold uppercase text-sm">
            – {product.fields.brand} –
          </div>
          <div className="my-1 text-sm font-thin">
            size: {product.fields.size}
          </div>
          <div className="my-1 font-thin">€{product.fields.priceEur}</div>
          {/* test - record: {name} */}
          {/* size: {product.fields.size}
          category: {product.fields.category}
          test - record: {product.id}, {product.createdTime}
          test - price: €{product.fields.priceEur} */}
          {/* <div> */}
          <button
            className="snipcart-add-item btn btn-primary p-4 m-4 bg-black text-white w-2/3"
            data-item-id={product.id}
            data-item-price={product.fields.priceEur}
            // data-item-url={`${siteUrl}/products/${product.id}`}
            data-item-url={"api/products"}
            data-item-image={
              product?.fields?.attach &&
              product?.fields?.attach[0]?.thumbnails?.large?.url
            }
            data-item-name={product.fields.title}
          >
            +
          </button>
          <p className="p-2 my-2 font-thin font-serif">
            {product.fields.description}
          </p>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
      {/* <div>img: {product.fields.attach[0].url}</div> */}

      {/* <div>
        <Image
          src={product.fields.attach[0].url}
          width={product.fields.attach[0].width}
          height={product.fields.attach[0].height}
        />
      </div> */}
    </>
  );
}

export default Product;
