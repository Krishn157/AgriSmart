import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listMyBids, payBid } from "../../actions/bidActions";
import Bid from "../../components/contract/Bid";
import Land from "../../components/contract/Land";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { BID_PAY_RESET } from "../../constants/bidConstants";

const MyBidsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);

  const bidListMy = useSelector((state) => state.bidListMy);
  const { loading, bids, error } = bidListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bidPay = useSelector((state) => state.bidPay);
  const { loading: loadingPay, success: successPay } = bidPay;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (userInfo && userInfo.isFarmer) {
      navigate("/contract");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    console.log(bids, loading);

    if (!bids || (loading === undefined && bids.length === 0) || successPay) {
      console.log("here");
      dispatch({ type: BID_PAY_RESET });
      dispatch(listMyBids());
    }
    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, [bids, dispatch, loading, navigate, successPay, userInfo]);

  const successPaymentHandler = (paymentResult, bidId) => {
    dispatch(payBid(bidId, paymentResult));
  };

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
              <Bid
                bid={bid}
                successPaymentHandler={successPaymentHandler}
                bidPay={bidPay}
                sdkReady={sdkReady}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default MyBidsScreen;
