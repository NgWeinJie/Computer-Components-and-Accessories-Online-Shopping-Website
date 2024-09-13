function encryptData(data, key) {
    var encryptedData = CryptoJS.AES.encrypt(data, key).toString();
    return encryptedData;
}

function decryptData(encryptedData, key) {
    var decryptedData = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

var encryptionKey = "mtech123";

// Function to display the cart items
function displayCart() {
    var emailLogin = window.localStorage.getItem('login');
    emailLogin = decryptData(emailLogin,encryptionKey);

    var cartContainer = document.getElementById("cart-items");

    if (emailLogin) {
        // User is logged in
        // Replace dot with comma in the email
        var cartPath = "carts/" + emailLogin.replaceAll('.', ',');
        var cartRef = firebase.database().ref(cartPath);

        cartRef.on("value", function (snapshot) {
            // Clear the previous cart items
            cartContainer.innerHTML = "";

            snapshot.forEach(function (childSnapshot) {
                var cartItemId = childSnapshot.key;
                var cartItem = childSnapshot.val();

                var itemName = document.createElement("span");
                itemName.classList.add("item-name");
                itemName.textContent = cartItem.name;

                var itemQuantity = document.createElement("span");
                itemQuantity.classList.add("item-quantity");
                itemQuantity.textContent = "Quantity: " + cartItem.quantity;

                var itemPrice = document.createElement("span");
                itemPrice.classList.add("item-price");
                itemPrice.textContent = "Price (RM): " + cartItem.price;

                var modifyButton = document.createElement("button");
                modifyButton.textContent = "Modify";
                modifyButton.classList.add("modify-button");
                modifyButton.addEventListener("click", function () {
                    modifyCartItem(cartItemId);
                });

                var deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.classList.add("delete-button");
                deleteButton.addEventListener("click", function () {
                    deleteCartItem(cartItemId);
                });

                var cartItemElement = document.createElement("div");
                cartItemElement.classList.add("cart-item");
                cartItemElement.appendChild(itemName);
                cartItemElement.appendChild(document.createElement("br")); // Add a line break between elements
                cartItemElement.appendChild(itemQuantity);
                cartItemElement.appendChild(document.createElement("br")); // Add a line break between elements
                cartItemElement.appendChild(itemPrice);
                cartItemElement.appendChild(document.createElement("br"));
                cartItemElement.appendChild(modifyButton);
                cartItemElement.appendChild(deleteButton);
                cartItemElement.appendChild(document.createElement("br"));
                cartItemElement.appendChild(document.createElement("br"));

                cartContainer.appendChild(cartItemElement);
            });
        });
    } else {
        // User is not logged in
        // Clear the previous cart items
        cartContainer.innerHTML = "";

        cartItems.forEach(function (item, index) {
            var itemName = document.createElement("span");
            itemName.classList.add("item-name");
            itemName.textContent = item.name;

            var itemQuantity = document.createElement("span");
            itemQuantity.classList.add("item-quantity");
            itemQuantity.textContent = "Quantity: " + item.quantity;
            
            var itemPrice = document.createElement("span");
            itemPrice.classList.add("item-price");
            itemPrice.textContent = "Price: " + item.price;

            var modifyButton = document.createElement("button");
            modifyButton.textContent = "Modify";
            modifyButton.addEventListener("click", function () {
                modifyCartItem(index);
            });

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () {
                deleteCartItem(index);
            });

            var cartItemElement = document.createElement("div");
            cartItemElement.classList.add("cart-item");
            cartItemElement.appendChild(itemName);
            cartItemElement.appendChild(document.createElement("br")); // Add a line break between elements
            cartItemElement.appendChild(itemQuantity);
            cartItemElement.appendChild(document.createElement("br")); // Add a line break between elements
            cartItemElement.appendChild(itemPrice);
            cartItemElement.appendChild(document.createElement("br"));
            cartItemElement.appendChild(modifyButton);
            cartItemElement.appendChild(deleteButton);

            cartContainer.appendChild(cartItemElement);

            console.log(item)
        });
    }
}

function modifyCartItem(cartItemId) {
    var newQuantity = prompt("Enter the new quantity:");

    if (newQuantity !== null && !isNaN(newQuantity) && newQuantity > 0) {
        var emailLogin = window.localStorage.getItem('login');
        emailLogin = decryptData(emailLogin,encryptionKey);

        var cartPath = "carts/" + emailLogin.replaceAll('.', ',') + "/" + cartItemId;
        var cartRef = firebase.database().ref(cartPath);

        cartRef.update({
            quantity: parseInt(newQuantity)
        })
            .then(function () {
                alert("Cart item quantity updated!");
                displayCart(); // Update the cart display
            })
            .catch(function (error) {
                console.error("Error updating cart item quantity:", error);
            });
    } else {
        alert("Invalid quantity entered!");
    }
}

function deleteCartItem(cartItemId) {
    var emailLogin = window.localStorage.getItem('login');
    emailLogin = decryptData(emailLogin,encryptionKey);

    var cartPath = "carts/" + emailLogin.replaceAll('.', ',') + "/" + cartItemId;
    var cartRef = firebase.database().ref(cartPath);

    cartRef.remove()
        .then(function () {
            alert("Cart item deleted!");
            displayCart(); // Update the cart display
        })
        .catch(function (error) {
            console.error("Error deleting cart item:", error);
        });
}