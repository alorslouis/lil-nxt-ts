import Image from "next/image";

function About() {
  return (
    <>
      <div className="items-center my-10">
        <div className="font-semibold text-lg">hecho en barcelona</div>
        <div>par hamez</div>
        <div className="p-8 m-8 rounded-lg border border-white">
          <Image
            src={"/IMG_8860.jpeg"}
            width={100}
            height={100}
            layout={"responsive"}
            alt="the studio - barcelona es"
            className="rounded-md"
          />
        </div>
      </div>
    </>
  );
}

export default About;
