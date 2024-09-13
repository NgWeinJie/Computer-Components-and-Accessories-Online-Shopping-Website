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


function validation() {
    var name = document.getElementById('admin_name').value;
    var phoneNo = document.getElementById('admin_phoneNo').value;
    var email = document.getElementById('admin_email').value;
    var password = document.getElementById('admin_password').value;

    //construct value form inputbox into json
    var acc = { 'admin_name': name, 'admin_phoneNo': phoneNo, 'admin_email': email, 'admin-password': password } 

    var dataOfacc = acc

    var nameErr = phoneNoErr = emailErr = passwordErr = true; // define error variables with a default value
    //true means gt error and show error message

    // Validate name
    if (name === "") {
        printError("nameErr", "Please enter your name");
    } else {
        var regex = /^[a-zA-Z\s]+$/; // Contains A-Z, a-z
        if (regex.test(name) === false) {
            printError("nameErr", "Please enter a valid name");
        } else {
            printError("nameErr", "");
            nameErr = false;
        }
    }

    // Validate phone number
    if (phoneNo === "") {
        printError("phoneNoErr", "Please enter your phone number");
    } else {
        var regex = /^\d{10,}$/; // Minimum length: 10, only digits
        if (regex.test(phoneNo) === false) {
            printError("phoneNoErr", "Please enter a valid phone number");
        } else {
            printError("phoneNoErr", "");
            phoneNoErr = false;
        }
    }

    // Validate password
    if (password === "") {
        printError("passwordErr", "Please enter your password");
    } else {
        var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;  // Minimum length: 6, contains A-Z, a-z, number
        if (regex.test(password) === false) {
            printError("passwordErr", "Please enter a valid password with a minimum length of 6");
        } else {
            printError("passwordErr", "");
            passwordErr = false;
        }
    }

    // Validate email
    if (email === "") {
        printError("emailErr", "Please enter your email address");
    } else {
        var regex = /^\S+@\S+\.\S+$/; // Must contain @ and .
        if (regex.test(email) === false) {
            printError("emailErr", "Please enter a valid email address");
        } else {
            printError("emailErr", "");
            emailErr = false;
        }
    }

    console.log(nameErr, phoneNoErr, emailErr, passwordErr)
    if ((nameErr || phoneNoErr || emailErr || passwordErr == true)) { // prevent the form submitted if thr are any errors
        return false;
    } else {
        console.log(dataOfacc);
        registerAdmin();
    }
}

function printError(elementId, hintMsg) {
    document.getElementById(elementId).innerHTML = hintMsg;
}

// Handle user login
function loginAdmin() {
    const email = document.getElementById('admin_email').value;
    const password = document.getElementById('admin_password').value;

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const admin = userCredential.admin;

            // Check if the user's email is verified
            if (admin.emailVerified) {
                // Admin is logged in and email is verified
                // Redirect to the desired page
                window.location.href = 'ADMIN - Home.html';
            } else {
                // User's email is not verified
                alert('Please verify your email before logging in.');
            }
        })
        .catch((error) => {
            alert('Failed to log in: ' + error.message);
        });
}

function registerAdmin() {
    const name = document.getElementById('admin_name').value;
    const phoneNumber = document.getElementById('admin_phoneNo').value;
    const email = document.getElementById('admin_email').value; // Use the 'email' variable here
    const password = document.getElementById('admin_password').value;

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User registration successful
            const user = userCredential.user;
            const adminId = user.uid;

            // Send verification email
            user.sendEmailVerification()
                .then(() => {
                    // Show success message
                    alert('Registration successful! Please check your email to verify your account.');

                    // Store the email in localStorage
                    localStorage.setItem('registeredEmail', email);

                    // Redirect to the login page
                    window.location.href = 'Login.html';
                })
                .catch((error) => {
                    // Failed to send verification email
                    alert('Failed to send verification email: ' + error.message);
                });

            // Replace the period character in the email with a comma (",")
            const emailKey = email.replaceAll(".", ",");

            // Store the additional user data in Firebase Realtime Database under the 'admin' folder
            firebase.database().ref('admin/' + emailKey)
                .set({
                    name: name,
                    phoneNumber: phoneNumber,
                    email: email,
                    userType: 'admin'
                })
                .catch((error) => {
                    alert('Failed to register user: ' + error.message);
                });
        })
        .catch((error) => {
            alert('Failed to register user: ' + error.message);
        });

    localStorage.setItem('userType', 'admin');
}


function printError(elementId, hintMsg) { //function validation() will call this function
    document.getElementById(elementId).innerHTML = hintMsg;
}

window.onload = function hideLoginIcon(){
    var emailLogin = window.localStorage.getItem('login')

    if (emailLogin){
        document.getElementById('loginimg').style.display = "none";
    }else{
        document.getElementById('logout').style.display = "none";
    }
}

function reloadPage(){
    var emailLogin = window.localStorage.getItem('login')
    
    if(emailLogin){
        window.localStorage.removeItem('login');
    }
    
    window.location.replace("Login.html")
}

function openNav(){ //open navigation bar
    document.getElementById("SideNav").style.width = "240px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav(){ //close navigation bar
    document.getElementById("SideNav").style.width = "0px"; 
    document.body.style.backgroundColor = "#E0E2E4";
}

// Trigger register and redirect to login when Enter key is pressed
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        registerAdmin(); // Trigger registerAdmin function
    }
});