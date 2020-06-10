import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProteinPlot from '../../components/ProteinPlot/ProteinPlot'

export default function ProtModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Mostrando Plegamiento 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <h4>Job - {props.pdb}</h4>
          
      <div style={{marginRight:"50%"}}>
          <div className="fold-desktop" >
              <ProteinPlot protein_id={props.pdb} title={`Mostrando predicción: `}/>
          </div>
      </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }