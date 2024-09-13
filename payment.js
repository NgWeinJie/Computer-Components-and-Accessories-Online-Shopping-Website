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
    displayCart();
    fetchAndDisplayCartData();
}

function printAmount(elementId, hintMsg) { //function validation() will call this function
    document.getElementById(elementId).innerHTML = hintMsg;
}

function reloadPage(){
    var emailLogin = window.localStorage.getItem('login')
    
    if(emailLogin){
        window.localStorage.removeItem('login');
    }
    
    window.location.replace("Login.html")
}

function openTng(){ //open pop up
    var modal = document.getElementById("tngmodal");
    modal.style.display = "block";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeTng(){ //close pop up
    var modal = document.getElementById("tngmodal");
    modal.style.display = "none";
    document.body.style.backgroundColor = "#E0E2E4";
}

function openDuitnow(){ //open pop up
    var modal = document.getElementById("duitnowmodal");
    modal.style.display = "block";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeDuitnow(){ //close pop up
    var modal = document.getElementById("duitnowmodal");
    modal.style.display = "none";
    document.body.style.backgroundColor = "#E0E2E4";
}

function openNav(){ //open navigation bar
    document.getElementById("SideNav").style.width = "240px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav(){ //close navigation bar
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

function fetchUserData() {
    return new Promise((resolve, reject) => {
        var emailLogin = window.localStorage.getItem('login');
        emailLogin = decryptData(emailLogin,encryptionKey);

        if (emailLogin) {
            console.log(emailLogin)
            var encodedEmail = encodeURIComponent(emailLogin); // Encode the email
            var usersRef = firebase.database().ref('users');
            console.log(usersRef)
            usersRef
                .child(emailLogin.replaceAll('.', ','))
                .once('value')
                .then((snapshot) => {
                    console.log(snapshot)
                    var userData = snapshot.val();
                    resolve(userData); // Resolve with the user data
                })
                .catch((error) => {
                    reject(error); // Reject with the error message
                });
        } else {
            reject('User data not found'); // Reject with the error message
        }
    });
}

function hideLoginIcon() {
    var emailLogin = window.localStorage.getItem('login');
    emailLogin = decryptData(emailLogin,encryptionKey);

    if (emailLogin) {
        document.getElementById('loginimg').style.display = 'none';
    } else {
        document.getElementById('logout').style.display = 'none';
    }

    fetchUserData()
        .then((userData) => {
            // User data is successfully fetched
            console.log(userData);

            document.getElementById('user_fname').value = userData.firstName || '';
            document.getElementById('user_lname').value = userData.lastName || '';
            document.getElementById('user_phoneNo').value = userData.phoneNumber || '';
            document.getElementById('user_address').value = userData.address || '';
        })
        .catch((error) => {
            //Error occurred while fetching user data
            console.error(error);
        });
};

// Add event listener to listen for key press events
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        saveUserData();
    }
});

