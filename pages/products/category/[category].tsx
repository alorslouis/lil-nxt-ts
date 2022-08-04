import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { AirProps } from "../..";
import { Record, AirRecords } from "../[name]";
import Image from "next/image";

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
      <Link href={"/products/category"}>
        <h1 className="text-xl font-semibold">{category}</h1>
      </Link>
      <ul className="grid grid-cols-2 gap-4 p-2">
        {product.records.map((prod) => (
          <li key={prod.id} className="flex flex-grow">
            <Link href={`/products/${prod.id}`}>
              <div className="flex flex-col flex-1 cursor-pointer mx-2 mt-auto py-2 self-center  rounded-3xl hover:-translate-y-1 transition ease-in-out hover:shadow-lg active:translate-y-1   active:shadow-lg">
                <div>
                  {prod.fields?.attach ? (
                    <Image
                      key={prod.fields.attach[0].url}
                      alt={prod.fields.title}
                      src={prod.fields.attach[0].url}
                      width={prod.fields.attach[0].width}
                      height={prod.fields.attach[0].height}
                      layout="responsive"
                    />
                  ) : (
                    <Image
                      // key={}
                      src="/lilsOg.png"
                      width={700}
                      height={400}
                      // layout="fill"
                    />
                  )}
                </div>
                <div>{prod.fields.title}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Category;
