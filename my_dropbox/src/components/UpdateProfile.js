import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuthenticate } from "../Context";
import { Link, useHistory } from "react-router-dom";
import Center from "./Align_Center";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuthenticate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function updateProfile(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/user");
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          setError("You need to log in again to update your password or email.");
        } else {
          setError("Failed to update account");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Center>
      <Card>
        <Card.Body className="bg-light border border-primary rounded">
          <h2 className="text-center mb-4 text-primary mt-3">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={updateProfile}>
            <Form.Group id="email">
              <Form.Control
                className="bg-light text-dark"
                placeholder="Email"
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Control
                className="bg-light text-dark"
                placeholder="New Password"
                type="password"
                ref={passwordRef}
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Control
                className="bg-light text-dark"
                placeholder="Confirm Password"
                type="password"
                ref={passwordConfirmRef}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 btn btn-primary" type="submit">
              Update
            </Button>
          </Form>
          <div className="p-2 text-center">
            <Link to="/user">Cancel</Link>
          </div>
        </Card.Body>
      </Card>
    </Center>
  );
}
