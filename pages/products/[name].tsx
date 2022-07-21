import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
  title: string;
  size: string;
  price: number;
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
      <div className=" text-center mx-auto p-4">container</div>
      test - record: {name}
      test - record: {post.fields.title}
      test - record: {product.id}, {product.createdTime}
      test - price: ${product.fields.price}
      <div>
        <button
          className="snipcart-add-item"
          data-item-id={product.id}
          data-item-price={product.fields.price}
          data-item-url={`/products/${product.id}`}
          data-item-image={product}
          data-item-name={product.fields.title}
        >
          Add to Cart
        </button>
      </div>
      {/* <div>img: {product.fields.attach[0].url}</div>
      <div>
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
