//330113034040-cjbtfjjjsd14sv4npk7gesoipu2qh1dj.apps.googleusercontent.com
const username = localStorage.getItem("username");

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
    doc,
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
const Todo = collection(db, username);


async function start() {
    const querySnapshot = await getDocs(collection(db, username));
    querySnapshot.forEach(async (docSnapshot) => {
        let docId = docSnapshot.id;
        let docFerdig = docSnapshot.data().ferdig;

        const lable_container = document.createElement("label")
        lable_container.className = "lable_container"
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.id = docId;
        const span = document.createElement("span")
        span.className = "checkmark"
        const docRef = doc(db, username, docId);

        await setDoc(docRef, {
            name: docId,
            ferdig: docFerdig
        });
        checkbox.checked = docFerdig;

        checkbox.addEventListener("change", async () => {
            if (checkbox.checked) {
                await setDoc(docRef, {
                    name: docId,
                    ferdig: true
                });
            } else {
                await setDoc(docRef, {
                    name: docId,
                    ferdig: false
                });
            }
        });

        const taskDiv = document.createElement("div");
        taskDiv.textContent = docId;

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.addEventListener("click",async () => {
            main.removeChild(deleteButton);
            main.removeChild(taskDiv);
            main.removeChild(lable_container);
            await deleteDoc(doc(db, "TodoList", docId));
        });

        lable_container.appendChild(checkbox);
        lable_container.appendChild(span);

        main.appendChild(lable_container);
       
        main.appendChild(taskDiv);
        main.appendChild(deleteButton);
    });
}

start()
const addButton = document.querySelector("#add_button");
const addInput = document.querySelector("#add_input");
const main = document.querySelector("main");

addButton.addEventListener("click", async () => {
    const inputValue = addInput.value.trim();
    if (inputValue) {
        const lable_container = document.createElement("label")
        lable_container.className = "lable_container"
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.id = inputValue;
        const span = document.createElement("span")
        span.className = "checkmark"
        const docRef = doc(db, "TodoList", inputValue);
        await setDoc(doc(Todo, inputValue), {
            name: inputValue, ferdig: false
        });
        checkbox.addEventListener("change", async () => {
            if (checkbox.checked) {
                await setDoc(doc(Todo, inputValue), {
                    name: inputValue, ferdig: true
                });
            } else {
                await setDoc(doc(Todo, inputValue), {
                    name: inputValue, ferdig: false
                });
            }
        });

        const taskDiv = document.createElement("div");
        taskDiv.textContent = inputValue;

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.addEventListener("click", () => {
            main.removeChild(deleteButton);
            main.removeChild(taskDiv);
            main.removeChild(lable_container);
            await deleteDoc(doc(db, "TodoList", docId));
        });


        lable_container.appendChild(checkbox);
        lable_container.appendChild(span);

        main.appendChild(lable_container);
       
        main.appendChild(taskDiv);
        main.appendChild(deleteButton);

        addInput.value = "";
    }
});




