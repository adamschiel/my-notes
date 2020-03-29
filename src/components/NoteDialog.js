import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import ConfirmDialog from './ConfirmDialog.js';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  dialogEditTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  noteTitle: {
    margin: 3,
    overflow: 'hidden',
    textAlign: 'left',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  noteData: {
    margin: 3,
    overflow: 'hidden',
    textAlign: 'left',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  noteButton: {
    backgroundColor: 'yellow',
    paddingTop: '75%',
    position: 'relative',
    width: '100%',
    textTransform: 'none',
  },
  notePaper: {
    backgroundColor: 'yellow',
    position: 'absolute',
    top: 2,
    left: 2,
    bottom: 2,
    right: 2,
  },
  noteTextField: {
    margin: 10,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NoteDialog( props ) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.onNoteSave( props.note.id,
                      document.getElementById("note-title-tf-"+props.note.id).value,
                      document.getElementById("note-data-tf-"+props.note.id).value );
    handleClose();
  };

  const handleDelete = () => {
    props.onNoteDelete( props.note.id );
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" className={classes.noteButton} onClick={handleClickOpen}>
        <Paper elevation={0} className={classes.notePaper}>
          <Typography variant="h6" className={classes.noteTitle}>
            {props.note.title}
          </Typography>
          <Divider />
          <Typography className={classes.noteData}>
            {props.note.data}
          </Typography>
        </Paper>
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" className={classes.dialogEditTitle}>
              Edit Note
            </Typography>
            <IconButton edge="start" color="inherit" onClick={() => setConfirmOpen(true)} aria-label="delete">
              <DeleteIcon fontSize="large" />
            </IconButton>
            <ConfirmDialog
              title="Delete Note?"
              open={confirmOpen}
              setOpen={setConfirmOpen}
              onConfirm={handleDelete}
            >
              Are you sure you want to delete this note?
            </ConfirmDialog>
            <IconButton edge="start" color="inherit" onClick={handleSave} aria-label="save">
              <SaveIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>
          <TextField id={"note-title-tf-"+props.note.id} variant="outlined" label="Title"
            defaultValue={props.note.title} className={classes.noteTextField} />
          <TextField multiline id={"note-data-tf-"+props.note.id} variant="outlined" label="Note"
            defaultValue={props.note.data} className={classes.noteTextField} />
      </Dialog>
    </div>
  );
}
