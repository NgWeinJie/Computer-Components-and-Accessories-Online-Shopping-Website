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

function validation (){
    var image = document.getElementById('product_image').value; //declare variable
    var code = document.getElementById('product_code').value;
    var name = document.getElementById('product_name').value;
    var description = document.getElementById('product_description').value;
    var price = document.getElementById('product_price').value;
    
    //construct value form inputbox into json
    var product = {'product_image':image,'product_code':code,'product_name':name,'product_description':description,'product_price':price} 
    
    var dataOfproduct = product

    var imageErr = codeErr = nameErr = descriptionErr = priceErr = true; // define error variables with a default value
    //true means gt error and show error message

    //image
    if(image == ""){
        printError("imageErr", "Please upload an image");
    }else{
        var regex = /[\w-]+\.(jpg|png|jfif|jpeg|gif|bmp|webp)/;              
        if(regex.test(image) === false){
            printError("imageErr", "Please choose a valid image");
        }else{
            printError("imageErr", "");
            imageErr = false;
        }
    }

    //code
    if(code == ""){
        printError("codeErr", "Please enter product code");
    }else{
        var regex = /^([A-Za-z\d])+$/;                
        if(regex.test(code) === false){
            printError("codeErr", "Please enter a valid code");
        }else{
            printError("codeErr", "");
            codeErr = false;
        }
    }

    //name
    if(name == ""){
        printError("nameErr", "Please enter product name");
    }else{
        var regex = /^[a-zA-Z\d\s\.\-\,\'\;\/\_\&\#\*\(\)\:]+$/;
        if(regex.test(name) === false){
            printError("nameErr", "Please enter a valid name");
        }else{
            printError("nameErr", "");
            nameErr = false;
        }
    }

    //description
    if(description == ""){
        printError("descriptionErr", "Please enter product description");
    }else{
        var regex = /^[a-zA-Z\d\s\.\-\,\'\;\/\_\&\#\*\(\)\:]+$/;
        if(regex.test(description) === false){
            printError("descriptionErr", "Please enter a valid description");
        }else{
            printError("descriptionErr", "");
            descriptionErr = false;
        }
    }
    
    //price
    if(price == ""){
        printError("priceErr", "Please enter product price");
    }else{
        var regex =/\d{1,6}(?:[.,]\d{3})*(?:[.,]\d{2})/;           
        if(regex.test(price) === false){
            printError("priceErr", "Please enter a valid price");
        }else{
            printError("priceErr", "");
            priceErr = false;
        }
    }

    console.log(imageErr, codeErr , nameErr , descriptionErr , priceErr)
    if((imageErr || codeErr || nameErr || descriptionErr || priceErr == true)){ // prevent the form submitted if thr are any errors
        return false;
    }else{
        console.log(dataOfproduct)
    }
}

function printError(elementId, hintMsg) { //function validation() will call this function
    document.getElementById(elementId).innerHTML = hintMsg;
}

// Initialize Firebase Storage
var storage = firebase.storage();

function openNav(){ //open navigation bar
    document.getElementById("SideNav").style.width = "240px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav(){ //close navigation bar
    document.getElementById("SideNav").style.width = "0px"; 
    document.body.style.backgroundColor = "#E0E2E4";
}

window.onload = function () {
    var emailLogin = window.localStorage.getItem('login')

    if (emailLogin) {
        document.getElementById('loginimg').style.display = "none";
    } else {
        document.getElementById('logout').style.display = "none";
    }

    var productCode = localStorage.getItem("productCode");

    if (productCode) {
        firebase
            .database()
            .ref("products/" + productCode)
            .once("value")
            .then(function (snapshot) {
                var productDetails = snapshot.val();

                if (productDetails) {
                    document.getElementById("product_category").value = productDetails.catagory;
                    document.getElementById("product_code").value = productCode;
                    document.getElementById("product_name").value = productDetails.name;
                    document.getElementById("product_description").value = productDetails.description;
                    document.getElementById("product_price").value = productDetails.price;
                } else {
                    console.log("Product details not found");
                }
            })
            .catch(function (error) {
                console.error("Error retrieving product details: ", error);
            });
    }

    document.getElementById("edit").addEventListener("click", function () {
        var productCategory = document.getElementById("product_category").value;
        var productCode = document.getElementById("product_code").value;
        var productName = document.getElementById("product_name").value;
        var productDescription = document.getElementById("product_description").value;
        var productPrice = document.getElementById("product_price").value;
        var productImage = document.getElementById("product_image").files[0]; // Get the selected image file

        var updates = {};
        updates["products/" + productCode + "/catagory"] = productCategory;
        updates["products/" + productCode + "/name"] = productName;
        updates["products/" + productCode + "/description"] = productDescription;
        updates["products/" + productCode + "/price"] = productPrice;

        // Upload the image to Firebase Storage
        if (productImage) {
            var storageRef = firebase.storage().ref("product_images/" + productCode + "_" + productCode + ".png");
            var uploadTask = storageRef.put(productImage);

            uploadTask.on(
                "state_changed",
                function (snapshot) {
                    // Upload progress monitoring
                },
                function (error) {
                    console.error("Error uploading image: ", error);
                },
                function () {
                    // Image uploaded successfully
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        // Update the product image URL in the database
                        updates["products/" + productCode + "/image"] = downloadURL;

                        // Update the product details in the database
                        firebase
                            .database()
                            .ref()
                            .update(updates)
                            .then(function () {
                                alert("Product updated successfully");
                            })
                            .catch(function (error) {
                                console.error("Error updating product: ", error);
                            });
                    });
                }
            );
        } else {
            // Update the product details in the database without updating the image
            firebase
                .database()
                .ref()
                .update(updates)
                .then(function () {
                    alert("Product updated successfully");
                })
                .catch(function (error) {
                    console.error("Error updating product: ", error);
                });
        }
    });
};

