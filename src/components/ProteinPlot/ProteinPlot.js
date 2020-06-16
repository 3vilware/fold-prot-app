import React from 'react'
import './ProteinPlot.css'

const ProteinPlot = (props) => {
    /* const protein_id = props.protein_id; // 2DHB.pdb*/
    console.log("ploting",props.protein_id)
    return (
        <div>
            <div class="column--50">
                <h2 className="our-graf__title" style={{color: "black"}}>{props.title}</h2>
                <iframe class="our-graf__img" src={`http://prot-lab-server-v3.eba-cddzjvsp.us-west-1.elasticbeanstalk.com/view_prot/` + props.protein_id}></iframe>
            </div>
        </div>
    )
}

export default ProteinPlot;