function fetchAndDisplayCartData() {
    console.log('fetchAndDisplayCartData')
    var cartDetailsTable = document.getElementById("cartDetailsTable");

    firebase.database().ref("carts").once("value", function (snapshot) {
        var carts = snapshot.val();
        
        if (carts) {
            var tbodyc = cartDetailsTable.getElementsByClassName("tbodyc")[0];
            var emailLogin = window.localStorage.getItem('login');
            emailLogin = decryptData(emailLogin,encryptionKey);

            var hasMatch = false;

            Object.keys(carts).forEach(function (email) {
                var cart = carts[email];

                console.log(email.replaceAll(',', '.'));
                console.log(emailLogin, encryptionKey)
                console.log('dec',CryptoJS.AES.decrypt(emailLogin, "SecretKey").toString(CryptoJS.enc.Utf8));


                if (email.replaceAll(',', '.') === emailLogin || email === emailLogin) {
                    console.log(cart);

                    Object.keys(cart).forEach(function (objectKey) {
                        var item = cart[objectKey];

                        var row = document.createElement("tr");

                        var nameCell = document.createElement("td");
                        nameCell.setAttribute('class', 'td1');
                        nameCell.setAttribute('id', 'productname');
                        nameCell.style.border = "1px solid black";
                        nameCell.textContent = item.name || "";
                        nameCell.style.wordBreak = "break-word";
                        nameCell.style.padding = "8px";
                        row.appendChild(nameCell);

                        var priceCell = document.createElement("td");
                        priceCell.setAttribute('class', 'td2');
                        priceCell.setAttribute('id', 'productprice');
                        priceCell.style.border = "1px solid black";
                        priceCell.textContent = item.price || "";
                        priceCell.style.wordBreak = "break-word";
                        priceCell.style.padding = "8px";
                        row.appendChild(priceCell);

                        var quantityCell = document.createElement("td");
                        quantityCell.setAttribute('class', 'td3');
                        quantityCell.setAttribute('id', 'productquantity');
                        quantityCell.style.border = "1px solid black";
                        quantityCell.textContent = item.quantity || "";
                        quantityCell.style.wordBreak = "break-word";
                        quantityCell.style.padding = "8px";
                        row.appendChild(quantityCell);

                        var totalprice = item.quantity * item.price;

                        var totalpriceCell = document.createElement("td");
                        totalpriceCell.setAttribute('class', 'td3');
                        totalpriceCell.setAttribute('id', 'producttotalprice');
                        totalpriceCell.style.border = "1px solid black";
                        totalpriceCell.textContent = totalprice;
                        totalpriceCell.style.wordBreak = "break-word";
                        totalpriceCell.style.padding = "8px";
                        row.appendChild(totalpriceCell);

                        tbodyc.appendChild(row);
                        
                        hasMatch = true;

                        if (hasMatch) {
                            countsubtotal(totalprice); // Call countsubtotal function with totalPrice as argument
                        }
                    });
                }
            });
        }
    });
    displayCart();
}

var subtotal = 0;
function countsubtotal(totalprice) {
    console.log(totalprice);

    subtotal += totalprice
    console.log(totalprice,subtotal);

    var subTotalElement = document.getElementById("sub_total");

    subTotalElement.value = subtotal.toFixed(2);
}

var ordertotal = 0;
function countOrdert() {
    var subtotal = parseFloat(document.getElementById('sub_total').value);
    console.log(subtotal)

    var shippingFees = parseFloat(document.getElementById('shipping_fees').value);
    console.log(shippingFees)
    
    ordertotal = subtotal + shippingFees;

    document.getElementById('order_total').value = ordertotal.toFixed(2);
}

var discount = 0;
function countdiscount(){
    var subtotal = parseFloat(document.getElementById('sub_total').value);
    console.log(subtotal)

    var shippingFees = parseFloat(document.getElementById('shipping_fees').value);
    console.log(shippingFees)

    var voucher = document.getElementById('voucher_code').value;

    var voucher1 = "MTECH10";
    var voucher2 = "MTECH20";
    var voucher3 = "MTECHMERDEKA";

    if(voucher == voucher1){
        discount = subtotal * 0.1;
        printAmount("discount_amount", "-RM" + discount.toFixed(2));

        ordertotal = (subtotal - discount) + shippingFees;
        document.getElementById('order_total').value = ordertotal.toFixed(2);
    } else if(voucher == voucher2){
        discount = subtotal * 0.2;
        printAmount("discount_amount", "-RM" + discount.toFixed(2));

        ordertotal = (subtotal - discount) + shippingFees;
        document.getElementById('order_total').value = ordertotal.toFixed(2);
    } else if(voucher == voucher3){
        discount = subtotal * 0.15;
        printAmount("discount_amount", "-RM" + discount.toFixed(2));

        ordertotal = (subtotal - discount) + shippingFees;
        document.getElementById('order_total').value = ordertotal.toFixed(2);
    } else if(voucher == ""){
        printAmount("discount_amount", "Please enter voucher code");
    } else{
        printAmount("discount_amount", "Voucher is invalid.");
    }
}

