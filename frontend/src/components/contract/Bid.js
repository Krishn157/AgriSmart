import React from "react";
import { Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";

const Bid = ({ bid, util }) => {
  const { landId: land, farmerId, bidAmt, isApproved } = bid;
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img src={land.image} variant="top" className="prod-img" />

      <Card.Body>
        <Card.Title>
          <strong>
            {land.area} Acres Land, Owned by {farmerId.name}
          </strong>
        </Card.Title>

        <Card.Text>
          At {land.district}, {land.state}
        </Card.Text>
        <Card.Text>Season - {land.season}</Card.Text>
        <Card.Text>Crop - {land.crop}</Card.Text>
        <Card.Text>Bidding Amount - ₹{bidAmt}</Card.Text>
        {isApproved ? (
          <Button variant="primary" onClick={() => util()}>
            <i class="fas fa-rupee-sign"></i> Make Payment
          </Button>
        ) : (
          <Button variant="primary" disabled>
            <i class="fas fa-hourglass-half"></i>
            {"   "} Pending Approval
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Bid;
