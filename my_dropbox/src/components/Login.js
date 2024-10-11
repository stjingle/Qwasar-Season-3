import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuthenticate } from "../Context";
import { Link, useHistory } from "react-router-dom";
import Center from "./Align_Center";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuthenticate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function signIn(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Wrong Email/Password");
    }

    setLoading(false);
  }

  return (
    <Center>
      <Card>
        <Card.Body className="bg-light">
          <h2 className="text-center text-info mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={signIn}>
            <Form.Group id="email" className="mb-3">
              <Form.Control
                className="bg-light text-dark border border-secondary"
                type="email"
                placeholder="Enter Email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id="password" className="mb-4">
              <Form.Control
                className="bg-light text-dark border border-secondary"
                type="password"
                placeholder="Enter Password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100 btn-info text-white"
              type="submit"
            >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3 text-secondary">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="w-100 text-center mt-3 text-secondary">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </Center>
  );
}
