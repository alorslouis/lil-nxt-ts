import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { Record } from "../[name]";

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
  const route = params?.name;
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products?filterByFormula=AND(({category}="jeans"))&api_key=${process.env.api_key}`
  );
  const post = (await res.json()) as Record;

  return {
    props: {
      post,
    },
  };
};

function Category({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { category } = router.query;

  console.log(post);

  const product: Record[] = post;
  return (
    <>
      <h1>{category}test</h1>
    </>
  );
}

export default Category;
