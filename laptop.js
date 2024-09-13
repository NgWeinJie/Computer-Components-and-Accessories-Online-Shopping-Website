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
    hideLoginIcon();
    displayCart();
    retrieveData();
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
                image.alt = code + "_l1.png";
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
                codeLabel.classList.add("l1");
                codeLabel.textContent = "Code: ";
                var codeSpan = document.createElement("span");
                codeSpan.id = code + "_code_1";
                codeSpan.textContent = code;
                codeLabel.appendChild(codeSpan);

                //name
                var nameLabel = document.createElement("label");
                nameLabel.classList.add("l2");
                nameLabel.textContent = "Name: ";
                var nameSpan = document.createElement("span");
                nameSpan.id = code + "_name_1";
                nameSpan.textContent = product.name;
                nameLabel.appendChild(nameSpan);

                //price
                var priceLabel = document.createElement("label");
                priceLabel.classList.add("d3");
                priceLabel.textContent = "Price: ";
                var priceSpan = document.createElement("span");
                priceSpan.id = code + "_price_1";
                priceSpan.textContent = product.price;
                priceLabel.appendChild(priceSpan);

                //description
                var descriptionLabel = document.createElement("label");
                descriptionLabel.classList.add("l4");
                descriptionLabel.textContent = "Description: ";
                var descriptionSpan = document.createElement("span");
                descriptionSpan.id = code + "_description_1";
                descriptionSpan.textContent = product.description;
                descriptionSpan.classList.add("description");
                descriptionSpan.style.display = "block";
                descriptionLabel.appendChild(descriptionSpan);

                //quantity
                var qtyInput = document.createElement("div");
                qtyInput.classList.add("quantity-input");
                var qtyLabel = document.createElement("label");
                qtyLabel.setAttribute("for","quantity");
                qtyLabel.textContent = "Quantity:  ";
                qtyInput.appendChild(qtyLabel);

                var qtyM = document.createElement("button");
                qtyM.classList.add("minus-btn");
                qtyM.setAttribute("type", "button");
                qtyM.setAttribute("id", "minus");
                qtyM.setAttribute("onclick", "decrement('_" + code + "')"); 
                qtyM.textContent = "-";
                qtyInput.appendChild(qtyM);

                var qtyNum = document.createElement("input");
                qtyNum.id = "quantity_" + code; // Use a unique id for each quantity input field
                qtyNum.setAttribute("type", "number");
                qtyNum.setAttribute("id", "quantity_" + code);
                qtyNum.setAttribute("min", "1");
                qtyNum.setAttribute("value", "1");
                qtyNum.readOnly;
                qtyInput.appendChild(qtyNum);

                var qtyP = document.createElement("button");
                qtyP.classList.add("plus-btn");
                qtyP.setAttribute("type", "button");
                qtyP.setAttribute("id", "plus");
                qtyP.setAttribute("onclick", "increment('_" + code + "')");
                qtyP.textContent = "+";
                qtyInput.appendChild(qtyP);

                //button
                var addButton = document.createElement("button");
                addButton.textContent = "Add to Cart";
                addButton.classList.add("addToCart");
                addButton.setAttribute("onclick", "addToCart('" + code + "')");

                var buyButton = document.createElement("button");
                buyButton.textContent = "Buy Now";
                buyButton.classList.add("buy-now");
                buyButton.setAttribute("onclick", "buyNow('" + code + "')");

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

                infoCell.appendChild(qtyInput);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(blank);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(blank);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(blank);

                infoCell.appendChild(addButton);
                infoCell.appendChild(buyButton);
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

// Call the retrieveData function to start retrieving the data
/* retrieveData(); */

const cartItems = [];

function addToCart(code) {
    var emailLogin = window.localStorage.getItem('login');
    emailLogin = decryptData(emailLogin,encryptionKey);

    if (emailLogin) {
        // User is logged in
        // Replace dot with comma in the email
        var cartPath = "carts/" + emailLogin.replace('.', ',');
        var cartRef = firebase.database().ref(cartPath);

        var cartItem = {
            name: document.getElementById(code + "_name_1").textContent,
            quantity: parseInt(document.getElementById("quantity_" + code).value), // Use the unique id for quantity input
            price: document.getElementById(code + "_price_1").textContent
        };

        cartRef.push().set(cartItem)
            .then(function () {
                alert("Item added to cart!");
                displayCart(); // Update the cart display
                document.getElementById("quantity_" + code).value = "1"; // Reset quantity to 1
            })
            .catch(function (error) {
                console.error("Error adding item to cart:", error);
            });
    } else {
        // User is not logged in
        var confirmed = confirm("You need to login or register first before add to cart. Click OK to proceed to login");
        if (confirmed) {
            window.location.href = "login.html";
        }
    }
}

function updateCart() {
    var cartContainer = document.getElementById("cart-items");

    // Clear the previous cart items
    while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild);
    }

    // Add the new cart items
    cartItems.forEach(function (item) {
        var cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        var itemName = document.createElement("span");
        itemName.classList.add("item-name");
        itemName.textContent = item.name;

        var itemQuantity = document.createElement("span");
        itemQuantity.classList.add("item-quantity");
        itemQuantity.textContent = "Quantity: " + item.quantity;

        var itemPrice = document.createElement("span");
        itemPrice.classList.add("item-price");
        itemPrice.textContent = "Price: " + item.price;

        cartItem.appendChild(itemName);
        cartItem.appendChild(document.createElement("br")); // Add a line break between elements
        cartItem.appendChild(itemQuantity);
        cartItem.appendChild(document.createElement("br")); // Add a line break between elements
        cartItem.appendChild(itemPrice);

        cartContainer.appendChild(cartItem);
    });
}

function buyNow(code){
    addToCart(code);
    window.location.href = "Payment.html"
}

function scrollToTop(){
    window.scrollTo(0, 0);
}

function increment(code) {
    var qtyInput = document.getElementById("quantity" + code);
    qtyInput.stepUp();
}

function decrement(code) {
    var qtyInput = document.getElementById("quantity" + code);
    qtyInput.stepDown();
}