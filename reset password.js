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
    checkEmail();
}

function hideLoginIcon(){
    var emailLogin = window.localStorage.getItem('login')

    if (emailLogin) {
        document.getElementById('loginimg').style.display = 'none';
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

// Handle the reset password button click event
function resetPassword() {
    var email = document.getElementById("user_email").value;

    firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function () {
            alert("Password reset email sent. Please check your inbox.");
            window.location.href = "Login.html?email=" + encodeURIComponent(email);
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Password reset failed. Error: " + errorMessage);
        });
}

function checkEmail() {
    // Check if email parameter is present in the URL
    var urlParams = new URLSearchParams(window.location.search);
    var email = urlParams.get("email");

    if (email) {
        document.getElementById("user_email").value = decodeURIComponent(email);
    }
};

// Event listener for Enter key press
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        resetPassword();
    }
});