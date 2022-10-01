import { NextApiRequest, NextApiResponse } from "next";

import { AirRecords, Record } from "../products/[name]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  const x: {
    id: string;
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

  const qa = JSON.stringify({ records: x });

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const reqOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: qa,
    // redirect: "follow",
  };

  const cc = () =>
    fetch(
      // `https://api.airtable.com/v0/${process.env.base_id}/products/${prod.id}?api_key=${process.env.api_key}`,
      `https://api.airtable.com/v0/${process.env.base_id}/products/?api_key=${process.env.api_key}`,
      reqOptions
    );
  // .then((response) => response.text())
  // .then((result) => e.push(result))
  // .catch((error) => console.log("error", error));

  cc();

  res.status(200).json({ qa });
};
