import { NextApiRequest, NextApiResponse } from "next";

import { AirRecords, Record } from "../products/[name]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  const bodyItems = req.body.content.items;

  let x: {
    id: string;
    fields: {
      inventory: number;
    };
  }[] = bodyItems.map((item: any) => {
    return {
      id: item.id,
      fields: {
        inventory: 0,
      },
    };
  });

  const qa = JSON.stringify({ records: x });
  const qs = JSON.stringify({ fields: { inventory: 0 } });
  const qq = x.length !== 0 ? qa : qs;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const reqOptions = {
    method: "PATCH",
    headers: myHeaders,
    // body: qa,
    body: qq,
  };

  const route =
    x.length !== 0
      ? `https://api.airtable.com/v0/${process.env.base_id}/products/?api_key=${process.env.api_key}`
      : `https://api.airtable.com/v0/${process.env.base_id}/products/${x[0].id}?api_key=${process.env.api_key}`;

  const cc = () =>
    fetch(
      // `https://api.airtable.com/v0/${process.env.base_id}/products/${prod.id}?api_key=${process.env.api_key}`,
      // `https://api.airtable.com/v0/${process.env.base_id}/products/?api_key=${process.env.api_key}`,
      route,
      reqOptions
    );

  // if (x.length > 1) {
  cc();
  // } else {
  // cs();
  // }

  const fx = Array.isArray(x);
  const length = x.length;

  // cc();

  res.status(200).json({ qa, array: fx, length: length });
};
