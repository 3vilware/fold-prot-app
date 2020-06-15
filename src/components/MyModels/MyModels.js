import React from 'react';
import MaterialTable from 'material-table';
import API from '../../API';
import FileModal from '../Modal/FileModal'

var _ = require('lodash');

const MyModels = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [modelState, setModelState] = React.useState([]);
    const [emptyUser, setEmptyUser] = React.useState(false);
    const [state, setState] = React.useState({
        columns: [
          { title: 'Name', field: 'name' },
          { title: 'Description', field: 'description' },
          { title: 'Publico', field: 'public',},
          {
            title: 'ID',
            field: 'id',
          },
        ],
    
        data: [
        /*   { date: '10', description: 'test field', pdb: "path", id: 63 }, */
        ],
      });

    async function getModels(){
      const response = await API.getModels()
      if(_.isEmpty(response)){
        setEmptyUser(true);
      }
      setState( (prevState) => {
          let data = [...prevState.data];
          data = []
          response.map( (model) => {
          let newData = { name: model.name, description: model.description, public: model.public===true ? "Si" : "No" , id: model.id };
          data.push(newData);
          })
          return { ...prevState, data };
      })
    }

    async function updateModelData(id, data){
      // let data = {name:"updated", description: "test desc", public: true}
      const response = await API.updateModels(id, data)
    }

    async function deleteModelData(id){
      // let data = {name:"updated", description: "test desc", public: true}
      const response = await API.deleteModels(id)
    }

    async function createModelData(params){
      // let data = {name:"updated", description: "test desc", public: true}
      const response = await API.createModels(params)
    }


    React.useEffect(() => {
      if (_.isEmpty(state.data)){
        if(!emptyUser){
            getModels()
        }
    }
    })
    
    
      return (
        <div>
            <MaterialTable
            title="Mis Modelos"
            columns={state.columns}
            data={state.data}

            actions={[
              {
                icon: 'publish',
                tooltip: 'Subir modelo',
                onClick: (event, rowData) => {
                  setModalShow(!modalShow) //alert("Mostrar en modal " + rowData.pdb)
                  console.log(rowData)
                  setModelState(rowData);
                 /*  setPdb(rowData.pdb.split('/')[2]) */
              }
            }]}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.push(newData);
                      newData.public = newData.public === "Si" || "si" ? true : false
                      createModelData(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;

                        //data.map( (e) => {console.log(e)})
                        delete newData.file
                        newData.public = newData.public === "Si" ? true : false
                        updateModelData(oldData.id, newData)
                        console.log(newData);
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      console.log(oldData.id);
                      deleteModelData(oldData.id);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
            }}
          />

        <FileModal 
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={modelState.id}
          name={modelState.name}
          description={modelState.description}
          public={modelState.public}
          >
        </FileModal>
          
        </div>
       
      );
    
}

export default MyModels;