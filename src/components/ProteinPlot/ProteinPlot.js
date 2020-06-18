import React from 'react'
import './ProteinPlot.css'

//const API_URL = 'http://5deaf7ba69d2.ngrok.io/'
const API_URL = 'http://prot-lab-server-v3.eba-cddzjvsp.us-west-1.elasticbeanstalk.com/'

const ProteinPlot = (props) => {
    /* const protein_id = props.protein_id; // 2DHB.pdb*/
    console.log("ploting",props.protein_id)
    return (
        <div>
            <div class="column--50">
                <h2 className="our-graf__title" style={{color: "black"}}>{props.title}</h2>
                <iframe class="our-graf__img" src={API_URL + `view_prot/` + props.protein_id}></iframe>
            </div>
        </div>
    )
}

export default ProteinPlot;