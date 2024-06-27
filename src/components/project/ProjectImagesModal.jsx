import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addProjectPicture, deleteProjectPicture } from '../../store/slices/projectSlice';

const ProjectImagesModal = ({ project, onHide }) => {
  const dispatch = useDispatch();
  const [newPicture, setNewPicture] = useState('');

  const handleAddPicture = () => {
    if (newPicture) {
      dispatch(addProjectPicture({ projectId: project._id, pictureUrl: newPicture }));
      setNewPicture('');
    }
  };

  const handleDeletePicture = (pictureUrl) => {
    dispatch(deleteProjectPicture({ projectId: project._id, pictureUrl }));
  };

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Manage Project Images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Add New Picture URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter picture URL"
            value={newPicture}
            onChange={(e) => setNewPicture(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddPicture}>
          Add Picture
        </Button>
        <hr />
        <h5>Current Pictures:</h5>
        <ul>
          {project.projectPictures.map((picture, index) => (
            <li key={index}>
              <div className="d-flex justify-content-between align-items-center">
                <span>{picture}</span>
                <Button variant="danger" size="sm" onClick={() => handleDeletePicture(picture)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectImagesModal;
