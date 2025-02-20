import React from "react";

const CardProduct = ({ item }) => {
  // document.getElementById("card-container")
  return (
    <div className="card-container">
      <img className="card-image" src={item.image} alt="" />
      <div className="card-footer">
        <div className="card-type">{item.type}</div>
        <div className="card-title">{item.name}</div>
      </div>
      <div className="card-overflow">
        <p><strong>Title</strong>: {item.name}</p>
        <p><strong>Type</strong>: {item.type}</p>
        <p><strong>Genres</strong>: {item.genres.map((item) => `${item}, `)}</p>
        <p className="card-description"><strong>Description</strong>: {item.description}</p>
        <p><strong>Year</strong>: {item.year}</p>
      </div>
    </div>
  );
};

export default CardProduct;
