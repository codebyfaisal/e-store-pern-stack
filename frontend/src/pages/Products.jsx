import React from "react";
import { useParams } from "react-router";

const ProductPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-xl font-[501]">Products</h1>
    </div>
  );
};

export default ProductPage;
