import React from "react";
import { Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const Land = ({ land, name, del }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/contract/land/${land._id}`}>
        <Card.Img src={land.image} variant="top" className="prod-img" />
      </Link>
      <Card.Body>
        <Link to={`/contract/land/${land._id}`}>
          <Card.Title>
            <strong>
              {land.area} Acres Land, Owned by {name}
            </strong>
          </Card.Title>
        </Link>
        <Card.Text>
          At {land.district}, {land.state}
        </Card.Text>
        <Card.Text>Season - {land.season}</Card.Text>
        <Card.Text>Crop - {land.crop}</Card.Text>
        <Card.Text>Est. Production - {land.estProd}</Card.Text>
        <Card.Text>Min Bidding Amount - ₹{land.minBidAmt}</Card.Text>
        <Card.Text>Capital Return - {land.capitalReturn}%</Card.Text>
        <LinkContainer to={`/contract/land/${land._id}/edit`}>
          <Button variant="primary" className="mx-3">
            <i className="fas fa-edit"></i> Edit
          </Button>
        </LinkContainer>
        <Button variant="danger" className="mx-3" onClick={() => del(land._id)}>
          <i className="fas fa-trash"></i> Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Land;
