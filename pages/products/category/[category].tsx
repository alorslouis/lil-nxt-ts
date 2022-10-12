import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
// import { AirProps } from "../..";
import { Record, AirRecords } from "../[name]";
import Image from "next/image";
import CatNav from "../../components/catNav";

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products?api_key=${process.env.api_key}`
  );
  const posts = await res.json();
  //

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
    // `https://api.airtable.com/v0/${process.env.base_id}/products?filterByFormula=AND(({category}="${route}"),({isActive}=1))&api_key=${process.env.api_key}`
    `https://api.airtable.com/v0/${process.env.base_id}/products?filterByFormula=AND(({isActive}=1))&api_key=${process.env.api_key}`
  );
  // const refs: AirRecords = await res.json();
  const recs: AirRecords = await res.json();

  // const recs = refs.records.filter((r: Record) => r.fields.category === route);

  return {
    props: {
      recs,
    },
  };
};

export interface AirProps {
  recs: {
    records: Record[];
  };
}

const Category: NextPage<AirProps> = ({ recs }) => {
  const router = useRouter();
  const { category } = router.query;

  // console.log(recs.records[0]);
  // console.log(category);

  const product = recs.records
    // .map((r) => r)
    .filter((r) => r.fields.category === category);

  const ff = { records: product };

  console.log(product);
  return (
    <>
      <Link href={"/products/category"}>
        <h1 className="text-xl font-futura cursor-pointer">{category}</h1>
      </Link>
      {/* <div className="flex sticky top-0 z-10 self-start"> */}
      <CatNav recs={recs} />
      {/* </div> */}
      <ul className="grid grid-cols-2 lg:grid-cols-auto gap-4 p-2 my-4 mx-auto max-w-screen-md">
        {product.map((prod: Record) => (
          <li key={prod.id} className="flex grow ">
            <Link href={`/products/${prod.fields.route}`}>
              <div className="flex flex-col grow flex-1 cursor-pointer mx-2  mt-auto p-2  self-center rounded-3xl hover:-translate-y-1 transition ease-in-out hover:shadow-lg active:translate-y-1 active:shadow-lg">
                <div>
                  {prod.fields?.attach ? (
                    <Image
                      key={prod.fields.attach[0].url}
                      alt={prod.fields.title}
                      src={prod.fields.attach[0].url}
                      width={prod.fields.attach[0].width}
                      height={prod.fields.attach[0].height}
                      layout="responsive"
                      unoptimized
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
                <p className="font-bold font-futura text-sm md:text-base py-6 mt-auto capitalize">
                  {prod.fields.title}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Category;
