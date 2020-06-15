import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import API from '../../API'
import Spinner from 'react-bootstrap/Spinner'
import { Alert, AlertTitle } from '@material-ui/lab';


export default function ModelModal(props) {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [epochs, setEpochs] = React.useState("");
    const [showSpinner, setShowSpinner] = React.useState(false);
    const [finishAdvice, setFinishAdvice] = React.useState(false);

    async function sendCode(){
        //console.log(this.state.jsSample)
        setShowSpinner(true);
        const response = await API.generateModel({
            code: props.code,
            name: name,
            description: description,
            epochs: epochs
        })
        .then( resp =>{
            setShowSpinner(false);
            setFinishAdvice(true);
        })
      }


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirmar Datos Del Modelo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
      <div style={{marginRight:"0"}}>
          {finishAdvice && (
            <div>
                <Alert severity="success">
                    <AlertTitle>Entrenamiento Iniciado</AlertTitle>
                    Una vez terminado recibirás los <strong>resultados en tu correo</strong>. En caso de ser 
                    exitoso el nuevo modelo estará listo para usarse
                </Alert>
            </div>
          )}

          {!finishAdvice && (
              <div>
                {showSpinner && (
                    <Form>
                        <Form.Row className="justify-content-center">
                            <Col style={{marginLeft:"48%"}}>
                                <Spinner animation="border" variant="success" />
                                <br/>
                            </Col>
                        </Form.Row>
                        <Col style={{marginLeft:"29%"}}>
                                <h4>Programando Entrenamiento...</h4>
                        </Col>
                    </Form>
                )}
                {!showSpinner && (
                    <div>
                            <Form>
                                <Form.Row>
                                    <Col md={4}>
                                        <Form.Control placeholder="Nombre del modelo" onChange={ (e) => setName(e.target.value)} />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control placeholder="Descripción" onChange={ (e) => setDescription(e.target.value)} />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control placeholder="Epocas" onChange={ (e) => setEpochs(e.target.value)} />
                                    </Col>
                                </Form.Row>
                            </Form>
                            <br/>
                            <Row className="justify-content-center">
                                <Button variant="warning" onClick={ () => sendCode()}>INICIAR</Button>
                            </Row>
                    </div>
                )}
              </div>
          )}
          
          
      </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }