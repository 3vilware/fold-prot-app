import React, {useState, useEffect, useContext} from 'react'
import './ProtInput.css'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import API from '../../API'
import _ from "lodash"

const ProtInput = (props) => {
    console.log("PROPS", props.value)
    const [chain, setChain] = useState("");
    const [models_data, setModelsData] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);
    console.log("ChainValue", chain);

    async function getModels(){
        const response = await API.getModels()
        setModelsData(response)
    }


    React.useEffect(() => {
        if (_.isEmpty(models_data)){
            getModels()
        }
    })

    return (
        <div className="container container--flex col-md-12">
            <div className="column column--50 text-center pull-right">
            <h1 className="logo">{props.title}</h1>
                <label for="" className="formulario__label">{props.label}</label>
                <input type="text"  style={{textTransform:"uppercase"}} className="formulario__input-txt" onChange={ (e) => setChain(e.target.value) } name="aminoacido"
                    value={props.value} />

                 <Container style={{marginLeft:"22%"}}>
                    <Col md={6}>
                        <Form>
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label><b>Seleccionar Modelo</b></Form.Label>
                                <Form.Control as="select" custom onChange={ (e) => setSelectedModel(e.target.value)}>
                                    {models_data.map( (m) => {
                                        return <option value={m.id}>{m.name}</option>
                                    })}

                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                </Container>    
                <input type="button" className="btn-custom formulario__btn" onClick={() => props.run_function(chain, selectedModel)} value="Plegar"/>
               
                
            </div>  
        </div>
    )
}

export default ProtInput;