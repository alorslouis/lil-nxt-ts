import { GetStaticProps } from "next";
import Router from "next/router";
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

  console.log({ catNav: recs });
  return <div>{JSON.stringify(recs)}t</div>;
}

async function GetRecs() {
  const res = await fetch("/api/products");

  const [data, setData] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch("/api/products")
      .then((response) => response.json())
      .then((json) => {
        if (!ignore) {
          setData(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);
  return data;
}

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
