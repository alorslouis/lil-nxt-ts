import { GetStaticProps } from "next";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

export default function CatNav({ recs }: AirProps) {
  // const CatNav = () => {
  // const res = await fetch("/api/products");
  // const recs = (await res.json()) as ProductApi[];

  // const f = GetRecs();

  const router = useRouter();

  const ff = router.asPath.split("/");
  const cat = ff[ff.length - 1];
  console.log(cat);
  console.log({ catNav: recs });

  const categories = new Set<string>();
  recs.records.forEach((e) => {
    categories.add(e.fields.category);
  });
  const jj = Array.from(categories.values());
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
    </div>
  );
}

// async function GetRecs() {
//   const res = await fetch("/api/products");

//   const [data, setData] = useState(null);
//   useEffect(() => {
//     let ignore = false;
//     fetch("/api/products")
//       .then((response) => response.json())
//       .then((json) => {
//         if (!ignore) {
//           setData(json);
//         }
//       });
//     return () => {
//       ignore = true;
//     };
//   }, []);
//   return data;
// }

// export default CatNav;

interface ProductApi {
  name: string;
  id: string;
  // id: product.fields.title.replace(/\s+/g, "-").toLowerCase(),
  price: number;
  description: string;
  image: string;
  stock: number;
  isActive: boolean;
  category: string;
}
