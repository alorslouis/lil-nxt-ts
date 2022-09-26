import { NextApiRequest, NextApiResponse } from "next";

import { AirRecords, Record } from "../products/[name]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  const x = req.body.content.items.map((item: any) => {
    return {
      id: item.id,
      fields: {
        quantity: 0,
      },
    };
  });
  const xx = { records: x };
  const up = async () => {
    await fetch(`https://api.airtable.com/v0/${process.env.base_id}/products`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.api_key,
      },
      body: JSON.stringify(xx),
    });
  };

  up();

  res.status(200).json({ d: "d", xx, up });
};
