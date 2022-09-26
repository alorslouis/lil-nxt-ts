import { GetStaticProps } from "next";
import Image from "next/image";
import { Re, SectionProps } from ".";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/Sections/?filterByFormula=AND(({location}="about"))&api_key=${process.env.api_key}`
  );
  // const records = (await res.json()) as Record[];
  const rea = await res.json();

  return {
    props: {
      rea,
    },
  };
};

function About({ rea }: SectionProps) {
  console.log(rea.records[0]);
  const about = rea.records[0];
  return (
    <>
      <div className="items-center my-10">
        <div className="font-semibold text-lg">{about.fields.Title}</div>
        <div>{about.fields.Caption}</div>
        {about?.fields?.Images && (
          <div className="p-8 m-8 rounded-lg border-2">
            <Image
              src={about?.fields?.Images[0]?.url}
              width={about.fields.Images[0].width}
              height={about.fields.Images[0].height}
              layout={"responsive"}
              alt="the studio - barcelona es"
              className="rounded-md"
              unoptimized
            />
          </div>
        )}
      </div>
    </>
  );
}

export default About;
