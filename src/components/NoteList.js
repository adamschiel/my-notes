import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import NoteDialog from './NoteDialog'
import db from './db';

class NoteList extends Component {
    constructor( props ) {
      super( props );

      this.state = { notes: [] }
    }

    componentDidMount() {
      db.table('notes')
        .toArray()
        .then((notes) => {
          notes.sort(function(a, b){return(a.date < b.date)})
          this.setState({ notes });
        });
    }

    handleNoteSave = ( id, title, data ) => {
      db.table('notes')
        .update(id, { "title": title, "data": data, "date": Date.now() })
        .then(() => {
          const noteToUpdate = this.state.notes.find((note) => note.id === id);
          const newList = [
            ...this.state.notes.filter((note) => note.id !== id),
            Object.assign({}, noteToUpdate, { "title": title, "data": data, "date": Date.now() })
          ];
          newList.sort(function(a, b){return(a.date < b.date)});
          this.setState({ notes: newList });
        });
    }

    handleNoteDelete = ( id ) => {
      db.table('notes')
        .delete(id)
        .then(() => {
          const newList = this.state.notes.filter((note) => note.id !== id);
          this.setState({ notes: newList });
        });
    }

    handleNoteAdd = () => {
     const note = {
        "title": "",
        "data": "",
        "date": Date.now()
      };

      db.table('notes')
        .add(note)
        .then((id) => {
          const newNotes = [...this.state.notes, Object.assign({}, note, { id })];
          newNotes.sort(function(a, b){return(a.date < b.date)});
          this.setState({ notes: newNotes });
        });
    }

    render() {
      return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit" style={{textAlign: 'left', flex: 1}}>
                My Notes
              </Typography>
              <IconButton edge="start" color="inherit" onClick={this.handleNoteAdd} aria-label="add">
                <AddIcon fontSize="large" />
              </IconButton>
            </Toolbar>
          </AppBar>
          { this.state.notes ? (
            <Grid container spacing={1} style={{padding: 8}}>
              { this.state.notes.map((currentNote) => (
                <Grid item xs={4} sm={3} lg={2} xl={1}>
                  <NoteDialog 
                    note={currentNote} 
                    onNoteSave={this.handleNoteSave} 
                    onNoteDelete={this.handleNoteDelete} />
                </Grid>
              ))}
            </Grid>
          ) : "No notes found" }
        </div>
      )
  }
}
export default NoteList;

