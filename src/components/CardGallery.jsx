import React, { useEffect, useState } from "react";
import { PageItem, Pagination } from "react-bootstrap";
import CardDisplay from "./CardDisplay";
import "./CardGallery.css";

function CardGallery(props) {
  const {
    searchResult: { data },
  } = props;

  const [results, setResults] = useState(data);
  const [page, setPage] = useState(1);

  const MAXPAGEDISPLAY = 2;

  useEffect(() => {
    setResults(data);
  }, [data]);

  if (results) {
    return (
      <div id="card-gallery" className="container-xl">
        {results.map((item, index) => (
          <CardDisplay data={item} key={index} />
        ))}
        <div className="pagination-section">
          <Pagination>
            <PageItem onClick={(e) => console.log(e)}>1</PageItem>
            <PageItem>2</PageItem>
            <PageItem>3</PageItem>
          </Pagination>
        </div>
      </div>
    );
  }

  return <div id="card-gallery" className="container-xl"></div>;
}

export default CardGallery;
