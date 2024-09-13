// JavaScript source code
const firebaseConfig = {
    // Your Firebase config here
    apiKey: "AIzaSyC5vjF5KvUXl-9L_Eg12uFJfS8RDnuJY8k",
    authDomain: "fyp-project-f0d7c.firebaseapp.com",
    databaseURL: "https://fyp-project-f0d7c-default-rtdb.firebaseio.com",
    projectId: "fyp-project-f0d7c",
    storageBucket: "fyp-project-f0d7c.appspot.com",
    messagingSenderId: "251257836352",
    appId: "1:251257836352:web:ede9a320778542c590e0a5",
    measurementId: "G-SZSGSTX0CR"
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

function encryptData(data, key) {
    var encryptedData = CryptoJS.AES.encrypt(data, key).toString();
    return encryptedData;
}

function decryptData(encryptedData, key) {
    var decryptedData = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

var encryptionKey = "mtech123";

window.onload = function bothf() {
    hideLoginIcon();
    fetchAndDisplayUserData();
}

function hideLoginIcon() {
    var emailLogin = window.localStorage.getItem('login')

    if (emailLogin) {
        document.getElementById('loginimg').style.display = "none";
    } else {
        document.getElementById('logout').style.display = "none";
    }
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

function openCart(){ //open cart
    document.getElementById("Cart").style.width = "240px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeCart(){ //close cart
    document.getElementById("Cart").style.width = "0px"; 
    document.body.style.backgroundColor = "#E0E2E4";
}

function fetchAndDisplayUserData() {
    var productTableBody = document.getElementById("history");
    var emailLogin = window.localStorage.getItem('login');
    emailLogin = decryptData(emailLogin,encryptionKey);

    if (!emailLogin) {
        console.log("User is not logged in");
        return;
    }

    firebase.database().ref("orders").orderByChild("email").equalTo(emailLogin).once("value", function (snapshot) {
        var orders = snapshot.val();

        if (orders) {
            var tbodyh = productTableBody.getElementsByClassName("tbodyh")[0];
            var orderCount = 1;

            Object.values(orders).forEach(function (orderData) {
                var email = orderData.email;
                var cartItems = orderData.cartItems;

                cartItems.forEach(function (item, index) {
                    var row = document.createElement("tr");

                    if (index === 0) {
                        var noCell = document.createElement("td");
                        noCell.setAttribute('class', 'td1');
                        noCell.setAttribute('id', 'number');
                        noCell.style.border = "1px solid black";
                        noCell.textContent = orderCount++;
                        noCell.rowSpan = cartItems.length;
                        noCell.style.wordBreak = "break-word";
                        noCell.style.padding = "8px";
                        row.appendChild(noCell);
                    }

                    var nameCell = document.createElement("td");
                    nameCell.setAttribute('class', 'td2');
                    nameCell.setAttribute('id', 'productname');
                    nameCell.style.border = "1px solid black";
                    nameCell.textContent = item.name;
                    nameCell.style.wordBreak = "break-word";
                    nameCell.style.padding = "8px";
                    row.appendChild(nameCell);

                    var priceCell = document.createElement("td");
                    priceCell.setAttribute('class', 'td3');
                    priceCell.setAttribute('id', 'productprice');
                    priceCell.style.border = "1px solid black";
                    priceCell.textContent = item.price;
                    priceCell.style.padding = "8px";
                    priceCell.style.wordBreak = "break-word";
                    row.appendChild(priceCell);

                    var quantityCell = document.createElement("td");
                    quantityCell.setAttribute('class', 'td4');
                    quantityCell.setAttribute('id', 'productquantity');
                    quantityCell.style.border = "1px solid black";
                    quantityCell.textContent = item.quantity;
                    quantityCell.style.padding = "8px";
                    quantityCell.style.wordBreak = "break-word";
                    row.appendChild(quantityCell);

                    var totalPriceCell = document.createElement("td");
                    totalPriceCell.setAttribute('class', 'td5');
                    totalPriceCell.setAttribute('id', 'producttotalprice');
                    totalPriceCell.style.border = "1px solid black";
                    totalPriceCell.textContent = item.totalPrice;
                    totalPriceCell.style.padding = "8px";
                    totalPriceCell.style.wordBreak = "break-word";
                    row.appendChild(totalPriceCell);

                    tbodyh.appendChild(row);
                    
                });
            });
        }
    });
}