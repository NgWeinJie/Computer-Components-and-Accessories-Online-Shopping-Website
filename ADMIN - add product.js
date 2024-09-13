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

window.onload = function bothf(){
    hideLoginIcon();
}

function hideLoginIcon(){
    var emailLogin = window.localStorage.getItem('login')

    if (emailLogin){
        document.getElementById('loginimg').style.display = "none";
    }else{
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

function openNav(){ //open navigation bar
    document.getElementById("SideNav").style.width = "240px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav(){ //close navigation bar
    document.getElementById("SideNav").style.width = "0px"; 
    document.body.style.backgroundColor = "#E0E2E4";
}

function addProduct(event) {
    event.preventDefault(); // Prevent the form from submitting and page refreshing

    // Retrieve product details from the form
    var productCategory = document.getElementById("product_catagory").value;
    var productImageFile = document.getElementById("product_image").files[0]; // Get the selected file
    var productCode = document.getElementById("product_code").value;
    var productName = document.getElementById("product_name").value;
    var productDescription = document.getElementById("product_description").value;
    var productPrice = document.getElementById("product_price").value;

    // Reference to the Firebase Storage bucket
    var storageRef = firebase.storage().ref();

    // Generate a unique filename for the image
    var imageFilename = productCode + "_" + productImageFile.name;

    // Upload the image file to Firebase Storage
    var imageRef = storageRef.child("product_images/" + imageFilename);
    imageRef
        .put(productImageFile)
        .then(function (snapshot) {
            // Get the image download URL
            return snapshot.ref.getDownloadURL();
        })
        .then(function (imageURL) {
            // Store product details in the Firebase Realtime Database

            // Generate the product key with sorting
            var productKey = productCategory.charAt(0).toLowerCase() + (parseInt(productCode.substring(1)) || 1);

            var productsRef = firebase.database().ref("products");
            productsRef
                .child(productKey)
                .set({
                    catagory: productCategory,
                    image: imageURL,
                    name: productName,
                    description: productDescription,
                    price: productPrice,
                })
                .then(function () {
                    // Clear the form fields
                    document.getElementById("product_catagory").value = "";
                    document.getElementById("product_image").value = "";
                    document.getElementById("product_code").value = "";
                    document.getElementById("product_name").value = "";
                    document.getElementById("product_description").value = "";
                    document.getElementById("product_price").value = "";

                    alert("Product added successfully!");
                })
                .catch(function (error) {
                    // Handle any errors
                    console.log(error);
                    alert("Error adding product!");
                });
        })
        .catch(function (error) {
            // Handle any errors
            console.log(error);
            alert("Error uploading image!");
        });
}


document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addProduct();
    }
});