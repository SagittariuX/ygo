import React from "react";

import CardDisplay from "./CardDisplay";
import "./CardGallery.css";

const CardGallery = (props) => {
  const {
    searchResult: { data },
  } = props;
  if (data) {
    return (
      <div id="card-gallery" className="container-xl">
        {data.map((item, index) => <CardDisplay data={item} key={index}/>)}
      </div>
    );
  }
	
  return (
    <div id="card-gallery" className="container-xl">
      <span>No Display</span>
    </div>
  );
};

export default CardGallery;
