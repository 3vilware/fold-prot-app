import axios from 'axios'; 
import React from 'react'; 
import API from '../../API'
import Button from '@material-ui/core/Button';

  
export default function UploadFile(props) {   
    const [selectedFile, setSelectedFile] = React.useState(null);
     
    // On file select (from the pop up) 
    const onFileChange = event => { 
        // Update the state 
        setSelectedFile(event.target.files[0]); 
    }; 
     
    // On file upload (click the upload button) 
    const onFileUpload = () => { 
     
      // Create an object of formData 
      const formData = new FormData(); 
     
      // Update the formData object 
      formData.append( 
        "file", 
        selectedFile, 
    
      ); 
      formData.append( 
        "name", 
        props.name, 
      ); 
      formData.append( 
        "description", 
        props.description, 
      ); 
     
     
      // Details of the uploaded file 
      console.log(selectedFile); 
     
      // Request made to the backend api 
      // Send formData object 
      //axios.put("http://127.0.0.1:8000/models/"+props.id, formData); 
      const response = axios.put("http://127.0.0.1:8000/models/"+props.id, 
         formData,
        {
            headers: {
            'Authorization': 'Token ' + localStorage.getItem("AUTH")
            }
        }).then(resp =>{
            if(resp.status == 200){
                props.onHide();
                alert("Subido correctamente");
            }else{
                alert("Algo salio mal al subir el archivo. Verifica la información cargada");
            }
        })
        .catch(e =>{
            alert("Algo salio mal al subir el archivo. Verifica la información cargada");
        })
        //console.log(response);
        return response
    }; 
     
    // File content to be displayed after 
    // file upload is complete 
    const fileData = () => { 
      if (selectedFile) { 
          
        return ( 
          <div> 
            <h2>Detalles del archivo</h2> 
            <p>Nombre: {selectedFile.name}</p> 
            <p>Tipo: {selectedFile.type}</p> 
            <p> 
              Modificado la ultima vez:{" "} 
              {selectedFile.lastModifiedDate.toDateString()} 
            </p> 
          </div> 
        ); 
      } else { 
        return ( 
          <div> 
            <br /> 
            <h4>...</h4> 
          </div> 
        ); 
      } 
    }; 
          
      return ( 
        <div> 
            { selectedFile === null && (
                <h3> Selecciona el archivo de modelo entrenado</h3> 
            )}
           
            <div> 
                <input type="file" onChange={onFileChange}/> 
                <br/>
                <br/>
                <Button  onClick={onFileUpload} variant="contained" color="primary" style={{fontSize:"120%", width:"50%"}}>
                    Subir 
                </Button>
            </div> 
            <br/>
            <br/>
          {fileData()} 
        </div> 
      ); 
    } 
  
