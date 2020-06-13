import React, {useState, useEffect, useContext} from 'react'
import './ProtInput.css'

const ProtInput = (props) => {
    console.log("PROPS", props.value)
    const [chain, setChain] = useState("");
    console.log("ChainValue", chain);

    return (
        <div className="container container--flex col-md-12">
            <div className="column column--50 text-center pull-right">
            <h1 className="logo">{props.title}</h1>
                <label for="" className="formulario__label">{props.label}</label>
                <input type="text"  style={{textTransform:"uppercase"}} className="formulario__input-txt" onChange={ (e) => setChain(e.target.value) } name="aminoacido"
                    value={props.value} />
                <input type="button" className="btn-custom formulario__btn" onClick={() => props.run_function(chain)} value="Plegar"/>
            </div>  
        </div>
    )
}

export default ProtInput;