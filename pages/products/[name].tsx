import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export interface AirRecords {
  records: Record[];
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

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products/?api_key=${process.env.api_key}`
  );
  const post: Record = await res.json();

  return {
    props: {
      post,
    },
  };
};

function Product({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>test</div>;
}

export default Product;
