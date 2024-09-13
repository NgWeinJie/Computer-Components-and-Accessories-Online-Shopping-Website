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

function printError(elementId, hintMsg) { //function validation() will call this function
    document.getElementById(elementId).innerHTML = hintMsg;
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

function fetchUserData() {
    return new Promise((resolve, reject) => {
        var emailLogin = window.localStorage.getItem('login');
        emailLogin = decryptData(emailLogin,encryptionKey);

        if (emailLogin) {
            var encodedEmail = encodeURIComponent(emailLogin);
            var usersRef = firebase.database().ref('admin');
            usersRef
                .child(emailLogin.replaceAll('.', ','))
                .once('value')
                .then((snapshot) => {
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

function saveUserData() {
    var adname = document.getElementById('admin_name').value;
    var ademail = document.getElementById('admin_email').value;
    var adphnum = document.getElementById('admin_phoneNo').value;

    var nameErr = false;
    var phoneNoErr = false;
    var encodedEmail = ademail.replaceAll('.', ',');

    //name validation
    if (adname === "") {
        printError("nameErr", "Please enter your first name");
        nameErr = true;
    } else {
        var regex = /^[a-zA-Z\s]+$/;
        if (!regex.test(adname)) {
            printError("nameErr", "Please enter a valid name");
            nameErr = true;
        } else {
            printError("nameErr", "");
        }
    }

    // Phone number validation
    if (adphnum === "") {
        printError("phoneNoErr", "Please enter your phone number");
        phoneNoErr = true;
    } else {
        var regex = /^\d{11,}$/;
        if (!regex.test(adphnum)) {
            printError("phoneNoErr", "Please enter a valid phone number");
            phoneNoErr = true;
        } else {
            printError("phoneNoErr", "");
        }
    }
    if (!(nameErr || phoneNoErr)) {
        var usersRef = firebase.database().ref('admin');
        usersRef.child(encodedEmail)
            .update(
                {
                    name: adname,
                    email: ademail,
                    phoneNumber: adphnum,
                },
                function (error) {
                    if (error) {
                        alert('Failed to save admin data. Please try again.');
                    } else {
                        alert('Admin data saved successfully.');
                    }
                }
            );
        }
}

// Call fetchUserData() when the page loads
window.onload = function () {
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
            document.getElementById('admin_name').value = userData.name || '';
            document.getElementById('admin_phoneNo').value = userData.phoneNumber || '';
            document.getElementById('admin_email').value = userData.email || '';
        })
        .catch((error) => {
            // Error occurred while fetching user data
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