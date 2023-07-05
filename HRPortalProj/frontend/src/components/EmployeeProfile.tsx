import { Accordion, ListGroup, Row, Col, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  [key: string]: any;
}

function EmployeeProfile(user: Props) {
  console.log(user.user.firstName);

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0" key={user._id}>
        <Accordion.Header>
          Employee Name:
          {user.user.firstName + " " + user.user.lastName}
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            <Stack direction="horizontal"></Stack>
            <Row>
              <Col>
                <ListGroup.Item>
                  First name: {user.user.firstName}
                </ListGroup.Item>
                <ListGroup.Item>Last name: {user.user.lastName}</ListGroup.Item>
              </Col>
              <Col>
                <ListGroup.Item>
                  Cell Phone: {user.user.cellPhone}
                </ListGroup.Item>

                <ListGroup.Item>Email: {user.user.email}</ListGroup.Item>
              </Col>
              <Col>
                <ListGroup.Item>
                  Work Authorization Title {user.user.title}
                </ListGroup.Item>
                <ListGroup.Item>SSN: {user.user.SSN}</ListGroup.Item>
              </Col>
            </Row>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default EmployeeProfile;
