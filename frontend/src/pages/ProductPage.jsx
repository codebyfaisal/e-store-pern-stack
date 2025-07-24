import React from "react";
import { useParams } from "react-router";

const ProductPage = () => {
  const { id } = useParams();

  return (
    <div>
      ProductPage
      <p>Product ID: {id}</p>
    </div>
  );
};

export default ProductPage;
