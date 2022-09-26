import { NextApiRequest, NextApiResponse } from "next";

import { AirRecords, Record } from "../products/[name]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  const x: {
    id: "string";
    fields: {
      inventory: number;
    };
  }[] = req.body.content.items.map((item: any) => {
    return {
      id: item.id,
      fields: {
        inventory: 0,
      },
    };
  });
  const xx = { records: x };

  x.forEach(async (element: any) => {
    const y = element.id;
    const call = await fetch(
      `https://api.airtable.com/v0/${process.env.base_id}/products/${y}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.api_key,
        },
        method: "PATCH",
        body: JSON.stringify(xx),
      }
    );
  });

  // const up = async () => {
  //   await fetch(`https://api.airtable.com/v0/${process.env.base_id}/products`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + process.env.api_key,
  //     },
  //     method: "PATCH",
  //     body: JSON.stringify(xx),
  //   });
  // };

  // up();

  res.status(200).json({ d: "d", x });
};
