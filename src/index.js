import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCigry1OjPlDVj9Uo_EGtnb4NP4wHbIYJE",
  authDomain: "fir-9-c3a32.firebaseapp.com",
  projectId: "fir-9-c3a32",
  storageBucket: "fir-9-c3a32.appspot.com",
  messagingSenderId: "1050015084079",
  appId: "1:1050015084079:web:b22a691cec20266a9c60da",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth()

// collection ref
const colRef = collection(db, "books");

// queries
const q = query(colRef, orderBy("createdAt"));
// real time collection data
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// adding docs
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting docs
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const delRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(delRef).then(() => {
    deleteBookForm.reset();
  });
});

// get single document
const docRef = doc(db, "books", "nnHm16rWPTFIUdr6nYX5");

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// updating a document
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let docRef = doc(db, "books", updateForm.id.value);

  updateDoc(docRef, {
    title: "update title",
  }).then(() => {
    updateForm.reset();
  });
});
