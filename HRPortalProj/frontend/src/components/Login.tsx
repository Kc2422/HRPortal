import React, { useState, useEffect } from "react";
import { detailsUser } from "../redux/actions/UserActions";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { login } from "../redux/actions/UserActions";
import axios from "axios";
import { connect } from "react-redux";

interface Props {
  [key: string]: any;
}

const Login = (props: Props) => {
  console.log(props);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { userInfo, loading, error, success } = useSelector(
    (state: RootStateOrAny) => state.userLogin
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/auth/login", {
        name: name,
        password: password,
      })
      .then(async (res) => {
        console.log(res);
        if (res.status === 201) {
          localStorage.setItem("userInfo", JSON.stringify(res.data));

          await props.detailsUser(res.data._id);

          if (res.data.isAdmin) {
            // hr pages
            navigate("/profiles");
          } else if (
            !res.data.applicationStatus ||
            res.data.applicationStatus === "pending" ||
            res.data.applicationStatus === "not submitted"
          ) {
            navigate("/onboarding");
          } else {
            navigate("/profile");
          }
        }
      });
  };

  // const Login: React.FC = (props: Props) => {
  //   console.log(props);
  //   let navigate = useNavigate();
  //   const dispatch = useDispatch();

  //   const [name, setname] = useState("");
  //   const [password, setPassword] = useState("");

  //   const { userInfo, loading, error, success } = useSelector(
  //     (state: RootStateOrAny) => state.userLogin
  //   );

  //   const handleSubmit = async (e: any) => {
  //     e.preventDefault();
  //     axios
  //       .post("/auth/login", { name: name, password: password })
  //       .then(async (res) => {
  //         console.log(res);
  //         if (res.status === 201) {
  //           localStorage.setItem("userInfo", JSON.stringify(res.data));

  //           await props.detailsUser(res.data._id);

  //           if (res.data.isAdmin === true) {
  //             window.location.replace("/profiles");
  //           } else if (
  //             !res.data.applicationStatus ||
  //             res.data.applicationStatus === "Pending" ||
  //             res.data.applicationStatus === "Not Submitted"
  //           ) {
  //             window.location.replace("/profile");
  //           } else {
  //             window.location.replace("/onboarding");
  //           }
  //         }
  //       });
  //     console.log(name, password);
  // };
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   dispatch(login({ name, password }));
  // };

  // useEffect(() => {
  //   if (success || userInfo) {
  //     navigate("/");
  //   }
  // }, [userInfo, success, dispatch]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4">Login</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="name"
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button
                className="login"
                onSubmit={handleSubmit}
                variant="primary"
                type="submit">
                Login
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

function mapStateToProps(state: any) {
  console.log(state);
  return { user: state.userLogin };
}

const mapDispatchToProps = {
  detailsUser: detailsUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
