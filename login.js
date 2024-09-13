// Initialize Firebase
// Firebase configuration
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
    loadEmail();
}

// Event listener for Enter key press
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && event.target.id === 'user_password') {
        event.preventDefault();
        loginUser();
    }
});

function hideLoginIcon() {
    var emailLogin = window.localStorage.getItem('login');

    if (emailLogin) {
        document.getElementById('loginimg').style.display = 'none';
    }else{
        document.getElementById('accdimg').style.display = "none";
        document.getElementById('cartimg').style.display = "none";
        document.getElementById('openbtn').style.display = "none";
    }
}

function reloadPage() {
    var emailLogin = window.localStorage.getItem('login');

    if (emailLogin) {
        window.localStorage.removeItem('login');
    }

    window.location.replace('Login.html');
}

function openNav() {
    document.getElementById('SideNav').style.width = '240px';
    document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
}

function closeNav() {
    document.getElementById('SideNav').style.width = '0px';
    document.body.style.backgroundColor = '#E0E2E4';
}

function openCart() {
    document.getElementById('Cart').style.width = '240px';
    document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
}

function closeCart() {
    document.getElementById('Cart').style.width = '0px';
    document.body.style.backgroundColor = '#E0E2E4';
}

// Login User
function loginUser() {
    const email = document.getElementById('user_email').value;
    const password = document.getElementById('user_password').value;

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Check if the user's email is verified
            if (user.emailVerified) {
                // Save the email in localStorage
                window.localStorage.setItem('login', email);

                const emailKey = email.replaceAll(".", ",");
                // Get the userType from the Realtime Database
                const databaseRef = firebase.database().ref('admin/' + emailKey);
                databaseRef.once('value', (snapshot) => {
                    const userData = snapshot.val();

                    if (userData && userData.userType === 'admin') {
                        var emailLogin = document.getElementById('user_email').value;

                        // Encrypt the data
                        var encryptedData = encryptData(emailLogin, encryptionKey);

                        // Save the encrypted data in localStorage
                        localStorage.setItem("login", encryptedData);
                        
                        // Redirect to admin home page
                        window.location.href = 'ADMIN - Home.html';
                    } else {
                        var emailLogin = document.getElementById('user_email').value;

                        // Encrypt the data
                        var encryptedData = encryptData(emailLogin, encryptionKey);

                        // Save the encrypted data in localStorage
                        localStorage.setItem("login", encryptedData);

                        // Redirect to admin home page
                        window.location.href = 'Home.html';
                    }
                });
            } else {
                // User's email is not verified
                alert('Please verify your email before logging in.');
            }
        })
        .catch((error) => {
            alert('Failed to log in: ' + error.message);
        });
}


function loadEmail() {
    // Check if a registered email exists in localStorage
    if (localStorage.getItem('registeredEmail')) {
        // Get the registered email
        const registeredEmail = localStorage.getItem('registeredEmail');

        // Fill the email field with the registered email
        var emailElement = document.getElementById('user_email');
        if (emailElement) {
            emailElement.value = registeredEmail;
        }

        // Remove the registered email from localStorage
        localStorage.removeItem('registeredEmail');
    }
}

// Retrieve the email parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const emailParam = urlParams.get('email');

// Check if the email parameter exists
if (emailParam) {
    // Set the value of the email input field to the email parameter
    var emailElement = document.getElementById('user_email');
    if (emailElement) {
        emailElement.value = decodeURIComponent(emailParam);
    }
}