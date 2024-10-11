import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useAuthenticate } from "../../Context";
import { storage, db } from "../../firebaseConfig";
import { ROOT_FOLDER } from "../../CustomHook";
import { v4 as uuidV4 } from "uuid";
import { ProgressBar, Toast } from "react-bootstrap";

export default function FileUploader({ currentFolder }) {
  const [activeUploads, setActiveUploads] = useState([]);
  const { currentUser } = useAuthenticate();

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!currentFolder || !selectedFile) return;

    const uniqueId = uuidV4();
    setActiveUploads((previousUploads) => [
      ...previousUploads,
      { id: uniqueId, name: selectedFile.name, progress: 0, hasError: false },
    ]);

    const fileLocation =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${selectedFile.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${selectedFile.name}`;

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${fileLocation}`)
      .put(selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress = snapshot.bytesTransferred / snapshot.totalBytes;
        setActiveUploads((previousUploads) =>
          previousUploads.map((file) =>
            file.id === uniqueId ? { ...file, progress: uploadProgress } : file
          )
        );
      },
      (error) => {
        setActiveUploads((previousUploads) =>
          previousUploads.map((file) =>
            file.id === uniqueId ? { ...file, hasError: true } : file
          )
        );
        console.error("Upload error:", error.message);
      },
      () => {
        setActiveUploads((previousUploads) =>
          previousUploads.filter((file) => file.id !== uniqueId)
        );

        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          db.files
            .where("name", "==", selectedFile.name)
            .where("userId", "==", currentUser.uid)
            .where("folderId", "==", currentFolder.id)
            .get()
            .then((existingFiles) => {
              const fileExists = existingFiles.docs[0];
              const fileData = {
                url: downloadUrl,
                name: selectedFile.name,
                createdAt: db.getCurrentTimestamp(),
                folderId: currentFolder.id,
                userId: currentUser.uid,
              };

              db.files.add(fileData).then(() => {
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              });
            });
        });
      }
    );
  };

  return (
    <>
      <label style={{ fontSize:'14px'}} className="btn btn-primary btn-lg m-3 text-white" aria-label="Upload File">
        Upload File
        <input
          type="file"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </label>
      {activeUploads.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "fixed",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "300px",
            }}
          >
            {activeUploads.map((file) => (
              <Toast
                key={file.id}
                onClose={() =>
                  setActiveUploads((previousUploads) =>
                    previousUploads.filter(
                      (uploadingFile) => uploadingFile.id !== file.id
                    )
                  )
                }
              >
                <Toast.Header closeButton={file.hasError}>
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.hasError}
                    variant={file.hasError ? "danger" : "info"}
                    now={file.hasError ? 100 : file.progress * 100}
                    label={
                      file.hasError
                        ? "Error"
                        : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
