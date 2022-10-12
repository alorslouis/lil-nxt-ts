import { GetStaticProps } from "next";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { AirProps } from "../products/category/[category]";
import { AirRecords } from "../products/[name]";

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch(
//     `https://api.airtable.com/v0/${process.env.base_id}/products?filterByFormula=AND(({isActive}=1))&api_key=${process.env.api_key}`
//   );
//   const recs = (await res.json()) as AirRecords;

//   //   const res = await fetch("http://localhost:3000/api/products");

//   //   const recs = await res.json();

//   return {
//     props: {
//       recs,
//     },
//   };
// };

const CatNav = ({ recs }: AirProps) => {
  const router = useRouter();

  const ff = router.asPath.split("/");
  const cat = ff[ff.length - 1];
  console.log(cat);
  console.log({ catNav: recs });

  const jj = recs.records.map((r) => r.fields.category);

  // const categories = new Set<string>();
  // recs.records.forEach((e) => {
  //   categories.add(e.fields.category);
  // });

  // const jj = Array.from(categories.values());

  return (
    <div className="flex sticky flex-wrap top-0 z-10 self-start">
      {jj.map((j) => {
        return (
          <Link key={j} href={`/products/category/${j}`}>
            <div
              className={`${
                cat === j && "text-amber-400"
              } uppercase text-xs hover:scale-95 font-futura self-center bg-slate-600 dark:bg-slate-200 hover:backdrop-brightness-125 border-transparent backdrop-blur-lg first:rounded-bl-lg last:rounded-br-lg active:translate-y-1 active:shadow-lg border-b-2 hover:border-black dark:hover:border-b-white bg-opacity-10 dark:bg-opacity-10 px-4 py-4 cursor-pointer transition-all ease-in-out`}
            >
              {j}
            </div>
          </Link>
        );
      })}
      t
    </div>
  );
};

export default CatNav;

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
