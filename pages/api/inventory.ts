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

  const qa =
    x.length > 1
      ? JSON.stringify({ records: x })
      : JSON.stringify({ fields: x[0].fields });

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const reqOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: qa,
    // redirect: "follow",
  };

  const cc = () => {
    if (x.length > 1) {
      fetch(
        // `https://api.airtable.com/v0/${process.env.base_id}/products/${prod.id}?api_key=${process.env.api_key}`,
        `https://api.airtable.com/v0/${process.env.base_id}/products/?api_key=${process.env.api_key}`,
        reqOptions
      );
    } else {
      fetch(
        `https://api.airtable.com/v0/${process.env.base_id}/products/${x[0].id}?api_key=${process.env.api_key}`,
        reqOptions
      );
    }
  };
  // .then((response) => response.text())
  // .then((result) => e.push(result))
  // .catch((error) => console.log("error", error));

  cc();

  res.status(200).json({ qa });
};
