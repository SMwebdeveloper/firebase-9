import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

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

// collection ref
const colRef = collection(db, "books");

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });


// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then(() => {
    addBookForm.reset()
  })

})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const delRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(delRef)
    .then(() => {
        deleteBookForm.reset()
    })
})