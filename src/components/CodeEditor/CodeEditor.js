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
class DefaultDemo1(openprotein.BaseModel):
    def __init__(self, embedding_size, use_gpu=False):
        super(DefaultDemo1, self).__init__(use_gpu, embedding_size)
        
        self.hidden_size = 25
        self.num_lstm_layers = 2
        self.mixture_size = 500
        self.bi_lstm = nn.LSTM(self.get_embedding_size(), self.hidden_size,
                               num_layers=self.num_lstm_layers,
                               bidirectional=True, bias=True)
        self.hidden_to_labels = nn.Linear(self.hidden_size * 2,
                                          self.mixture_size, bias=True)  # * 2 for bidirectional
        self.init_hidden(5)
        self.softmax_to_angle = SoftToAngle(self.mixture_size)
        self.batch_norm = nn.BatchNorm1d(self.mixture_size)

    def init_hidden(self, minibatch_size):
        # number of layers (* 2 since bidirectional), minibatch_size, hidden size
        initial_hidden_state = torch.zeros(self.num_lstm_layers * 2,
                                           minibatch_size, self.hidden_size)
        initial_cell_state = torch.zeros(self.num_lstm_layers * 2,
                                         minibatch_size, self.hidden_size)
        if self.use_gpu:
            initial_hidden_state = initial_hidden_state.cuda()
            initial_cell_state = initial_cell_state.cuda()
        self.hidden_layer = (autograd.Variable(initial_hidden_state),
                             autograd.Variable(initial_cell_state))

    def _get_network_emissions(self, original_aa_string):
        padded_input_sequences = self.embed(original_aa_string)
        minibatch_size = len(original_aa_string)
        batch_sizes = list([v.size(0) for v in original_aa_string])
        packed_sequences = pack_padded_sequence(padded_input_sequences, batch_sizes)

        self.init_hidden(minibatch_size)
        (data, bi_lstm_batches, _, _), self.hidden_layer = self.bi_lstm(
            packed_sequences, self.hidden_layer)
        emissions_padded, batch_sizes = torch.nn.utils.rnn.pad_packed_sequence(
            torch.nn.utils.rnn.PackedSequence(self.hidden_to_labels(data), bi_lstm_batches))
        emissions = emissions_padded.transpose(0, 1)            .transpose(1, 2)  # minibatch_size, self.mixture_size, -1
        emissions = self.batch_norm(emissions)
        emissions = emissions.transpose(1, 2)  # (minibatch_size, -1, self.mixture_size)
        probabilities = torch.softmax(emissions, 2)
        output_angles = self.softmax_to_angle(probabilities)            .transpose(0, 1)  # max size, minibatch size, 3 (angles)
        backbone_atoms_padded, _ =             get_backbone_positions_from_angles(output_angles,
                                               batch_sizes,
                                               self.use_gpu)
        return output_angles, backbone_atoms_padded, batch_sizes
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
                            <h3 style={{zIndex:"1000", marginLeft:"20rem"}}>Editor de modelos</h3>
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
