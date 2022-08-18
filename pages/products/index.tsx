import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { AirProps } from "..";
import { AirRecords } from "./[name]";
import Image from "next/image";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products/?api_key=${process.env.api_key}`
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

  // console.log(products);

  return (
    <div>
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-2 mx-auto max-w-screen-md">
        {products &&
          products.records.map((record) => (
            <li key={record.id} className="flex flex-grow ">
              <Link href={`/products/${record.fields.route}`}>
                <div className="flex flex-col flex-1 cursor-pointer mx-8 mt-auto p-2 self-center rounded-3xl hover:-translate-y-1 transition ease-in-out hover:shadow-lg active:translate-y-1 active:shadow-lg">
                  <div>
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

                  <p className="font-thin text-base py-6 mt-auto lowercase">
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
