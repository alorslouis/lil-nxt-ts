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
  const xx = { records: x };

  const calls = async () => {
    x.forEach(async (item) => {
      const { id, fields } = item;
      const call = await fetch(
        `https://api.airtable.com/v0/${process.env.base_id}/products/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `"Bearer ${process.env.api_key}`,
          },
          method: "PATCH",
          body: JSON.stringify(fields),
        }
      );
      console.log(Error);
      e.push(call);
      return call;
    });
  };

  calls;

  // x.forEach(async (element: any) => {
  //   const { id, fields } = element;
  //   const call = await fetch(
  //     `https://api.airtable.com/v0/${process.env.base_id}/products/${id}?api_key=${process.env.api_key}`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         // Authorization: "Bearer " + process.env.api_key,
  //       },
  //       method: "PATCH",
  //       body: fields,
  //     }
  //   );
  //   console.log(Error);
  //   return call;
  // });

  const e: any = [];

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

  res.status(200).json({ d: "d", x, e });
};
