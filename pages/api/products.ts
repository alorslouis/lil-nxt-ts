import { NextApiRequest, NextApiResponse } from "next";

import { AirRecords, Record } from "../products/[name]";

// get products
const getProducts = async () => {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products/?api_key=${process.env.api_key}`
  );
  const recs = await res.json();

  return {
    recs,
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await getProducts();

  const products = response.recs.records.map((record: Record) => {
    return {
      name: record.fields.title,
      id: record.id,
      price: record.fields.priceEur,
      description: record.fields.description,
      image: record.fields.attach[0].url,
      inventory: record.fields.inventory,
    };
  });

  res.status(200).json(products);
};

//   const products = await recs.records.map(async (record) => {});

//   const products = response.records.map(async (product) => {
//     product;
//   });

//   const products = response.records.map((product) => {
//     return {
//       title: product.record.fields.title,
//       id: product.record.fields.title.replace(/\s+/g, "-").toLowerCase(),
//       image: product.record.fields.attach[0].url ,
//       price: product.record.fields.priceEur,
//       description: product.record.fields.description,
//     };
//   });

//   return res.status(200).json(response);
