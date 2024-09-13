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

window.onload = function bothf() {
    hideLoginIcon();
}

function validation(){
    var fname = document.getElementById('user_fname').value;
    var lname = document.getElementById('user_lname').value;
    var email = document.getElementById('user_email').value;
    var password = document.getElementById('user_password').value;
    var address = document.getElementById('user_address').value;
    var phoneNo = document.getElementById('user_phoneNo').value;
    var postcode = document.getElementById('user_postcode').value;
    var city= document.getElementById('user_city').value;
    
    //construct value form inputbox into json
    var acc = {'user_fname':fname, 'user_lname':lname, 'user_email':email, 'user_password':password, 'user_address':address, 'user_phoneNo':phoneNo, 'user_postcode':postcode, 'user_city':city} 
    
    var dataOfacc = acc
    
    var fnameErr = lnameErr = emailErr = passwordErr = addressErr = phoneNoErr = postcodeErr = cityErr = true; // define error variables with a default value
    //true means gt error and show error message

    //first name
    if(fname === ""){
        printError("fnameErr", "Please enter your first name");
    }else{
        var regex = /^[a-zA-Z\s]+$/; //contain A-Z, a-z                
        if(regex.test(fname) === false){
            printError("fnameErr", "Please enter a valid name");
        }else{
            printError("fnameErr", "");
            fnameErr = false;
        }
    }

    //last name
    if(lname === ""){
        printError("lnameErr", "Please enter your last name");
    }else{
        var regex = /^[a-zA-Z\s]+$/; //contain A-Z, a-z                
        if(regex.test(lname) === false){
            printError("lnameErr", "Please enter a valid name");
        }else{
            printError("lnameErr", "");
            lnameErr = false;
        }
    }

    //email
    if(email === ""){
        printError("emailErr", "Please enter your email address");
    }else{
        var regex = /^\S+@\S+\.\S+$/; //must contain @ and .
        if(regex.test(email) === false){
            printError("emailErr", "Please enter a valid email address");
        }else{
            printError("emailErr", "");
            emailErr = false;
        }
    }

    //password
    if(password === ""){
        printError("passwordErr", "Please enter your password");
    }else{
        var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;  //min length:6, contain A-Z, a-z, number              
        if(regex.test(password) === false){
            printError("passwordErr", "Please enter a valid password");
        }else{
            printError("passwordErr", "");
            passwordErr = false;
        }
    }

    //address
    if(address === ""){
        printError("addressErr", "Please enter your address");
    }else{
        var regex = /^[a-zA-Z\d\s\.\-\,\'\;\/\_\&\#\*\(\)\:]+$/;
        if(regex.test(address) === false){
            printError("addressErr", "Please enter a valid address");
        }else{
            printError("addressErr", "");
            addressErr = false;
        }
    }
    
    //phone number
    if(phoneNo === ""){
        printError("phoneNoErr", "Please enter your phone number");
    }else{
        var regex = /^\d{11,}$/; //min length:11, only number
        if(regex.test(phoneNo) === false){
            printError("phoneNoErr", "Please enter a valid phone number");
        }else{
            printError("phoneNoErr", "");
            phoneNoErr = false;
        }
    }

    //postcode
    if(postcode === ""){
        printError("postcodeErr", "Please enter your postcode");
    }else{
        var regex = /^\d{5,5}$/; //min length:5, only number
        if(regex.test(postcode) === false){
            printError("postcodeErr", "Please enter a valid postcode");
        }else{
            printError("postcodeErr", "");
            postcodeErr = false;
        }
    }

    //city
    if(city === ""){
        printError("cityErr", "Please enter your city");
    }else{
        var regex = /^[a-zA-Z\s]+$/; //contain A-Z, a-z                
        if(regex.test(city) === false){
            printError("cityErr", "Please enter a valid city");
        }else{
            printError("cityErr", "");
            cityErr = false;
        }
    }

    console.log(fnameErr, lnameErr, emailErr, passwordErr, addressErr, phoneNoErr, postcodeErr , cityErr)
    if((fnameErr || lnameErr || emailErr || passwordErr || addressErr || phoneNoErr || postcodeErr || cityErr == true)){ // prevent the form submitted if thr are any errors
        return false;
    }else{
        console.log(dataOfacc)
        registerUser();
    }
}

function printError(elementId, hintMsg) { //function validation() will call this function
    document.getElementById(elementId).innerHTML = hintMsg;
}

function hideLoginIcon(){
    var emailLogin = window.localStorage.getItem('login')

    if (emailLogin) {
        imgicon = document.getElementById('loginimg').style.display = 'none';
    }else{
        document.getElementById('accdimg').style.display = "none";
        document.getElementById('cartimg').style.display = "none";
        document.getElementById('openbtn').style.display = "none";
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

function openCart(){ //open cart
    document.getElementById("Cart").style.width = "240px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeCart(){ //close cart
    document.getElementById("Cart").style.width = "0px"; 
    document.body.style.backgroundColor = "#E0E2E4";
}

// Handle user login
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
                // User is logged in and email is verified
                // Redirect to the desired page
                window.location.href = 'Home.html';
            } else {
                // User's email is not verified
                alert('Please verify your email before logging in.');
            }
        })
        .catch((error) => {
            alert('Failed to log in: ' + error.message);
        });
}

function registerUser() {
    const firstName = document.getElementById('user_fname').value;
    const lastName = document.getElementById('user_lname').value;
    const email = document.getElementById('user_email').value;
    const password = document.getElementById('user_password').value;
    const address = document.getElementById('user_address').value;
    const phoneNumber = document.getElementById('user_phoneNo').value;
    const postcode = document.getElementById('user_postcode').value;
    const city = document.getElementById('user_city').value;
    const state = document.getElementById('user_state').value;

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User registration successful
            const user = userCredential.user;

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

            // Store the additional user data in Firebase Realtime Database
            firebase.database().ref('users/' + email.replaceAll('.', ',')).set({
                firstName: firstName,
                lastName: lastName,
                email: email,
                address: address,
                phoneNumber: phoneNumber,
                postcode: postcode,
                city: city,
                state: state,
            })
                .catch((error) => {
                    alert('Failed to register user: ' + error.message);
                });
        })
        .catch((error) => {
            alert('Failed to register user: ' + error.message);
        });
    localStorage.setItem('userType', 'user');
}


// Trigger register and redirect to login when Enter key is pressed
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        registerUser();
    }
});
