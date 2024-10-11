import { faFile, faTrash, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Modal, Button, Toast, OverlayTrigger, Tooltip } from "react-bootstrap";
import './File.css'; // Import the CSS file for styles

export default function File({ file, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDelete = () => {
    onDelete(file.id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(file.url).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  return (
    <>
      <div className="file-container border p-4 mb-4 shadow-lg">
        <div className="d-flex justify-content-between align-items-center">
          <button
            onClick={handleShow}
            className="btn btn-outline-primary text-truncate flex-grow-1 file-button"
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faFile} className="mr-2" />
            {file.name}
          </button>
          
          <div className="button-group">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-preview`}>Preview</Tooltip>}
            >
              <button className="btn btn-outline-info" onClick={handleShow}>
                <FontAwesomeIcon icon={faFile} />
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-share`}>Share</Tooltip>}
            >
              <button className="btn btn-outline-success" onClick={handleShare}>
                <FontAwesomeIcon icon={faShareSquare} />
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-delete`}>Delete</Tooltip>}
            >
              <button className="btn btn-outline-danger" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </OverlayTrigger>
          </div>
        </div>
      </div>

      {/* Modal for file preview */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{file.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src={file.url}
            title={file.name}
            style={{ width: "100%", height: "500px", border: "none" }}
            allowFullScreen
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleShare}>
            <FontAwesomeIcon icon={faShareSquare} className="mr-2" />
            Share
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast notification for sharing */}
      <Toast
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          backgroundColor: "green",
          color: "white"
        }}
        show={showToast}
        onClose={() => setShowToast(false)}
      >
        <Toast.Body>File URL copied to clipboard!</Toast.Body>
      </Toast>
    </>
  );
}
