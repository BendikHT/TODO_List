import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import {
    getFirestore,
    collection,
    setDoc,
    getDocs,
    addDoc,
    query,
    where,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyAB13PrMaKFBuTwmIEAdfpGtdpEDpMgFx4",
    authDomain: "todo-list-a92ce.firebaseapp.com",
    projectId: "todo-list-a92ce",
    storageBucket: "todo-list-a92ce.firebasestorage.app",
    messagingSenderId: "26733150867",
    appId: "1:26733150867:web:6ff60923ec0cc465fc0366",
    measurementId: "G-S1F4RWE6TQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const Todo = collection(db, "TodoList");

const checkbox = document.querySelector("#checkbox");

checkbox.addEventListener("change", async () => {
    if (checkbox.checked) {
        console.log("Checkbox is checked");
        await setDoc(doc(Todo, "1"), {
            name: "Lage Middag", ferdig: true
        });
    } else {
        console.log("Checkbox is not checked");
        await setDoc(doc(Todo, "1"), {
            name: "Lage Middag", ferdig: false
        });
    }
});


