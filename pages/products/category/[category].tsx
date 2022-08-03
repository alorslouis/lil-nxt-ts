import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { AirProps } from "../..";
import { Record, AirRecords } from "../[name]";

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products?api_key=${process.env.api_key}`
  );
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.records.map((post: Record) => ({
    params: { category: post.fields.category },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const route = params?.category;
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products?filterByFormula=AND(({category}="${route}"))&api_key=${process.env.api_key}`
  );
  const recs = (await res.json()) as AirRecords;

  return {
    props: {
      recs,
    },
  };
};

const Category: NextPage<AirProps> = ({ recs }) => {
  const router = useRouter();
  const { category } = router.query;

  // console.log(recs.records[0]);
  // console.log(category);

  const product = recs;

  // console.log(product);
  return (
    <>
      <h1 className="text-xl font-semibold">{category}</h1>
      <ul className="grid grid-cols-2 gap-4 p-2">
        {product.records.map((prod) => (
          <li key={prod.id}>
            <Link href={`/products/${prod.id}`}>
              <div>{prod.fields.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Category;
