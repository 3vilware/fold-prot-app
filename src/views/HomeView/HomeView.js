import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ProfileBarView from '../../components/ProfileBarVIew/ProfileBarView'
import TableData from '../../components/TableData';
import SingleFold from '../SingleFold/SingleFold';
import MultiFold from '../MultiFold/MultiFold';
import MyModels from '../../components/MyModels/MyModels'
import CodeEditor from '../../components/CodeEditor/CodeEditor'

import WavesIcon from '@material-ui/icons/Waves';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import HistoryIcon from '@material-ui/icons/History';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import AccountTreeIcon from '@material-ui/icons/AccountTree';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function HomeView() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedFunction, setSelectedFunction] = React.useState("singleFold")

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect( () => {
    const token = localStorage.getItem("AUTH") 
    console.log(window.location.pathname)
    if( token === null || token === ""){
      if(String(window.location.pathname) !== '/login'){
        window.location = '/login'
      }else{
        console.log(window.location.pathname)
        alert("nologin")
      }
    }
  })

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Prot-Lab
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
              <ProfileBarView/>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <ListItem button key={''} onClick={ () => {setSelectedFunction('singleFold')}}>
                <ListItemIcon> <WavesIcon/> </ListItemIcon>
                <ListItemText primary={'Predecir'} />
          </ListItem>
          <ListItem button key={''} onClick={ () => {setSelectedFunction('multiFold')}}>
                <ListItemIcon> <SyncAltIcon/> </ListItemIcon>
                <ListItemText primary={'Comparar Plegamientos'} />
          </ListItem>
          <ListItem button key={'Historial'} onClick={ () => {setSelectedFunction('history')}}>
                <ListItemIcon> <HistoryIcon/> </ListItemIcon>
                <ListItemText primary={'Historial Plegamientos'} />
          </ListItem>
          <ListItem button key={'Mis Modelos'} onClick={ () => {setSelectedFunction('mymodels')}}>
                <ListItemIcon> <CloudQueueIcon/> </ListItemIcon>
                <ListItemText primary={'Mis Modelos'} />
          </ListItem>
         {/*  <ListItem button key={'Models-Hub'} onClick={ () => {setSelectedFunction('history')}}>
                <ListItemIcon>{}</ListItemIcon>
                <ListItemText primary={'Models-Hub'} />
          </ListItem> */}
          <ListItem button key={'Editor De Modelos'} onClick={ () => {setSelectedFunction('modelsEditor')}}>
                <ListItemIcon> <AccountTreeIcon/> </ListItemIcon>
                <ListItemText primary={'Editor De Modelos'} />
          </ListItem>
        {/*   {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        </List>
        <Divider />
        <List>
          <ListItem button key={''} onClick={() => {
            localStorage.removeItem("AUTH");
            window.location = "/";
          }}>
            <ListItemIcon> <InboxIcon /> </ListItemIcon>
            <ListItemText primary={'Salir'} />
          </ListItem>
          {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

            {/* Content */}
            { selectedFunction == "singleFold" && (
              <SingleFold/>
            )}
            { selectedFunction == "history" && (
              <TableData/>
            )}
            { selectedFunction == "mymodels" && (
              <MyModels/>
            )}
            { selectedFunction == "multiFold" && (
              <MultiFold/>
            )}
            { selectedFunction == "modelsEditor" && (
              <CodeEditor/>
            )}



            
      </main>
    </div>
  );
}
