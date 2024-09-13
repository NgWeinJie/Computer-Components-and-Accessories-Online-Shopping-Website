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

window.onload = function bothf() {
    slideshow();
    hideLoginIcon();
    displayCart();
}

let slideIndex = 0;
let timeoutId = null;
const slides = document.getElementsByClassName("mySlides");
const dots = document.getElementsByClassName("dot");

function currentSlide(index) {
    slideIndex = index;
    slideshow();
}

function plusSlides(step) {
    if(step < 0) {
        slideIndex -= 2;
            
        if(slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
    }
    slideshow();
} 

function slideshow() {
    function showSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            dots[i].classList.remove("active");
        }

        slideIndex++;

        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("active");

        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        timeoutId = setTimeout(showSlides, 5000); // Change image every 5 seconds
    }
    showSlides();
}

function showUserFirstName() {
    var emailLogin = window.localStorage.getItem('login');
    emailLogin = decryptData(emailLogin,encryptionKey);

    if (emailLogin) {
        // Replace dot with comma in the email
        var userPath = "users/" + emailLogin.replaceAll('.', ',');
        var userRef = firebase.database().ref(userPath);

        userRef.on("value", function (snapshot) {
            var userData = snapshot.val();
            if (userData && userData.firstName) {
                var firstName = userData.firstName;
                document.getElementById("showFirstName").innerHTML = "Hi, " + firstName;
            }
        });
    }
}

function hideLoginIcon(){
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

function openCart(){ //open cart
    document.getElementById("Cart").style.width = "240px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeCart(){ //close cart
    document.getElementById("Cart").style.width = "0px"; 
    document.body.style.backgroundColor = "#E0E2E4";
}

function scrollToTop(){
    window.scrollTo(0, 0);
}