import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { AirRecord, AirRecords, Record } from "../[name]";

const categories = ["jeans", "jacket"];

interface Records {
  records: Record[];
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const route = params?.category;
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products?filterByFormula=AND(({isActive}=1))&api_key=${process.env.api_key}`
  );
  const recs = (await res.json()) as Records;

  const ca = new Set<Record>();

  for (let i = 0; i < recs.records.length; i++) {
    ca.add(recs.records[i]);
  }

  // for (let i = 0; i < recs.records.le; i++) {}

  // // const cats = uniqueOnly(recs.records);
  // console.log(cats);

  // const cats = uniqueOnly(cat);

  // console.log(cats);

  // const cats = new Set(cat);

  // const cats = new Set([...recs.records]);

  // console.log(cats);
  return {
    props: {
      recs,
      // cats,
    },
  };
};

// interface Props {
//   cats: string[];
// }
interface Props {
  recs: Records;
}

function ReturnUnique(arr: Records) {
  let matched: string[] = [];
  let unique: Record[] = [];
  arr.records.forEach((e) => {
    if (!matched.includes(e.fields.category)) {
      matched.push(e.fields.category);
      unique.push(e);
    }
  });
  return unique;
}

const Categories: NextPage<Props> = ({ recs }) => {
  console.log(recs);

  const qq = ReturnUnique(recs);
  console.log(qq);

  return (
    <div>
      <ul className="grid grid-cols-2 lg:grid-cols-auto gap-4 p-2 mx-auto max-w-screen-md">
        {qq.map((r) => (
          <li key={r.id} className="flex flex-grow justify-center ">
            <Link href={`/products/category/${r.fields.category}`}>
              <div className="flex flex-col grow flex-1 cursor-pointer mx-2 px-6 mt-auto p-2  self-center rounded-3xl hover:-translate-y-1 transition ease-in-out hover:shadow-lg active:translate-y-1 active:shadow-lg">
                <div className="mt-auto">
                  <Image
                    key={r.fields.attach[0].url}
                    alt={r.fields.title}
                    src={r.fields.attach[0].url}
                    width={r.fields.attach[0].width}
                    height={r.fields.attach[0].height}
                    layout="responsive"
                    // unoptimized
                    onError={(e) => console.log(e)}
                  />
                </div>
                <p className="cursor-pointer font-helvetica my-4 text-center">
                  {r.fields.category}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {/* <ul className="grid md:grid-cols-2 p-6 my-4 mx-auto gap-2">
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/products/category/${category}`}>
              <p className="cursor-pointer font-thin">{category}</p>
            </Link>
          </li>
        ))}
      </ul> */}
      {/* <ul className="grid md:grid-cols-2 p-6 my-4 mx-auto gap-2">
        {cats.map((category: string) => (
          <li key={category}>
            <Link href={`/products/category/${category}`}>
              <p className="cursor-pointer font-thin">{category}</p>
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Categories;
