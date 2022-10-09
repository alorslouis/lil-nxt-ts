import { GetStaticProps } from "next";
import Router from "next/router";
import { AirRecords } from "../products/[name]";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products?filterByFormula=AND(({isActive}=1))&api_key=${process.env.api_key}`
  );
  const recs = (await res.json()) as AirRecords;

  return {
    props: {
      recs,
    },
  };
};

const CatNav = ({ recs }: { recs: AirRecords }) => {
  console.log(recs);
  return <div>t</div>;
};

export default CatNav;
