import type {
  NextPage,
  GetStaticProps,
  InferGetStaticPropsType,
  NextApiResponse,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import products from "../api/products";

// export interface AirRecords {
//   records: Array<Record>;
// }

// export interface AirRecords {
//   records: Array<{
//     record: Record;
//   }>;
// }
export interface AirRecords {
  records: Record[];
}

export interface AirRecord {
  records: Array<{
    id: string;
    createdTime: string;
    fields: Fields;
  }>;
}

export interface Record {
  id: string;
  createdTime: string;
  fields: Fields;
}

export interface Fields {
  date: string;
  isActive: boolean;
  brand: string;
  category: string;
  title: string;
  route: string;
  size: string;
  weight?: number;
  priceEur: number;
  inventory: number;
  description: string;
  attach: Attachment[];
}

export interface Attachment {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: {
      url: string;
      width: number;
      height: number;
    };
    large: {
      url: string;
      width: number;
      height: number;
    };
    full: {
      url: string;
      width: number;
      height: number;
    };
  };
}

// const which returns x if in dev mode, y if in prod mode
const devOrProd = (x: string, y: string) =>
  process.env.NODE_ENV === "development" ? x : y;

const siteUrl = devOrProd("localhost:3000", "https://lillies.vercel.app");

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products?filterByFormula=AND(({isActive}=1))&api_key=${process.env.api_key}`
  );
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.records.map((post: Record) => ({
    params: { name: post.fields.route },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const route = params?.name;
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.base_id}/products?filterByFormula=AND(({route}="${route}"))&api_key=${process.env.api_key}`
  );
  const post = (await res.json()) as Record;

  return {
    props: {
      post,
    },
  };
};

function Product({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { name } = router.query;

  const [inStock, setInStock] = useState(false);
  const [invLoading, setInvLoading] = useState(true);

  const product: Record = post.records[0];

  const x: any = [];

  const GI = async () => {
    const inv = await fetch("/api/products");
    const posts = await inv.json();
    // const ff = await posts.map((r: any) => r.stock);

    const fff = await posts.filter((r: any) => r.id === product.id);
    // x.push(posts);
    // console.log(posts);
    // console.log(ff);
    // console.log(fff);
    setInvLoading(false);
    // console.log(qq);

    if (fff[0].stock > 0 && fff[0].isActive) {
      return setInStock(true);
    }
    return setInStock(false);
  };

  useEffect(() => {
    GI();
  }, [inStock]);

  console.log(inStock);

  // if (typeof window !== "undefined") {
  //   GI();
  // }

  // GetInv();
  // GI();
  // const f = GI();

  // console.log(xx);

  const imgsURls = product?.fields?.attach.map((f) => f.url);

  function addProductJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "${product.fields.title}",
      "image": "${imgsURls[0]}",
      "description": "${product?.fields?.description}",
      "offers": {
        "@type": "Offer",
        "url": "https://www.lilliesstudios.com${router.asPath}",
        "priceCurrency": "EUR",
        "price": "${product?.fields?.priceEur}",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": ${
          inStock
            ? '"https://schema.org/InStock"'
            : '"https://schema.org/SoldOut"'
        }
      }
    }
  `,
    };
  }

  return (
    <>
      <Head>
        <meta
          property="og:image"
          content={product.fields.attach[0].url}
          key="ogimage"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>
      <div className="flex flex-col items-center lg:flex-row mx-4 ">
        <div className="lg:w-3/5 mt-4">
          <div className="carousel rounded-box w-full overflow-hidden">
            {/* <div className="flex flex-auto flex-col"> */}
            {/* {product[0].fields.title} */}
            {product?.fields?.attach &&
              product?.fields?.attach.map((attach, index) => (
                <div
                  id={`img-${index + 1}`}
                  key={attach.url}
                  className="carousel-item w-full self-center  cursor-all-scroll"
                >
                  <Zoom>
                    <Image
                      src={attach.url}
                      alt={product.fields.title}
                      width={attach.width}
                      height={attach.height}
                      className="w-full "
                      unoptimized
                    />
                  </Zoom>
                </div>
              ))}
          </div>
          <div className="flex justify-center w-full my-4 gap-2">
            {product?.fields.attach.map((attach, index) => {
              const id = index + 1;
              return (
                <a href={`#img-${id}`} key={attach.id} className="btn btn-xs">
                  {id}
                </a>
              );
            })}
            {/* <a href="#item1" className="btn btn-xs">
              1
            </a>
            <a href="#item2" className="btn btn-xs">
              2
            </a>
            <a href="#item3" className="btn btn-xs">
              3
            </a>
            <a href="#item4" className="btn btn-xs">
              4
            </a> */}
          </div>

          {/* </div> */}
        </div>

        {/* <div className="self-center flex flex-auto gap-2"> */}
        <div className="flex flex-auto mx-auto m-2 md:p-8 flex-col self-center items-center md:w-2/5">
          <div className="my-1 font-helvetica font-bold text-2xl capitalize">
            {product?.fields?.title}
          </div>
          {/* <div>{inStock ? "true" : "false"}</div> */}
          <div className="my-1 font-bold font-helvetica uppercase text-sm">
            – {product.fields.brand} –
          </div>
          <div className="my-1 text-sm font-bold font-helvetica">
            size: {product.fields.size}
          </div>
          <div className="my-1 font-bold font-helvetica">
            €{product.fields.priceEur}
          </div>
          {/* test - record: {name} */}
          {/* size: {product.fields.size}
          category: {product.fields.category}
          test - record: {product.id}, {product.createdTime}
          test - price: €{product.fields.priceEur} */}
          {/* <div> */}
          <button
            className="snipcart-add-item btn btn-primary p-4 m-4 bg-black text-white w-2/3"
            data-item-id={product.id}
            data-item-price={product.fields.priceEur}
            // data-item-url={`${siteUrl}/products/${product.id}`}
            data-item-url={"/api/products"}
            data-item-max-quantity={1}
            data-item-image={
              product?.fields?.attach &&
              product?.fields?.attach[0]?.thumbnails?.large?.url
            }
            // weight is in grams
            data-item-weight={product?.fields?.weight}
            // dimensions are in cm
            data-item-width={12}
            data-item-height={2}
            data-item-length={12}
            data-item-name={product.fields.title}
            // disabled={product.fields.inventory === 0}
            disabled={product.fields.inventory === 0 || !inStock}
          >
            {inStock ? "+" : invLoading ? "checking stock..." : "out of stock"}
          </button>
          <p className="p-2 my-2 font-thin font-helvetica">
            {product.fields.description}
          </p>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
      {/* <div>img: {product.fields.attach[0].url}</div> */}

      {/* <div>
        <Image
          src={product.fields.attach[0].url}
          width={product.fields.attach[0].width}
          height={product.fields.attach[0].height}
        />
      </div> */}
    </>
  );
}

export default Product;
