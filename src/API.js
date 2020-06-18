import axios from 'axios'

//const API_URL = 'http://prot-lab-server-v3.eba-cddzjvsp.us-west-1.elasticbeanstalk.com/'
const API_URL = 'http://5deaf7ba69d2.ngrok.io/'
//const API_URL = 'http://127.0.0.1:8000/'

function genericGet(endpoint){

    return axios.get(API_URL + endpoint, {
        headers: {
        'Authorization': 'Token ' + localStorage.getItem('AUTH')
    }})
}

function genericPut(endpoint, id, params){

    return axios.put(API_URL + endpoint + '/' + String(id), 
        params,
    {
        headers: {
        'Authorization':  'Token ' + localStorage.getItem('AUTH')
        }
    })
}

function genericDelete(endpoint, id){

    return axios.delete(API_URL + endpoint + '/' + String(id), 
    {
        headers: {
        'Authorization':  'Token ' + localStorage.getItem('AUTH')
        }
    })
}

function genericPost(endpoint, params, auth=false){
    console.log("*****************************\nSending", params);
    if(auth){
        return axios.post(API_URL + endpoint, 
            params, 
        )
    }else{
        return axios.post(API_URL + endpoint, 
        params, 
        {headers: {
        'Authorization':  'Token ' + localStorage.getItem('AUTH')
        }
    })
    }
    
}

const API = {

    login(params){
        genericPost('login', params, true)
        .then(response =>  {
            // todo: localStorage Save token 
            let token = response.data.token;
            console.log("Token",token);
            localStorage.setItem("AUTH", token);
            localStorage.setItem("USER_NAME", params.username);
            window.location = "/"
        })
        .catch(err => console.log("Error:", err))
    },

    register(params){
        genericPost('register/', params, true)
        .then(response =>  {
            // todo: localStorage Save token 
            if(response.data.token){
                let token = response.data.token;
                console.log("Token",token);
                localStorage.setItem("AUTH", token);
                localStorage.setItem("USER_NAME", params.username);
                window.location = "/"
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

    generateModel(params){
        return genericPost('sendCode', params)
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
    },

    getModels(){
        return genericGet('models')
         .then(response =>  response.data)
         .catch(err => console.log("Error:", err))
    },

    updateModels(id, params){
        return genericPut('models', id, params)
         .then(response =>  response.data)
         .catch(err => console.log("Error:", err))
    },

    deleteModels(id){
        return genericDelete('models', id)
         .then(response =>  response.data)
         .catch(err => console.log("Error:", err))
    },

    createModels(params){
        return genericPost('models', params)
         .then(response =>  response.data)
         .catch(err => console.log("Error:", err))
    },

    getProtein(protein_id){
        return genericGet('protein_data/' + protein_id)
         .then(response =>  response.data)
         .catch(err => console.log("Error:", err))
    },


}


export default API;