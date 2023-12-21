import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// form.js
document.getElementById('contact').addEventListener('submit', submitForm);

async function submitForm(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Get form data
    const name = document.getElementById('name').value;
    const attend = document.getElementById('attendiesDetails').value;
    const guestDetail = document.getElementById('guestDetails').value;
    const message = document.getElementById('message').value;

    // Save data to Firebase
    await saveToFirebase(name, attend, guestDetail, message);
}

async function saveToFirebase(name, attend, guestDetail, message) {
    // Use Firebase SDK to save data to Firestore or Realtime Database
    // Replace with your Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyD7wsTYx7-AACGq5gVq3pe8lLWJmC4-XcA",
        authDomain: "wedding-81b23.firebaseapp.com",
        projectId: "wedding-81b23",
        storageBucket: "wedding-81b23.appspot.com",
        messagingSenderId: "248444595911",
        appId: "1:248444595911:web:c451b6ccefb5cfca5e98e2"
    };

    initializeApp(firebaseConfig);

    const db = getFirestore(); // Use 'firebase.database()' for Realtime Database

    // Add data to a collection (replace 'users' with your desired collection name)
    const data = {
        name,
        attend,
        guestDetail,
        message,
        createdAt: new Date()
    }
    console.log("data: ", data)
    const docRef = await addDoc(collection(db, 'contacts'), data);
    alert("Cám ơn bạn đã gửi lời chúc!!!")
}
