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

  const MAXPAGEDISPLAY = 30;

  useEffect(() => {
    setResults(data);
    setPage(1);
  }, [data]);

  useEffect(() => {
  }, [page]);

  const handlePageClick = (e) => {
    setPage(Number(e.target.name));
  };

  const buildDisplayCardList = () => {
    return results
      .filter(
        (item, index) =>
          index >= MAXPAGEDISPLAY * (page - 1) && index < page * MAXPAGEDISPLAY
      )
      .map((item, index) => <CardDisplay data={item} key={index} />);
  };

  const buildPaginationBar = (length) => {
    let pages = [];
    let count = 1;
    console.log(length);
    do {
      console.log(count);
      pages.push(
        <PageItem
          active={count === page}
          key={count}
          name={count}
          onClick={count === page ? null : handlePageClick}
        >
          {count}
        </PageItem>
      );
    } while (count++ * MAXPAGEDISPLAY < length);
    return pages;
  };

  if (results) {
    return (
      <div id="card-gallery" className="container-xl">
        {buildDisplayCardList()}
        <div className="pagination-section">
          <Pagination>{buildPaginationBar(results.length)}</Pagination>
        </div>
      </div>
    );
  }

  return <div id="card-gallery" className="container-xl"></div>;
}

export default CardGallery;
