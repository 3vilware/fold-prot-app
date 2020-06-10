import React, {useState, useEffect, useContext, useCallback} from 'react'
import ProteinPlot from '../../components/ProteinPlot/ProteinPlot'
import ProtInput from '../../components/ProtInput/ProtInput'
import API from '../../API'

const SingleFold = (props) => {
    /* const protein_id = props.protein_id; // 2DHB.pdb*/
    const [showFold, setShowFold] = useState(false);
    const [pdb_name, setPdbName] = useState("");
    const [job_id, setJobId] = useState("");


    async function sendJob(chain){
        console.log("Sended job chain", chain);
        const response = await API.runJob({chain: chain.toUpperCase()})
        if(response.pdb_name){
            setPdbName(response.pdb_name);
            setShowFold(true);
            setJobId(response.job_id);
        }
        console.log("JOB", response);
    }

    return (
        <div>
            <div style={{padding:"4rem"}} className="input-chain-desktop" >
                <ProtInput title="Predecir Plegamiento" label="introduce la cadena de aminoacidos" run_function={sendJob} />
            </div>
            { showFold && (
                <div className="fold-desktop">
                    <ProteinPlot protein_id={pdb_name} title={`Mostrando predicción: ` + job_id}/>
                </div>
            )}

        </div>
    )
}

export default SingleFold;