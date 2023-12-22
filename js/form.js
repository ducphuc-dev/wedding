import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
    

    const db = getFirestore(); // Use 'firebase.database()' for Realtime Database

    // Add data to a collection (replace 'users' with your desired collection name)
    const data = {
        name,
        attend,
        guestDetail,
        message,
        createdAt: new Date(),
        approved: false
    }
    console.log("data: ", data)
    const docRef = await addDoc(collection(db, 'contacts'), data);
    alert("Cám ơn bạn đã gửi lời chúc!!!")
}

async function fetchContacts() {
    const db = getFirestore();

    // Replace 'contacts' with your desired collection name
    const querySnapshot = await getDocs(query(collection(db, 'contacts'), where('approved', '==', true)));

    const contactsList = [];
    querySnapshot.forEach((doc) => {
        contactsList.push(doc.data());
    });

    // Display contacts (you can customize this part based on your needs)
    displayContacts(contactsList);
    console.log("contactsList: ", contactsList)
}

function displayContacts(contactsList) {
    const messageList = document.querySelector('.message-list');

    // Clear previous content
    messageList.innerHTML = '';

    // Iterate through contactsList and render them as message boxes
    contactsList.forEach((contact, index) => {
        const messageBox = document.createElement('div');
        messageBox.className = 'col-12 message-box my-3';
        messageBox.style.backgroundColor = index % 2 === 0 ? 'aliceblue' : 'lavender';

        const nameParagraph = document.createElement('p');
        nameParagraph.className = 'text-left';
        nameParagraph.textContent = `Người gửi: ${contact.name.toUpperCase()}`;

        const messageParagraph = document.createElement('p');
        messageParagraph.className = 'text-left';
        messageParagraph.textContent = `Lời nhắn: ${contact.message}`;

        messageBox.appendChild(nameParagraph);
        messageBox.appendChild(messageParagraph);

        messageList.appendChild(messageBox);
    });
}

fetchContacts()
