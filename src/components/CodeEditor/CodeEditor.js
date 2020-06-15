import React from "react";
import ReactDOM from "react-dom";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-regex";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import API from '../../API'
import ModelModal from '../../components/Modal/ModelModal'

import "./styles.css";
import "./prism.css";

const jsSample = `

# Escribe tu modelo. Puedes sobre escribir esta plantilla (Python 3.8)
class MyModel(openprotein.BaseModel):
    def __init__(self, embedding_size, use_gpu=False):
        super(MyModel, self).__init__(use_gpu, embedding_size)
        self.use_gpu = use_gpu
        self.number_angles = 3
        self.input_to_angles = nn.Linear(embedding_size, self.number_angles)


    def _get_network_emissions(self, original_aa_string):
        embedded_input = self.embed(original_aa_string)
        emissions_padded = self.input_to_angles(embedded_input)

        emissions = emissions_padded.transpose(0, 1)  # minibatch_size, self.mixture_size, -1

        probabilities = torch.softmax(emissions, 2) # p

        output_angles = torch.matmul(probabilities, ANGLE_ARR).transpose(0, 1)
        
        batch_sizes = list([a.size() for a in original_aa_string])

        return output_angles, [], batch_sizes
`;

const regExSample = `/<p>- *([^<]*)<br\/>/i
`;

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        jsSample: jsSample,
        modalShow: false
    };
  }

  async sendCode(){
    //console.log(this.state.jsSample)
    const response = await API.generateModel({code: this.state.jsSample})
  }


  render() {
    //console.log(languages);
    return (
      <div>
          <Container style={{marginLeft:"17%"}}>
                <Col xs={12} md={11}>
                    <Jumbotron className="text-center"  >
                        <Form.Row>
                            <h3 style={{zIndex:"1000", marginLeft:"22rem"}}>Editor de modelos</h3>
                            <Button style={{height:"60%", marginLeft:"22%"}} variant="success" onClick={ () => this.setState({modalShow:!this.state.modalShow})}>Entrenar</Button>
                        </Form.Row>
                    
                    <Editor
                    className="box"
                    value={this.state.jsSample}
                    onValueChange={jsSample => this.setState({ jsSample })}
                    highlight={jsSample => highlight(jsSample, languages.js)}
                    padding={10}
                    style={{backgroundColor: "white"}}
                    />
                </Jumbotron>

                </Col>
                <br/>
                <br/>

            </Container>

            <ModelModal 
                show={this.state.modalShow}
                onHide={() => this.setState({modalShow: !this.state.modalShow})}
                code={this.state.jsSample}
            >
            </ModelModal>
      </div>
    );
  }
}

export default CodeEditor;
