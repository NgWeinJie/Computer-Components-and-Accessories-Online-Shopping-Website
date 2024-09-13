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

window.onload = function runf() {
    hideLoginIcon();
    retrieveData();
};

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

function closeItem(code) {
    var modal = document.getElementById(code + "_modal_1");
    modal.style.display = "none";
}

function retrieveData() {
    var productTableBody = document.getElementById("product-table-body");
    var productsRef = firebase.database().ref("products");

    productsRef.on("value", function (snapshot) {
    productTableBody.innerHTML = ""; // Clear previous data

    var sortedProducts = [];
    snapshot.forEach(function (childSnapshot) {
        var product = childSnapshot.val();
        var code = childSnapshot.key;

        // Check if the code starts with "l"
        if (code.startsWith("l")) {
            sortedProducts.push({
                code: code,
                product: product
            });
        }
    });

    // Sort products based on the code
    sortedProducts.sort(function (a, b) {
        var codeA = a.code;
        var codeB = b.code;
        return codeA.localeCompare(codeB, undefined, { numeric: true, sensitivity: 'base' });
    });

    sortedProducts.forEach(function (sortedProduct) {
        var code = sortedProduct.code;
        var product = sortedProduct.product;

        var bluebg = document.createElement("div");
        bluebg.classList.add("blue_bg");

        var row = document.createElement("tr");
        row.style.verticalAlign = "middle";
        row.style.width = "100%";

        var imageCell = document.createElement("td");
        imageCell.style.textAlign = "right";
        imageCell.style.verticalAlign = "middle";
        imageCell.style.width = "50%";
        
        var infoCell = document.createElement("td");
        infoCell.style.textAlign = "left";
        infoCell.style.verticalAlign = "middle";
        infoCell.style.width = "50%";

                var imageSpan = document.createElement("span");

                var image = document.createElement("img");
                image.id = code + "_image_1";
                image.src = product.image;
                image.alt = code + "_a1.png";
                image.classList.add("laptopImg1");

                imageSpan.appendChild(image);
                imageCell.appendChild(document.createElement("br"));
                imageCell.appendChild(document.createElement("br"));
                imageCell.appendChild(imageSpan);
                imageCell.appendChild(document.createElement("br"));
                imageCell.appendChild(document.createElement("br"));
                imageCell.appendChild(document.createElement("br"));

                //infoCell
                //code
                var codeLabel = document.createElement("label");
                codeLabel.classList.add("a1");
                codeLabel.textContent = "Code: ";
                var codeSpan = document.createElement("span");
                codeSpan.id = code + "_code_1";
                codeSpan.textContent = code;
                codeLabel.appendChild(codeSpan);

                //name
                var nameLabel = document.createElement("label");
                nameLabel.classList.add("a2");
                nameLabel.textContent = "Name: ";
                var nameSpan = document.createElement("span");
                nameSpan.id = code + "_name_1";
                nameSpan.textContent = product.name;
                nameLabel.appendChild(nameSpan);

                //price
                var priceLabel = document.createElement("label");
                priceLabel.classList.add("a3");
                priceLabel.textContent = "Price: ";
                var priceSpan = document.createElement("span");
                priceSpan.id = code + "_price_1";
                priceSpan.textContent = product.price;
                priceLabel.appendChild(priceSpan);

                //description
                var descriptionLabel = document.createElement("label");
                descriptionLabel.classList.add("a4");
                descriptionLabel.textContent = "Description: ";
                var descriptionSpan = document.createElement("span");
                descriptionSpan.id = code + "_description_1";
                descriptionSpan.textContent = product.description;
                descriptionSpan.classList.add("description");
                descriptionSpan.style.display = "block";
                descriptionLabel.appendChild(descriptionSpan);

                //button
                var modButton = document.createElement("button");
                modButton.textContent = "Modify";
                modButton.classList.add("modify-button2");
                modButton.setAttribute("onclick", "modifyItem('" + code + "')");

                var delButton = document.createElement("button");
                delButton.textContent = "Delete";
                delButton.classList.add("delete-button2");
                delButton.setAttribute("onclick", "deleteItem('" + code + "')");

                //blank row
                var blank = document.createElement("div");
                var blankp = document.createElement("p");
                blankp.classList.add("blank");
                blankp.textContent = ".";
                blank.appendChild(blankp);

                infoCell.appendChild(codeLabel);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(nameLabel);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(priceLabel);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(descriptionLabel);
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(modButton);
                infoCell.appendChild(delButton);
                infoCell.appendChild(blank);

                var buttonsDiv = document.createElement("div");
                buttonsDiv.classList.add("buttons-div");

                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(buttonsDiv);

                row.appendChild(imageCell);
                row.appendChild(infoCell);

                productTableBody.appendChild(bluebg);
                productTableBody.appendChild(document.createElement("br"));
                bluebg.appendChild(row);
        });
    });
}

function modifyItem(code) {
    // Store the product code in localStorage for use on the "ADMIN - Edit Product.html" page
    localStorage.setItem("productCode", code);
  
    // Redirect the user to the "ADMIN - Edit Product.html" page
    window.location.href = "ADMIN - Edit Product.html";
  }

function deleteItem(code) {
    var productsRef = firebase.database().ref("products");
    var confirmation = confirm("Are you sure you want to delete this product?");

    if(confirmation){
        productsRef.child(code).remove()
      .then(function() {
        alert("Product deleted successfully");
      })
      .catch(function(error) {
        console.error("Error deleting product: ", error);
      });
    }
  }

function scrollToTop(){
    window.scrollTo(0, 0);
}