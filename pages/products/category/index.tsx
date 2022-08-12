import { NextPage } from "next";
import Link from "next/link";

const categories = ["jeans", "jacket"];

const Categories: NextPage = () => {
  return (
    <div>
      <h1 className="text-xl font-extralight">categories</h1>
      <ul className="grid md:grid-cols-2 p-6 my-4 mx-auto gap-2">
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/products/category/${category}`}>
              <p className="cursor-pointer font-thin">{category}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
