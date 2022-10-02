import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
// import { AirProps } from "..";
import { AirRecords } from "./[name]";
import Image from "next/image";
import { AirProps } from "./category/[category]";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products?filterByFormula=AND(({isActive}=1))&api_key=${process.env.api_key}`
  );
  const recs = (await res.json()) as AirRecords;

  return {
    props: {
      recs,
    },
  };
};

const Product: NextPage<AirProps> = ({ recs }) => {
  const products = recs;

  // lazy set to return unique categories
  const categories = new Set<string>();
  products.records.forEach((e) => {
    categories.add(e.fields.category);
  });
  const jj = Array.from(categories.values());
  console.log(jj);

  // console.log(products);

  return (
    <div>
      {/* category nav bar */}
      <hr />
      <div className="flex sticky top-0 z-10">
        <div className="flex flex-col gap-4 flex-wrap sticky top-0 right-0 -mb-20">
          {jj.map((j) => {
            return (
              <Link key={j} href={`products/category/${j}`}>
                <div className="text-md font-futura bg-slate-800 dark:bg-slate-100 border-l-0 bg-opacity-10 dark:bg-opacity-10 px-4 py-2 first:mt-2 border-2 hover:border-r-slate-400 rounded-r-lg font-extralight cursor-pointer transition-all ease-in-out">
                  {j}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-2 p-2 mx-auto max-w-screen-md">
        {products &&
          products.records.map((record) => (
            <li key={record.id} className="flex ">
              <Link href={`/products/${record.fields.route}`}>
                <div className="flex flex-col grow flex-1 cursor-pointer mx-2 px-12 mt-auto p-2  self-center rounded-3xl hover:-translate-y-1 transition ease-in-out hover:shadow-lg active:translate-y-1 active:shadow-lg">
                  <div className="mb-auto">
                    {record.fields?.attach ? (
                      <Image
                        key={record.fields.attach[0].url}
                        alt={record.fields.title}
                        src={record.fields.attach[0].url}
                        width={record.fields.attach[0].width}
                        height={record.fields.attach[0].height}
                        layout="responsive"
                        unoptimized
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

                  <p className="font-thin font-nimb capitalize text-sm md:text-base py-6 mt-auto">
                    {record.fields.title}
                  </p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Product;