function shippingfees(fees){
    var shipping = document.getElementById('deliveryopt_shipping');
    var express = document.getElementById('deliveryopt_express');

    if (shipping && shipping.checked){
        fees = 10;
        var voucher = document.getElementById('voucher_code');
        printAmount("discount_amount", "");

        voucher.value = "";
    } else if (express && express.checked){
        fees = 15;
        var voucher = document.getElementById('voucher_code');
        printAmount("discount_amount", "");
        voucher.value = "";
    }

    document.getElementById('shipping_fees').value = fees.toFixed(2);
    countOrdert();
}

function scrollToTop(){
    window.scrollTo(0, 0);
}

function clearUserCart() {
    // Remove the cart items from the Realtime Database
    var emailLogin = window.localStorage.getItem('login');
    emailLogin = decryptData(emailLogin,encryptionKey);

    if (emailLogin) {
        var cartRef = firebase.database().ref("carts/" + emailLogin.replaceAll(".", ","));
        // Remove the cart data
        cartRef.remove()
            .catch(function (error) {
                console.error("Error removing cart data: ", error);
            });
    }
    // Display message
    alert("Your order has been received.");
    // Redirect to the home page
    window.location.href = "Home.html";
}

function uploadFileAndSaveData(file, orderId) {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`payment_receipts/${orderId}/${referenceId}`);

    fileRef.put(file).then((snapshot) => {
        // Get the file URL after successful upload
        snapshot.ref.getDownloadURL().then((fileUrl) => {
            // Save the file URL to the Realtime Database
            firebase.database().ref(`orders/${orderId}/payment_receipt`).set(fileUrl);
        });
    });
}

function placeOrder() {
    const database = firebase.database();
    const storage = firebase.storage();

    // Get the input values
    var email = window.localStorage.getItem('login');
    email = decryptData(email,encryptionKey);

    const firstName = document.getElementById('user_fname').value;
    const lastName = document.getElementById('user_lname').value;
    const phoneNumber = document.getElementById('user_phoneNo').value;
    const fullAddress = document.getElementById('user_address').value;
    const paymentOption = document.querySelector('input[name="paymentopt"]:checked').value;
    const referenceId = (document.getElementsByClassName('refid')[0]?.value) || (document.getElementsByClassName('refid')[1]?.value);
    const deliveryOption = document.querySelector('input[name="deliveryopt"]:checked').value;
    const subTotal = document.getElementById('sub_total').value;
    const voucherCode = document.getElementById('voucher_code').value;
    const shippingFees = document.getElementById('shipping_fees').value;
    const orderTotal = document.getElementById('order_total').value;
    const paymentReceiptFile = document.getElementById('payment_receipt').files[0];

    // Get the cart items from the table
    var cartItems = [];
    var table = document.getElementById("cartDetailsTable");
    var rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var itemName = cells[0].innerText;
        var itemPrice = cells[1].innerText;
        var itemQuantity = cells[2].innerText;
        var itemTotalPrice = cells[3].innerText;

        cartItems.push({
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity,
            totalPrice: itemTotalPrice
        });
    }

    // Save the data to the Realtime Database
    const orderData = {
        email,
        firstName,
        lastName,
        phoneNumber,
        fullAddress,
        paymentOption,
        referenceId,
        deliveryOption,
        subTotal,
        voucherCode,
        shippingFees,
        orderTotal,
        status: "pending",
        cartItems: cartItems
    };

    const newOrderRef = database.ref('orders').child(referenceId);
    newOrderRef.set(orderData);

    // Upload the payment receipt file to Firebase Storage
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`payment_receipts/${newOrderRef.key}/${referenceId}`);
    const uploadTask = fileRef.put(paymentReceiptFile);

    uploadTask.on('state_changed',
        null,
        (error) => {
            console.error('Error uploading file:', error);
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                // Save the file URL to the Realtime Database
                newOrderRef.child('paymentReceiptURL').set(downloadURL);
                // Proceed with further actions after successful upload and saving URL
                clearUserCart();
            });
        }
    );
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        placeOrder();
    }
});