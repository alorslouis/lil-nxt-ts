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
  size: string;
  priceEur: number;
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

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products?api_key=${process.env.api_key}`
  );
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.records.map((post: Record) => ({
    params: { name: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const route = params?.name;
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products/${route}/?api_key=${process.env.api_key}`
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

  const product: Record = post;

  return (
    <>
      <div className="flex flex-col items-center lg:flex-row">
        <div className="w-full lg:w-3/5">
          <div className="carousel rounded-box">
            {/* <div className="flex flex-auto flex-col"> */}
            {product.fields.attach &&
              product?.fields?.attach.map((attach) => (
                <div
                  key={attach.url}
                  className="carousel-item w-full self-center "
                >
                  <Zoom>
                    <Image
                      src={attach.url}
                      alt={product.fields.title}
                      width={attach.width}
                      height={attach.height}
                      className="w-full"
                    />
                  </Zoom>
                </div>
              ))}
          </div>
          {/* </div> */}
        </div>

        {/* <div className="self-center flex flex-auto gap-2"> */}
        <div className="flex flex-auto mx-auto p-4 flex-col self-center">
          <div className="font-bold text-2xl">{product.fields.title}</div>
          <div className="font-medium text-sm">– {product.fields.brand} –</div>
          <div className="text-sm">size: {product.fields.size}</div>
          <div className="font-thin">€{product.fields.priceEur}</div>
          {/* test - record: {name} */}
          {/* size: {product.fields.size}
          category: {product.fields.category}
          test - record: {product.id}, {product.createdTime}
          test - price: €{product.fields.priceEur} */}
          {/* <div> */}
          <button
            className="snipcart-add-item btn btn-primary p-4 m-4 bg-black text-white "
            data-item-id={product.id}
            data-item-price={product.fields.priceEur}
            data-item-url={`/products/${product.id}`}
            data-item-image={
              product.fields.attach &&
              product.fields.attach[0].thumbnails.large.url
            }
            data-item-name={product.fields.title}
          >
            +
          </button>
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
