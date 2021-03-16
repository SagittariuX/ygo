import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { Image } from "react-bootstrap";

const CardDisplay = (props) => {
  const [showModel, toggleShowModel] = useState(false);

  const {
    data: { name, desc, card_images },
  } = props;

  const {image_url} = card_images[0];

  return (
    <>
      <Card onClick={() => toggleShowModel(!showModel)}>
        <Card.Img variant="top" src={image_url} />
        <Card.Title>{name}</Card.Title>
      </Card>
      <Modal
        show={showModel}
        onHide={() => toggleShowModel(!showModel)}
        centered
      >
        {/* <Modal.Header closeButton></Modal.Header> */}
        <Modal.Body style={{ textAlign: "center" }}>
          <Image src={image_url} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardDisplay;
