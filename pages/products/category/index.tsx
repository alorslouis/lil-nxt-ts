import { NextPage } from "next";

const categories = ["all", "shirts", "pants", "shoes", "accessories"];

const Categories: NextPage = () => {
  return (
    <div>
      <h1>Categories</h1>
      {categories.map((category) => (
        <p>{category}</p>
      ))}
    </div>
  );
};

export default Categories;
