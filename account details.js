// Initialize Firebase
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

window.onload = function bothf(){
    hideLoginIcon();
}

function printError(elementId, hintMsg) { // The validation() function will call this function
    document.getElementById(elementId).innerHTML = hintMsg;
}

function reloadPage() {
    var emailLogin = window.localStorage.getItem('login');

    if (emailLogin) {
        window.localStorage.removeItem('login');
    }

    window.location.replace("Login.html");
}

function openNav() { // Open navigation bar
    document.getElementById("SideNav").style.width = "240px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() { // Close navigation bar
    document.getElementById("SideNav").style.width = "0px";
    document.body.style.backgroundColor = "#E0E2E4";
}

function openCart() { // Open cart
    document.getElementById("Cart").style.width = "240px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeCart() { // Close cart
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
                    console.log(userData)
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

function saveUserData() {
    var fname = document.getElementById('user_fname').value;
    var email = document.getElementById('user_email').value;
    var phoneNo = document.getElementById('user_phoneNo').value;
    var user_address = document.getElementById('user_address').value;
    var postcode = document.getElementById('user_postcode').value;
    var state = document.getElementById('user_state').value;        
    var city = document.getElementById('user_city').value;

    var fnameErr = false;
    var phoneNoErr = false;
    var addressErr = false;
    var postcodeErr = false;
    var cityErr = false; 
    var encodedEmail = email.replaceAll('.', ',');

    // First name validation
    if (fname === "") {
        printError("fnameErr", "Please enter your first name");
        fnameErr = true;
    } else {
        var regex = /^[a-zA-Z\s]+$/;
        if (!regex.test(fname)) {
            printError("fnameErr", "Please enter a valid name");
            fnameErr = true;
        } else {
            printError("fnameErr", "");
        }
    }

    // Phone number validation
    if (phoneNo === "") {
        printError("phoneNoErr", "Please enter your phone number");
        phoneNoErr = true;
    } else {
        var regex = /^\d{11,}$/;
        if (!regex.test(phoneNo)) {
            printError("phoneNoErr", "Please enter a valid phone number");
            phoneNoErr = true;
        } else {
            printError("phoneNoErr", "");
        }
    }

    // Address validation
    if (user_address === "") {
        printError("addressErr", "Please enter your address");
        addressErr = true;
    } else {
        var regex = /^[a-zA-Z\d\s\.\-\,\'\;\/\_\&\#\*\(\)\:]+$/;
        if (!regex.test(user_address)) {
            printError("addressErr", "Please enter a valid address");
            addressErr = true;
        } else {
            printError("addressErr", "");
        }
    }

    // Postcode validation
    if (postcode === ""){
        printError("postcodeErr", "Please enter your postcode");
        postcodeErr = true;
    } else {
        var regex = /^\d{5,5}$/; //min length:5, only number
        if (!regex.test(postcode)) {
            printError("postcodeErr", "Please enter a valid postcode");
            postcodeErr = true;
        } else {
            printError("postcodeErr", "");
        }
    }

    // City validation
    if (city === ""){
        printError("cityErr", "Please enter your city");
        citycodeErr = true;
    } else {
        var regex = /^[a-zA-Z\s]+$/; //contain A-Z, a-z
        if (!regex.test(city)) {
            printError("cityErr", "Please enter a valid city");
            citycodeErr = true;
        } else {
            printError("cityErr", "");
        }
    }
    if (!(fnameErr || phoneNoErr || addressErr || postcodeErr || cityErr)) {
        var usersRef = firebase.database().ref('users');
        usersRef.child(encodedEmail)
            .update(
                {
                    firstName: fname,
                    address: user_address,
                    phoneNumber: phoneNo,
                    postcode: postcode,
                    state: state,
                    city: city
                },
                function (error) {
                    if (error) {
                        alert('Failed to save user data. Please try again.');
                    } else {
                        alert('User data saved successfully.');
                    }
                }
            );
    }
}

function hideLoginIcon() {
    var emailLogin = window.localStorage.getItem('login');

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
            document.getElementById('user_email').value = userData.email || '';
            document.getElementById('user_phoneNo').value = userData.phoneNumber || '';
            document.getElementById('user_address').value = userData.address || '';
            document.getElementById('user_postcode').value = userData.postcode || '';
            document.getElementById('user_city').value = userData.city || '';
            document.getElementById('user_state').value = userData.state || '';
        })
        .catch((error) => {
            // Error occurred while fetching user data
            console.error(error);
        });
    displayCart();
};

// Add event listener to listen for key press events
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        saveUserData();
    }
});
