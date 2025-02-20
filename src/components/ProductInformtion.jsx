import React from "react";

const ProductInformtion = ({ productDetail }) => {
  return (
    <>
      <div className="product-description">
        <p className="product-description-type">Type: {productDetail.type}</p>
        <p className="product-description-type">Year: {productDetail.year}</p>
        <p>{productDetail.description}</p>
      </div>
      <div className="product-genres">
        {productDetail.genres.map((item) => (
          <div key={item.id} className="product-genre">
            <p>{item}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductInformtion;
