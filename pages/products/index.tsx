import { GetStaticProps, NextComponentType, NextPage } from "next";
import Link from "next/link";
// import { AirProps } from "..";
import { AirRecords } from "./[name]";
import Image from "next/image";
import { AirProps } from "./category/[category]";
import CatNav from "../components/catNav";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products?filterByFormula=AND(({isActive}=1))&api_key=${process.env.api_key}`
  );
  const recs: AirRecords = await res.json();

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
      {/* <hr /> */}
      <div className="flex flex-col">
        {/* <div className="flex sticky top-0 z-10"> */}
        {/* <div className="flex sticky top-0 z-10 self-start">
          {jj.map((j) => {
            return (
              <Link key={j} href={`products/category/${j}`}>
                <div className=" uppercase text-xs hover:scale-95 font-helvetice self-center bg-slate-600 dark:bg-slate-200 hover:backdrop-brightness-125 border-transparent backdrop-blur-lg first:rounded-bl-lg last:rounded-br-lg active:translate-y-1 active:shadow-lg border-b-2 hover:border-black dark:hover:border-b-white bg-opacity-10 dark:bg-opacity-10 px-4 py-4 cursor-pointer transition-all ease-in-out">
                  {j}
                </div>
              </Link>
            );
          })}
        </div> */}
        <hr />
        <div className="flex sticky top-0 z-10 self-start">
          <CatNav recs={recs} />
        </div>
        {/* </div> */}
        <div className="mx-auto">
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-2  max-w-screen-lg">
            {products &&
              products.records.map((record) => (
                <li key={record.id} className="flex ">
                  <Link href={`/products/${record.fields.route}`}>
                    <div className="flex flex-col grow flex-1 cursor-pointer mx-2 mt-auto p-2 self-center rounded-3xl hover:-translate-y-1 transition ease-in-out hover:shadow-lg active:translate-y-1 active:shadow-lg">
                      <div className="mt-auto">
                        {record.fields?.attach ? (
                          <Image
                            key={record.fields.attach[0].url}
                            alt={record.fields.title}
                            src={record.fields.attach[0].url}
                            width={record.fields.attach[0].width}
                            height={record.fields.attach[0].height}
                            // layout="responsive"
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
                      <p className="font-bold font-helvetice capitalize text-sm md:text-base py-6 mt-auto">
                        {record.fields.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product;
