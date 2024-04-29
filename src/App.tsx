import { useState, useEffect } from "react";
import "./App.css";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDygiNgW_8uInn4GDcV3zVYPk1Y45SGmKM",
  authDomain: "testfirebase-596fb.firebaseapp.com",
  projectId: "testfirebase-596fb",
  storageBucket: "testfirebase-596fb.appspot.com",
  messagingSenderId: "362647660179",
  appId: "1:362647660179:web:67cf9c0fe2ecfa3bb94f66",
  measurementId: "G-3BS6ZVHHN0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

function App() {
  const [newName, setNewName] = useState("");
  const [newMarks, setNewMarks] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    console.log(usersCollectionRef, "usersCollectionRef");

    await addDoc(usersCollectionRef, {
      name: newName,
      marks: Number(newMarks),
    });
    getUsers();
  };

  const updateUser = async (id: any, marks: any) => {
    const userDoc = doc(db, "users", id);
    const newFields = { marks: marks + 1 };
    await updateDoc(userDoc, newFields);
    getUsers();
  };

  const deleteUser = async (id: any) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  const getUsers = async () => {
    const data: any = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <div className="FormHolder">
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Marks..."
          onChange={(event) => {
            setNewMarks(parseInt(event.target.value));
          }}
        />
        <button onClick={createUser}>Create User</button>
      </div>
      <div className="user-cards">
        {users.map((user: any) => (
          <div key={user.id} className="user-card">
            <h1>Name: {user.name}</h1>
            <h1>Marks: {user.marks}</h1>
            <button onClick={() => updateUser(user.id, user.marks)}>
              Increase Marks
            </button>
            <button onClick={() => deleteUser(user.id)}>Delete User</button>
          </div>
        ))}
      </div>
    </div>

  );
}

export default App;
