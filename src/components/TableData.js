import React from 'react';
import MaterialTable from 'material-table';
import API from '../API';
import Button from '@material-ui/core/Button';
import ProtModal from './Modal/ProtModal'
import ProteinPlot from './ProteinPlot/ProteinPlot';

var _ = require('lodash');

export default function TableData() {
  const [modalShow, setModalShow] = React.useState(false);
  const [pdb, setPdb] = React.useState("");
  const [state, setState] = React.useState({
    columns: [
      { title: 'Date', field: 'date' },
      { title: 'Description', field: 'description' },
      { title: 'PDB', field: 'pdb',},
      {
        title: 'ID',
        field: 'id',
      },
    ],

    data: [
    /*   { date: '10', description: 'test field', pdb: "path", id: 63 }, */
    ],
  });

  async function getJobs(){
    const response = await API.getJobs()

    setState( (prevState) => {
      let data = [...prevState.data];
      data = []
      response.map( (job) => {
        let newData = { date: job.date.split('T')[0], description: job.description, pdb: job.pdb, id: job.id,  };
        data.push(newData);
      })
      return { ...prevState, data };
    })
  }

  React.useEffect(() => {
    if (_.isEmpty(state.data)){
      getJobs()
    }
  })


  return (
    <div>
        <MaterialTable
        title="Historial De Trabajos"
       
        actions={[
          {
            icon: 'visibility',
            tooltip: 'Ver',
            onClick: (event, rowData) => {
              setModalShow(!modalShow) //alert("Mostrar en modal " + rowData.pdb)
              setPdb(rowData.pdb.split('/')[2])
          }
        }]}
        columns={state.columns}
        data={state.data}
        editable={{
         /*  onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }), */
          /* onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }), */
         /*  onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }), */
        }}
      />

      <ProtModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        pdb={pdb}>
        </ProtModal>
      
    </div>
   
  );
}
