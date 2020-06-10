import React, {useState, useEffect, useContext, useCallback} from 'react'
import ProteinPlot from '../../components/ProteinPlot/ProteinPlot'
import ProtInput from '../../components/ProtInput/ProtInput'
import API from '../../API'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';


const SingleFold = (props) => {
    /* const protein_id = props.protein_id; // 2DHB.pdb*/
    const [showFold, setShowFold] = useState(false);
    const [pdb_name, setPdbName] = useState("");
    const [original_pdb_name, setOriginalPdbName] = useState("");
    const [fasta_seq, setFastaSeq] = useState("");
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

    async function getProtein(protein_id){
        console.log("Sended Prot");
        const response = await API.getProtein(protein_id)
        if(response.response === "success"){
            setFastaSeq(response.fasta);
            setOriginalPdbName(response.pdb);
            sendJob(response.fasta);
        }
        console.log("JOB", response);
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
      }));
      const classes = useStyles();

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper className={classes.paper}>{original_pdb_name === "" ? "Introduce el ID asignado en RCSB para comparar" : original_pdb_name.split(".")[0]}</Paper>
                    {!showFold &&(
                        <LinearProgress color="secondary"/>
                    )}
                </Grid>
                <Grid item xs>
                        <Paper  className={classes.paper}>{fasta_seq === "" ? "SIN CADENA DE AMINOACIDOS" : fasta_seq}</Paper>
                    {showFold &&(
                        <LinearProgress color="primary" variant="buffer" value={100} />
                    )}
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs>
                    <div>
                        <div style={{padding:"4rem"}} className="input-chain-desktop" >
                            <ProtInput title="Encontrar Proteina" label="introduce el identificador" run_function={getProtein} />
                        </div>
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs>
                    <div>
                        { showFold && (
                            <div className="fold-desktop" style={{marginLeft:"15%"}}>
                                <ProteinPlot protein_id={original_pdb_name} title={`Estructura original`}/>
                            </div>
                        )}
                    </div>
                </Grid>
            
                <Grid item xs>
                    <div>
                        { showFold && (
                            <div className="fold-desktop" style={{marginLeft:"10%"}}>
                                <ProteinPlot protein_id={pdb_name} title={`Mostrando predicción: ` + job_id}/>
                            </div>
                        )}
                    </div>
                </Grid>

            </Grid>
         

            
        </div>
    )
}

export default SingleFold;