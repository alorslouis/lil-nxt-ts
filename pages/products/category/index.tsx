import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { AirRecord, Record } from "../[name]";

const categories = ["jeans", "jacket"];

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const route = params?.category;
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products/?api_key=${process.env.api_key}`
  );
  const recs = (await res.json()) as AirRecord;

  const cats = uniqueOnly(recs.records.map((r) => r.fields.category));

  // const cats = uniqueOnly(cat);

  // console.log(cats);

  // const cats = new Set(cat);

  // const cats = new Set([...recs.records]);

  // console.log(cats);
  return {
    props: {
      recs,
      cats,
    },
  };
};

// function to return only unqiue values from an array

// function returnUnique(arr: string[]) {
//   return [...new Set(arr)];
// }

function uniqueOnly<Type>(e: Type[]): Type[] {
  const f: Type[] = [];

  e.forEach((e) => {
    if (f.indexOf(e) === -1) {
      f.push(e);
    }
  });

  // for (let i = 0; i < e.length; i++) {
  //   if (f.indexOf(e[i]) === -1) {
  //     f.push(e[i]);
  //   }
  // }
  return f;
}

// function uniqueSet<Type>(arr: ) {

// }

interface Props {
  cats: string[];
}

const Categories: NextPage<Props> = ({ cats }) => {
  return (
    <div>
      <h1 className="text-xl font-extralight">categories</h1>
      {/* <ul className="grid md:grid-cols-2 p-6 my-4 mx-auto gap-2">
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/products/category/${category}`}>
              <p className="cursor-pointer font-thin">{category}</p>
            </Link>
          </li>
        ))}
      </ul> */}
      <ul className="grid md:grid-cols-2 p-6 my-4 mx-auto gap-2">
        {cats.map((category: string) => (
          <li key={category}>
            <Link href={`/products/category/${category}`}>
              <p className="cursor-pointer font-thin">{category}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
