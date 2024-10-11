import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuthenticate } from "../Context";
import { Link, useHistory } from "react-router-dom";
import Center from "./Align_Center";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuthenticate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  async function signUp(e) {
    e.preventDefault();
    
    if (passwordRef.current.value.length < 6) {
      return setError("Password must be at least 6 characters long");
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      if (isMounted.current) {
        history.push("/");
      }
    } catch {
      if (isMounted.current) {
        setError("Failed to create an account");
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }

  return (
    <Center>
      <Card>
        <Card.Body className="bg-light">
          <h2 className="text-center text-info mb-4">Create an Account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={signUp}>
            <Form.Group id="email" className="mb-3">
              <Form.Control
                className="bg-light text-dark border border-secondary"
                placeholder="Enter Email"
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id="password" className="mb-3">
              <Form.Control
                className="bg-light text-dark border border-secondary"
                placeholder="Enter Password"
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group id="password-confirm" className="mb-4">
              <Form.Control
                className="bg-light text-dark border border-secondary"
                placeholder="Confirm Password"
                type="password"
                ref={passwordConfirmRef}
                required
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100 btn-info text-white"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-3 text-secondary">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </Center>
  );
}
