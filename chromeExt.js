
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase,
         ref,
         push,
         onValue,
        remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
    databaseURL:  "https://leads-tracker-b1346-default-rtdb.firebaseio.com/"
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const refInDB = ref(database, "leads")

const inputsave = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("delete-btn")

onValue(refInDB, function(snapshot) {

    const snapshotExists = snapshot.exists()
    if (snapshotExists) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        console.log(leads)
        render(leads)
    }
})

function render(leads) {
    let listItems = ""
    // Render the leads in the unordered list using ulEl.textContent
    for (let i=0;i<leads.length; i++) {       
        // instead use template strings / literals
        listItems += `
                <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
                </li>
                `
    }
    ulEl.innerHTML = listItems
}

// 2. Listen for double clicks on the delete button (google it!)
// 3. When clicked, clear localStorage, myLeads, and the DOM
delBtn.addEventListener("dblclick", function() {
    remove(refInDB)
    ulEl.innerHTML = ""
})

// const tabs = [
//     {url: "https://www.linkedin.com/in/per-harald-borgen/"}
// ]

inputsave.addEventListener("click", function() {
    push(refInDB, inputEl.value)    
    inputEl.value = ""
})


