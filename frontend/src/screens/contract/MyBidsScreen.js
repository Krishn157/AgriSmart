import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listMyBids } from "../../actions/bidActions";
import Bid from "../../components/contract/Bid";
import Land from "../../components/contract/Land";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const MyBidsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bidListMy = useSelector((state) => state.bidListMy);
  const { loading, bids, error } = bidListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo && userInfo.isFarmer) {
      navigate("/contract");
    } else if (userInfo && userInfo.isContractor) {
      dispatch(listMyBids());
    }
  }, [dispatch, navigate, userInfo]);

  const payHandler = () => {};

  return (
    <>
      <h1>MY BIDS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {bids.length === 0 && <p>No Bids made yet !</p>}
          {bids.map((bid) => (
            <Col key={bid._id} sm={12} md={6} lg={4} xl={4}>
              <Bid bid={bid} util={payHandler} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default MyBidsScreen;
