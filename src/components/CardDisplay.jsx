import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { Image } from "react-bootstrap";

const cardTypes = {
  "Effect Monster" : 'effect-monster',
  "Flip Effect Monster" : 'effect-monster',
  "Flip Tuner Effect Monster": 'effect-monster',
  "Gemini Monster": 'effect-monster',
  "Normal Monster": 'normal-monster',
  "Normal Tuner Monster" : 'normal-monster',
  "Pendulum Effect Monster" : 'pendulum-monster',
  "Pendulum Flip Effect Monster" : 'pendulum-monster',
  "Pendulum Normal Monster": 'pendulum-monster',
  "Pendulum Tuner Effect Monster" : 'pendulum-monster',
  "Ritual Effect Monster": 'ritual-monster',
  "Ritual Monster":'ritual-monster',
  "Skill Card" : 'skill-card',
  "Spell Card" : 'spell-card',
  "Spirit Monster" : 'effect-monster',
  "Toon Monster" : 'effect-monster',
  "Trap Card" : 'trap-card',
  "Tuner Monster" : 'effect-monster',
  "Union Effect Monster" : 'effect-monster',
  "Fusion Monster" : 'fusion-monster',
  "Link Monster": 'link-monster',
  "Pendulum Effect Fusion Monster": 'fusion-pendulum-monster',
  "Synchro Monster": 'synchro-monster',
  "Synchro Pendulum Effect Monster" : 'synchro-pendulum-monster',
  "Synchro Tuner Monster": 'synchro-monster',
  "XYZ Monster": 'xyz-monster',
  "XYZ Pendulum Effect Monster" : 'xyz-pendulum-monster'
}



const CardDisplay = (props) => {
  const [showModel, toggleShowModel] = useState(false);

  const {
    data: { name, desc, card_images, type },
  } = props;

  const {image_url} = card_images[0];

  return (
    <>
      <Card 
        onClick={() => toggleShowModel(!showModel)}
        >
        <Card.Img variant="top" src={image_url} />
      </Card>
      <Modal
        dialogClassName={cardTypes[type]}
        show={showModel}
        onHide={() => toggleShowModel(!showModel)}
        centered
      >
        {/* <Modal.Header closeButton></Modal.Header> */}
        <Modal.Body style={{ textAlign: "center" }}>
          <Image src={image_url} style={{width: "80%"}} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardDisplay;
