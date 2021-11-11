import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { db } from './firebase';
import { FormControl, List, TextField } from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
// import { makeStyles } from '@material-ui/styles';
import TaskItem from './TaskItem';
import { auth } from './firebase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import firebase from 'firebase';
import BackAnimation from './BackAnimation';

// const useStyles = makeStyles({
//   field: {
//     marginTop: 30,
//     margiinBottom: 20,
//   },
//   list: {
//     margin: "auto",
//     width: "40%",
//   },
// });


const App: React.FC = (props: any) => {
  const [tasks, setTasks] = useState([{id:'', title:''}]);
  const [input, setInput] = useState('');
  // const classes = useStyles();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push('login');
    });
    return () => unSub();
  })
  const [currentUser, setCurrentUser] = useState(firebase.auth().currentUser);
  // let {currentUser}: any = firebase.auth();
  useEffect(() => {
    let unSub = () => {};
    firebase.auth().onAuthStateChanged(user => {
      // currentUser = firebase.auth().currentUser;
      setCurrentUser(firebase.auth().currentUser);
      if (currentUser) {
        unSub = db.collection(`users/${currentUser.uid}/todos`).onSnapshot((snapshot) => {
          setTasks(
            snapshot.docs.map((doc) => {
              return (
                {
                  id: doc.id,
                  title: doc.data().title
                }
              )
            })
          )
        })
      }
    });
    return () => unSub();
  }, [currentUser]);

  const newTask = (e:  React.MouseEvent<HTMLButtonElement> ) => {
    const { currentUser }: any = firebase.auth();
    db.collection(`users/${currentUser.uid}/todos`).add({title: input});
    setInput('');
  };

  return (
    <div className={styles.app__root}>
      <BackAnimation />
      <div className={styles.position}>
        <h1>ToDoApp by React and Firebase</h1>
        <button
          className={styles.app__logout}
          onClick={
            async () => {
              try {
                await auth.signOut();
                props.history.push('login');
              } catch (error: any) {
                alert('The email address or password is incorrect.');
              }
            }
          }
        >
          Logout<ExitToAppIcon />
        </button>
        <br />
        <FormControl>
          <TextField
            className={styles.field}
            InputLabelProps={{
              shrink: true,
            }}
            label="Add new task"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              return (
                setInput(e.target.value)
              )
            }}
          />
        </FormControl>
        <button className={styles.app__icon} disabled={!input} onClick={newTask}>
          <AddToPhotosIcon />
        </button>
        <List className={styles.list}>
          {tasks.map((task, index) => (
            <TaskItem key={task.id} id={task.id} title={task.title} />
          ))}
        </List>
      </div>
    </div>
  );
}

export default App;
