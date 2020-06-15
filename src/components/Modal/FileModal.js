import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadFile from '../Upload/UploadFile'
import Jumbotron from 'react-bootstrap/Jumbotron'

export default function FileModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Subir modelo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <h4>Editando modelo:</h4> <h5><i>{props.name}</i></h5>
          
      <div>
            <Jumbotron className="text-center"  >
                <UploadFile onHide={props.onHide} id={props.id} name={props.name} description={props.description} ></UploadFile>
            </Jumbotron>
      </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }