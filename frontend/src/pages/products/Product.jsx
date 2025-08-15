import React from "react";
import { useParams } from "react-router";

const ProductPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-xl font-[501]">Product</h1>
      <p>Product ID: {id}</p>
    </div>
  );
};

export default ProductPage;
