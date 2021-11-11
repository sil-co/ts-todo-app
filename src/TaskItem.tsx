import React, {useState} from 'react';
// import * as firebase from 'firebase/app';
import firebase from 'firebase/app';
import { ListItem, TextField, Grid } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import { db } from './firebase';
import styles from './TaskItem.module.css';

interface PROPS {
  id: string,
  title: string,
}

const TaskItem: React.FC<PROPS> = (props) => {
  const [title, setTitle] = useState(props.title);
  const {currentUser} = firebase.auth();

  const editTask = () => {
    if (currentUser) {
      db.collection(`users/${currentUser.uid}/todos`).doc(props.id).set({title: title}, { merge: true });
      // db.collection('tasks').doc(props.id).set({title: title}, { merge: true });
    }
    };
  const deleteTask = () => {
    if (currentUser) {
      db.collection(`users/${currentUser.uid}/todos`).doc(props.id).delete();
    }
  };

  return (
    <ListItem>
      <h2>{props.title}</h2>
      <Grid container justifyContent="flex-end">
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="Edit"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setTitle(e.target.value)}
          className={styles.textitem}
        />
      </Grid>
      <button className={styles.taskitem__icon} onClick={editTask}>
        <EditOutlinedIcon />
      </button>
      <button className={styles.taskitem__icon} onClick={deleteTask}>
        <DeleteOutlineOutlinedIcon />
      </button>
    </ListItem>

  );
};

export default TaskItem;
