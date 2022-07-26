import { NextApiRequest, NextApiResponse } from "next";

import { AirRecords, Record } from "../products/[name]";

// get products
const getProducts = async () => {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products?filterByFormula=AND(({isActive}=1))&api_key=${process.env.api_key}`
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
      // id: product.fields.title.replace(/\s+/g, "-").toLowerCase(),
      price: record.fields.priceEur,
      description: record.fields.description,
      image: record?.fields?.attach[0]?.url,
      stock: record.fields.inventory,
      isActive: record.fields.isActive,
      category: record.fields.category,
      // weight: record?.fields?.weight ?? 200,
      dimensions: {
        weight: record?.fields?.weight ?? 200,
        width: 12,
        height: 2,
        length: 12,
      },
      url: process.env.VERCEL_URL
        ? `${process.env.VERCEL_URL}/api/products`
        : "localhost:3000",
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
