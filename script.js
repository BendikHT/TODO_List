//330113034040-cjbtfjjjsd14sv4npk7gesoipu2qh1dj.apps.googleusercontent.com
window.addEventListener("offline", () => {
    const notification = document.createElement("div");
    notification.id = "offline-notification";
    notification.innerText = "You have lost your internet connection.";
    document.body.appendChild(notification);
});
window.addEventListener("online", () => {
    const notification = document.getElementById("offline-notification");
    if (notification) {
        notification.innerHTML = "Connection established"
        setTimeout(() => notification.style.opacity = "0", 1000)
        setTimeout(() => notification.remove(), 2000);
    }
})

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
const completedButton = document.querySelector("#completedButton");
const completedTasks = document.querySelector(".completedTasks");

async function start() {
    document.title = username + " | ToDo";
    usernameh3.innerText = username;
    const querySnapshot = await getDocs(Todo);
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

        const taskDiv = document.createElement("div");
        taskDiv.className = "taskElm";
        taskDiv.textContent = docId;

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.addEventListener("click", async () => {
            const parent = checkbox.checked ? completedTasks : main;
            parent.removeChild(deleteButton);
            parent.removeChild(taskDiv);
            parent.removeChild(lable_container);
            await deleteDoc(docRef);
        });

        checkbox.addEventListener("change", async () => {
            if (checkbox.checked) {
                await setDoc(docRef, {
                    name: docId,
                    ferdig: true
                });
                main.removeChild(deleteButton);
                main.removeChild(taskDiv);
                main.removeChild(lable_container);

                completedTasks.insertBefore(deleteButton, completedTasks.firstChild);
                completedTasks.insertBefore(taskDiv, completedTasks.firstChild);
                completedTasks.insertBefore(lable_container, completedTasks.firstChild);
            } else {
                await setDoc(docRef, {
                    name: docId,
                    ferdig: false
                });
                completedTasks.removeChild(lable_container);
                completedTasks.removeChild(taskDiv);
                completedTasks.removeChild(deleteButton);

                main.appendChild(lable_container);
                main.appendChild(taskDiv);
                main.appendChild(deleteButton);
            }
        });

        lable_container.appendChild(checkbox);
        lable_container.appendChild(span);

        if (docFerdig === true) {
            checkbox.checked = true;
            completedTasks.insertBefore(deleteButton, completedTasks.firstChild);
            completedTasks.insertBefore(taskDiv, completedTasks.firstChild);
            completedTasks.insertBefore(lable_container, completedTasks.firstChild);
        } else {
            await setDoc(docRef, {
                name: docId,
                ferdig: docFerdig
            });
            main.appendChild(lable_container);
            main.appendChild(taskDiv);
            main.appendChild(deleteButton);
        }
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
        const docRef = doc(db, username, inputValue);
        await setDoc(doc(Todo, inputValue), {
            name: inputValue, ferdig: false
        });
        checkbox.addEventListener("change", async () => {
            if (checkbox.checked) {
                await setDoc(docRef, {
                    name: inputValue, ferdig: true
                });
            } else {
                await setDoc(docRef, {
                    name: inputValue,
                    ferdig: false
                });
            }
        });

        const taskDiv = document.createElement("div");
        taskDiv.className = "taskElm";
        taskDiv.textContent = inputValue;

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.addEventListener("click", async () => {
            const parent = checkbox.checked ? completedTasks : main;
            parent.removeChild(deleteButton);
            parent.removeChild(taskDiv);
            parent.removeChild(lable_container);
            await deleteDoc(docRef);
        });

        checkbox.addEventListener("change", async () => {
            if (checkbox.checked) {
                await setDoc(docRef, {
                    name: inputValue,
                    ferdig: true
                });
                main.removeChild(deleteButton);
                main.removeChild(taskDiv);
                main.removeChild(lable_container);

                completedTasks.insertBefore(deleteButton, completedTasks.firstChild);
                completedTasks.insertBefore(taskDiv, completedTasks.firstChild);
                completedTasks.insertBefore(lable_container, completedTasks.firstChild);
            } else {
                await setDoc(docRef, {
                    name: inputValue,
                    ferdig: false
                });
                completedTasks.removeChild(deleteButton);
                completedTasks.removeChild(taskDiv);
                completedTasks.removeChild(lable_container);

                main.insertBefore(deleteButton, main.firstChild);
                main.insertBefore(taskDiv, main.firstChild);
                main.insertBefore(lable_container, main.firstChild);
            }
        });

        lable_container.appendChild(checkbox);
        lable_container.appendChild(span);

        main.appendChild(lable_container);
        main.appendChild(taskDiv);
        main.appendChild(deleteButton);

        addInput.value = "";
    }
});


completedButton.addEventListener("click", () => {
    if (completedTasks.classList.contains("expanded")) {
        completedTasks.classList.remove("expanded");
        completedButton.innerHTML = 'Completed Task <i class="fa-solid fa-chevron-down"></i>';
    } else {
        completedTasks.classList.add("expanded");
        completedButton.innerHTML = 'Completed Task <i class="fa-solid fa-chevron-up"></i>';

    }
});
