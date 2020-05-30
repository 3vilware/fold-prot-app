import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/'

function genericGet(endpoint){

    return axios.get(API_URL + endpoint, {
        headers: {
        'Authorization': 'Token cfeba2fe43d89c2ee12831c7ee2431fa9594a9d7'
    }})
}

function genericPost(endpoint, params){
    console.log("*****************************\nSending", params);
    return axios.post(API_URL + endpoint, 
        params, 
        {headers: {
        'Authorization': 'Token cfeba2fe43d89c2ee12831c7ee2431fa9594a9d7' 
        }
    })
}

const API = {

    login(params){
        genericPost('login', params)
        .then(response =>  {
            // todo: localStorage Save token 
            let token = response.data.token;
            console.log("Token",token);
        })
        .catch(err => console.log("Error:", err))
    },

    register(params){
        genericPost('register/', params)
        .then(response =>  {
            // todo: localStorage Save token 
            if(response.data.token){
                let token = response.data.token;
                console.log("Token",token);
            }else{
                console.log(response.data);
            }
            
        })
        .catch(err => console.log("Error:", err))
    },

    getJobs(){
       return genericGet('run_job')
        .then(response =>  response.data)
        .catch(err => console.log("Error:", err))
    },

    runJob(params){
        return genericPost('run_job', params)
         .then(response =>  response.data)
         .catch(err => console.log("Error:", err))
    },

    getJobs(){
        return genericGet('run_job')
         .then(response =>  response.data)
         .catch(err => console.log("Error:", err))
    }
}


export default API;