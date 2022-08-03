import { NextPage } from "next";
import Link from "next/link";

const categories = ["jeans", "jacket"];

const Categories: NextPage = () => {
  return (
    <div>
      <h1 className="text-xl uppercase">Categories</h1>
      <ul className="grid md:grid-cols-2 gap-2">
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/products/category/${category}`}>
              <p>{category}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
