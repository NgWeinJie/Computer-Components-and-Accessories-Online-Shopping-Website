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
    fetchAndDisplayUserData();
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

function fetchAndDisplayUserData() {
    var productTableBody = document.getElementById("order-table-body");

    firebase.database().ref("orders").orderByChild("referenceId").once("value", function (snapshot) {
        var orders = snapshot.val();


        if (orders) {
            // Convert the orders object into an array
            var ordersArray = Object.keys(orders).map(function (email) {
                return { email: email, order: orders[email] };
            });

            // Sort the orders array based on the status
            ordersArray.sort(function (a, b) {
                if (a.order.status === "pending" && b.order.status !== "pending") {
                    return -1; // a comes before b
                } else if (a.order.status !== "pending" && b.order.status === "pending") {
                    return 1; // a comes after b
                } else {
                    return 0; // no change in order
                }
            });

            ordersArray.forEach(function (orderData) {
                var email = orderData.email;
                var order = orderData.order;

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

                var order = orders[email];

                var imageSpan = document.createElement("span");

                var image = document.createElement("img");
                image.id = order.referenceId + "_image";
                image.src = order.paymentReceiptURL;
                image.alt = order.referenceId + "_receipt.png";
                image.classList.add("receiptimg");

                imageSpan.appendChild(image);
                imageCell.appendChild(document.createElement("br"));
                imageCell.appendChild(document.createElement("br"));

                imageCell.appendChild(imageSpan);
                imageCell.appendChild(document.createElement("br"));
                imageCell.appendChild(document.createElement("br"));
                imageCell.appendChild(document.createElement("br"));

                // infoCell
                // email
                var emailLabel = document.createElement("label");
                emailLabel.textContent = "Email: ";
                var emailSpan = document.createElement("span");
                emailSpan.id = order.referenceId + "_email";
                emailSpan.textContent = order.email;
                emailLabel.appendChild(emailSpan);

                // first name
                var firstNameLabel = document.createElement("label");
                firstNameLabel.textContent = "First Name: ";
                var firstNameSpan = document.createElement("span");
                firstNameSpan.id = order.referenceId + "_firstname";
                firstNameSpan.textContent = order.firstName;
                firstNameLabel.appendChild(firstNameSpan);

                // last name
                var lastNameLabel = document.createElement("label");
                lastNameLabel.textContent = "Last Name: ";
                var lastNameSpan = document.createElement("span");
                lastNameSpan.id = order.referenceId + "_lastname";
                lastNameSpan.textContent = order.lastName;
                lastNameLabel.appendChild(lastNameSpan);

                // phone number
                var phoneNumberLabel = document.createElement("label");
                phoneNumberLabel.textContent = "Phone Number: ";
                var phoneNumberSpan = document.createElement("span");
                phoneNumberSpan.id = order.referenceId + "_phonenumber";
                phoneNumberSpan.textContent = order.phoneNumber;
                phoneNumberLabel.appendChild(phoneNumberSpan);

                // address
                var addressLabel = document.createElement("label");
                addressLabel.textContent = "Address: ";
                var addressSpan = document.createElement("span");
                addressSpan.id = order.referenceId + "_address";
                addressSpan.textContent = order.fullAddress;
                addressLabel.appendChild(addressSpan);

                // payment option
                var paymentoptLabel = document.createElement("label");
                paymentoptLabel.textContent = "Payment Option: ";
                var paymentoptSpan = document.createElement("span");
                paymentoptSpan.id = order.referenceId + "_paymentopt";
                paymentoptSpan.textContent = order.paymentOption;
                paymentoptLabel.appendChild(paymentoptSpan);

                // delivery option
                var deliveryoptLabel = document.createElement("label");
                deliveryoptLabel.textContent = "Delivery Option: ";
                var deliveryoptSpan = document.createElement("span");
                deliveryoptSpan.id = order.referenceId + "_deliveryopt";
                deliveryoptSpan.textContent = order.deliveryOption;
                deliveryoptLabel.appendChild(deliveryoptSpan);

                // subtotal
                var subtotalLabel = document.createElement("label");
                subtotalLabel.textContent = "Subtotal: ";
                var subtotalSpan = document.createElement("span");
                subtotalSpan.id = order.referenceId + "_subtotal";
                subtotalSpan.textContent = order.subTotal;
                subtotalLabel.appendChild(subtotalSpan);

                // shipping fees
                var shippingfeesLabel = document.createElement("label");
                shippingfeesLabel.textContent = "Shipping Fees: ";
                var shippingfeesSpan = document.createElement("span");
                shippingfeesSpan.id = order.referenceId + "_shippingfees";
                shippingfeesSpan.textContent = order.shippingFees;
                shippingfeesLabel.appendChild(shippingfeesSpan);

                // order total
                var ordertotalLabel = document.createElement("label");
                ordertotalLabel.textContent = "Order Total: ";
                var ordertotalSpan = document.createElement("span");
                ordertotalSpan.id = order.referenceId + "_ordertotal";
                ordertotalSpan.textContent = order.orderTotal;
                ordertotalLabel.appendChild(ordertotalSpan);

                // reference id
                var referenceidLabel = document.createElement("label");
                referenceidLabel.textContent = "Reference Id: ";
                var referenceidSpan = document.createElement("span");
                referenceidSpan.id = order.referenceId + "_referenceid";
                referenceidSpan.textContent = order.referenceId;
                referenceidLabel.appendChild(referenceidSpan);

                // status
                var statusLabel = document.createElement("label");
                statusLabel.textContent = "Status: ";
                var statusSpan = document.createElement("span");
                statusSpan.id = order.referenceId + "_status";
                statusSpan.textContent = order.status;
                statusLabel.appendChild(statusSpan);

                // cart items
                var cartItemsTable = document.createElement("table");
                cartItemsTable.classList.add("cart-items-table");
                cartItemsTable.style.marginLeft = "0px";

                var cartItemsTableHeader = document.createElement("thead");
                var cartItemsHeaderRow = document.createElement("tr");

                var itemNameHeader = document.createElement("th");
                itemNameHeader.textContent = "Item Name";
                itemNameHeader.style.paddingRight = "200px";
                itemNameHeader.style.border = "1px solid black";

                var itemPriceHeader = document.createElement("th");
                itemPriceHeader.textContent = "Item Price";
                itemPriceHeader.style.paddingRight = "40px";
                itemPriceHeader.style.border = "1px solid black";

                var itemQuantityHeader = document.createElement("th");
                itemQuantityHeader.textContent = "Item Quantity";
                itemQuantityHeader.style.border = "1px solid black";


                cartItemsHeaderRow.appendChild(itemNameHeader);
                cartItemsHeaderRow.appendChild(itemPriceHeader);
                cartItemsHeaderRow.appendChild(itemQuantityHeader);
                cartItemsTableHeader.appendChild(cartItemsHeaderRow);
                cartItemsTable.appendChild(cartItemsTableHeader);

                var cartItemsTableBody = document.createElement("tbody");

                var cartItems = order.cartItems;
                if (cartItems) {
                    Object.keys(cartItems).forEach(function (itemKey) {
                        var cartItem = cartItems[itemKey];

                        var cartItemRow = document.createElement("tr");

                        var itemNameCell = document.createElement("td");
                        itemNameCell.textContent = cartItem.name;
                        itemNameCell.style.border = "1px solid black";

                        var itemPriceCell = document.createElement("td");
                        itemPriceCell.textContent = cartItem.price;
                        itemPriceCell.style.border = "1px solid black";

                        var itemQuantityCell = document.createElement("td");
                        itemQuantityCell.textContent = cartItem.quantity;
                        itemQuantityCell.style.border = "1px solid black";

                        cartItemRow.appendChild(itemNameCell);
                        cartItemRow.appendChild(itemPriceCell);
                        cartItemRow.appendChild(itemQuantityCell);
                        cartItemsTableBody.appendChild(cartItemRow);
                    });
                }

                // cart items table style
                cartItemsTable.style.borderCollapse = "collapse";
                cartItemsTable.style.width = "90%";

                // cart items table header style
                cartItemsTableHeader.style.backgroundColor = "#4785ce";

                // cart items table header row style
                cartItemsHeaderRow.style.fontWeight = "bold";

                // cart items table header cell style
                itemNameHeader.style.padding = "10px";
                itemPriceHeader.style.padding = "10px";
                itemQuantityHeader.style.padding = "10px";

                // cart items table body style
                cartItemsTableBody.style.borderTop = "1px solid lightgray";

                // cart item row style
                var cartItemRows = cartItemsTableBody.getElementsByTagName("tr");
                for (var i = 0; i < cartItemRows.length; i++) {
                    cartItemRows[i].style.backgroundColor = i % 2 === 0 ? "white" : "lightgrey";
                }

                // cart item cell style
                var cartItemCells = cartItemsTableBody.getElementsByTagName("td");
                for (var j = 0; j < cartItemCells.length; j++) {
                    cartItemCells[j].style.padding = "10px";
                }

                cartItemsTable.appendChild(cartItemsTableBody);

                // approve btn
                var approveButton = document.createElement("button");
                approveButton.textContent = "Approve";
                approveButton.classList.add("approve");
                approveButton.setAttribute("onclick", "approve('" + order.referenceId + "')");

                var rejectButton = document.createElement("button");
                rejectButton.textContent = "Reject";
                rejectButton.classList.add("reject");
                rejectButton.setAttribute("onclick", "reject('" + order.referenceId + "')");



                // blank row
                var blank = document.createElement("div");
                var blankp = document.createElement("p");
                blankp.classList.add("blank");
                blankp.textContent = ".";
                blank.appendChild(blankp);

                infoCell.appendChild(emailLabel);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(firstNameLabel);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(lastNameLabel);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(phoneNumberLabel);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(addressLabel);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(paymentoptLabel);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(deliveryoptLabel);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(subtotalLabel);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(shippingfeesLabel);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(ordertotalLabel);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(referenceidLabel);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(statusLabel);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(cartItemsTable);
                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(document.createElement("br"));

                infoCell.appendChild(approveButton);
                infoCell.appendChild(rejectButton);
                infoCell.appendChild(blank);

                var buttonsDiv = document.createElement("div");
                buttonsDiv.classList.add("buttons-div");

                infoCell.appendChild(document.createElement("br"));
                infoCell.appendChild(buttonsDiv);

                row.appendChild(imageCell);
                row.appendChild(infoCell);
                productTableBody.appendChild(row);

                productTableBody.appendChild(bluebg);
                productTableBody.appendChild(document.createElement("br"));
                bluebg.appendChild(row);
            });
        }
    });
}

function approve(referenceId) {
    var orderRef = firebase.database().ref("orders/" + referenceId);
    orderRef
        .child("status")
        .set("approve")
        .then(function () {
            // Status updated successfully
            console.log("Order status updated to 'approve'");

            alert("Approved successful"); // Display the alert message
        })
        .catch(function (error) {
            // An error occurred while updating the status
            console.error("Error updating order status:", error);
        });
}

function reject(referenceId) {
    var orderRef = firebase.database().ref("orders/" + referenceId);
    orderRef
        .child("status")
        .set("reject")
        .then(function () {
            // Status updated successfully
            console.log("Order status updated to 'reject'");

            // Perform additional actions after rejecting the order, if needed

            alert("Order rejected successfully"); // Display an alert message
        })
        .catch(function (error) {
            // An error occurred while updating the status
            console.error("Error updating order status:", error);
        });
}

function scrollToTop(){
    window.scrollTo(0, 0);
}

