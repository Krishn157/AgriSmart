import React, { useState, useEffect } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { listLandDetails } from "../../actions/landActions";

const LandDetailScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const landId = params.id;

  const dispatch = useDispatch();

  const landDetails = useSelector((state) => state.landDetails);
  const { loading, error, land } = landDetails;

  useEffect(() => {
    if (!land || land._id !== landId) {
      dispatch(listLandDetails(landId));
    }
  }, [dispatch, navigate, landId, land]);
  return (
    <Row>
      <Col md={4}>
        <h2>Land Details</h2>
        <Card className="my-3 p-3 rounded">
          <Card.Img src={land.image} variant="top" className="prod-img" />
          <Card.Body>
            <Card.Title>
              <strong>{land.area} Acres Land</strong>
            </Card.Title>

            <Card.Text>
              At {land.district}, {land.state}
            </Card.Text>
            <Card.Text>Season - {land.season}</Card.Text>
            <Card.Text>Crop - {land.crop}</Card.Text>
            <Card.Text>Est. Production - {land.estProd}</Card.Text>
            <Card.Text>Min Bidding Amount - ₹{land.minBidAmt}</Card.Text>
            <Card.Text>Capital Return - {land.capitalReturn}%</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={8}>
        <h2>Bids Received</h2>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>CONTRACTOR NAME</th>
              <th>BIDDING AMOUNT</th>
              <th>PAID</th>
              <th>APPROVAL</th>
              <th></th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default LandDetailScreen;
