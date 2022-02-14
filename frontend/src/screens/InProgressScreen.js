import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

const InProgressScreen = () => {
  return (
    <>
      <Container>
        <Row>
          <Col xs lg={{ offset: 3, span: 6 }}>
            <Image
              src="/images/wip.jpg"
              className="work-in-progress"
              fluid={true}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InProgressScreen;
