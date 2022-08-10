const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyBqylFWcuG2dGgBnoe2oLiFRZ4wDgtJY0g",
    authDomain: "mern-ecommerce-4e346.firebaseapp.com",
    projectId: "mern-ecommerce-4e346",
    storageBucket: "mern-ecommerce-4e346.appspot.com",
    messagingSenderId: "728309366576",
    appId: "1:728309366576:web:4f98688410bd5a3ba092f5",
    measurementId: "G-DG3VP5TJ5B"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = storage