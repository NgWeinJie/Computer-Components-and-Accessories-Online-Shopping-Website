var firebaseConfig = {
    apiKey: "AIzaSyC5vjF5KvUXl-9L_Eg12uFJfS8RDnuJY8k",
    authDomain: "fyp-project-f0d7c.firebaseapp.com",
    databaseURL: "https://fyp-project-f0d7c-default-rtdb.firebaseio.com",
    projectId: "fyp-project-f0d7c",
    storageBucket: "fyp-project-f0d7c.appspot.com",
    messagingSenderId: "251257836352",
    appId: "1:251257836352:web:ede9a320778542c590e0a5",
    measurementId: "G-SZSGSTX0CR"
};
firebase.initializeApp(firebaseConfig);

window.onload = function hideLoginIcon() {
    var emailLogin = window.localStorage.getItem('login')

    if (emailLogin) {
        document.getElementById('loginimg').style.display = "none";
    } else {
        document.getElementById('logout').style.display = "none";
    }
    fetchAndDisplayUserData();
}

function reloadPage() {
    var emailLogin = window.localStorage.getItem('login')

    if (emailLogin) {
        window.localStorage.removeItem('login');
    }

    window.location.replace("Login.html")
}

function openNav() { //open navigation bar
    document.getElementById("SideNav").style.width = "240px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() { //close navigation bar
    document.getElementById("SideNav").style.width = "0px";
    document.body.style.backgroundColor = "#E0E2E4";
}

function fetchAndDisplayUserData() {
    var userDataTable = document.getElementById("userDataTable");

    firebase.database().ref("users").once("value", function (snapshot) {
        var users = snapshot.val();

        if (users) {
            var tbody = userDataTable.getElementsByTagName("tbody")[0];

            Object.keys(users).forEach(function (email) {
                var user = users[email];

                var row = document.createElement("tr");

                var emailCell = document.createElement("td");
                emailCell.textContent = user.email;
                emailCell.style.wordBreak = "break-word"; // Set the word-break property
                emailCell.style.padding = "8px";
                row.appendChild(emailCell);

                var firstNameCell = document.createElement("td");
                firstNameCell.textContent = user.firstName || "";
                firstNameCell.style.wordBreak = "break-word"; // Set the word-break property
                firstNameCell.style.padding = "8px";
                row.appendChild(firstNameCell);

                var lastNameCell = document.createElement("td");
                lastNameCell.textContent = user.lastName || "";
                lastNameCell.style.wordBreak = "break-word"; // Set the word-break property
                lastNameCell.style.padding = "8px";
                row.appendChild(lastNameCell);

                var phoneNumberCell = document.createElement("td");
                phoneNumberCell.textContent = user.phoneNumber || "";
                phoneNumberCell.style.wordBreak = "break-word"; // Set the word-break property
                phoneNumberCell.style.padding = "8px";
                row.appendChild(phoneNumberCell);

                var addressCell = document.createElement("td");
                addressCell.textContent = user.address || "";
                addressCell.className = "address";
                addressCell.style.wordBreak = "break-word";
                addressCell.style.padding = "8px";
                row.appendChild(addressCell);

                tbody.appendChild(row);
            });
        }
    });
}

function scrollToTop(){
    window.scrollTo(0, 0);
}