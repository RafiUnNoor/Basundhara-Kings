// Cart array to store items
var cart = [];

// Function to show product gallery
function showProductGallery(products) {
    var productHTML = "";
    products.forEach(function(item) {
        productHTML += '<div class="product-item col-md-6 col-xl-4">' +
            '<img src="' + item.photo + '" alt="' + item.productName + '">' +
            '<div class="card-title">' + item.productName + '</div>' +
            '<div class="card-text"><span>' + item.price + '</span>/=</div>' +
            '<div class="cart-action">' +
            '<input type="text" class="product-quantity" name="quantity" value="1" size="2" />' +
            '<a href="#" data-name="' + item.productName + '" data-price="' + item.price + '" class="add-to-cart btn btn-primary">Add to cart</a>' +
            '</div>' +
            '</div>';
    });
    $('#product-item-container').html(productHTML);

    // Bind click event to the "Add to cart" buttons
    $('.add-to-cart').click(function(event) {
        event.preventDefault(); // Prevent default link behavior

        // Retrieve product details from the data attributes
        var productName = $(this).data('name');
        var productPrice = $(this).data('price');
        var quantity = $(this).siblings('.product-quantity').val();

        // Add product to cart
        addToCart(productName, productPrice, quantity);

        // Show notification
        showNotification("Item added to cart");
    });
}

// Function to add items to cart
function addToCart(name, price, quantity) {
    var existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += parseInt(quantity);
    } else {
        cart.push({ name: name, price: price, quantity: parseInt(quantity) });
    }
    updateCartModal();
    updateCartTotal(); // Update the total after adding item
}

// Function to update cart modal
function updateCartModal() {
    var cartItemsHTML = "";
    var totalValue = 0; // Initialize total value
    var totalItems = 0; // Initialize total items count

    cart.forEach(function(item) {
        var itemValue = item.price * item.quantity; // Calculate the value of the current item
        totalValue += itemValue; // Add the item's value to the total value
        totalItems += item.quantity; // Sum up the total items

        cartItemsHTML += '<div class="cart-item">' +
            '<div class="cart-item-name">' + item.name + '</div>' +
            '<div class="cart-item-quantity">' +
            '<button class="btn btn-sm btn-secondary value-decrease" data-name="' + item.name + '" data-price="' + item.price + '">-</button>' +
            '<span class="cart-item-value">' + itemValue.toFixed(2) + '</span>' + // Display the item value
            '<button class="btn btn-sm btn-secondary value-increase" data-name="' + item.name + '" data-price="' + item.price + '">+</button>' +
            '<button class="btn btn-sm btn-danger delete-item" data-name="' + item.name + '">Delete</button>' + // Add Delete button
            '</div>' +
            '<div class="cart-item-price">' + item.price + ' x ' + item.quantity + '</div>' +
            '</div>';
    });

    $('#cart-items').html(cartItemsHTML);
    $('#cart-total-value').text(totalValue.toFixed(2)); // Display the total value
    $('#cart-count').text(totalItems); // Update the cart count

    // Bind click events for value adjustment
    $('.value-decrease').click(function() {
        var productName = $(this).data('name');
        var itemPrice = $(this).data('price');
        adjustItemValue(productName, -itemPrice); // Decrease the item value by the item price
    });

    $('.value-increase').click(function() {
        var productName = $(this).data('name');
        var itemPrice = $(this).data('price');
        adjustItemValue(productName, itemPrice); // Increase the item value by the item price
    });

    // Bind click event for deleting item
    $('.delete-item').click(function() {
        var productName = $(this).data('name');
        deleteCartItem(productName); // Delete the item from the cart
    });

    // Bind click event for clearing the cart
    $('#clear-cart-button').click(function() {
        clearCart(); // Clear all items in the cart
    });
}

// Function to adjust the value of an item
function adjustItemValue(productName, amount) {
    cart.forEach(function(item) {
        if (item.name === productName) {
            item.quantity += amount / item.price; // Adjust the quantity based on the amount
            if (item.quantity < 1) item.quantity = 1; // Ensure quantity does not go below 1
        }
    });

    updateCartModal(); // Re-render the modal with updated values
}

// Function to delete an item from the cart
function deleteCartItem(productName) {
    cart = cart.filter(function(item) {
        return item.name !== productName;
    });

    updateCartModal(); // Re-render the modal with updated values
}

// Function to clear the entire cart
function clearCart() {
    cart = []; // Empty the cart array
    updateCartModal(); // Re-render the modal with updated values
    $('#cart-count').text(0); // Update the cart count to 0
}

// Function to update cart total price
function updateCartTotal() {
    var total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    $('#cart-total-price').text(total.toFixed(2));
}

// Function to show notification
function showNotification(message) {
    var notification = $('#notification');
    notification.text(message).fadeIn(400).delay(2000).fadeOut(400);
}

// Function to open cart modal
function openCartModal() {
    $('#cartModalOverlay').fadeIn();
    $('#cartModal').fadeIn();
}

// Function to close cart modal
function closeCartModal() {
    $('#cartModalOverlay').fadeOut();
    $('#cartModal').fadeOut();
}


function updateCartButton() {
    // Logic to update the cart button (e.g., update cart item count, total value, etc.)
    // You can update elements such as #cart-count or similar
}

// Event listeners for modal behavior
$(document).ready(function() {
	var productItem = [{
	productName: "Men's Home Kit",
	price: "900.00",
	photo: "./assets/img/shop/home.jpg" 
  },
  {
	productName: "AFC Men's Home Kit",
	price: "1000.00",
	photo: "assets/img/shop/home_2.jpg"
  },
  {
	productName: "Men's Away Kit",
	price: "800.00",
	photo: "assets/img/shop/away.jpg"
  },
  {
	productName: "February Special Home Kit ",
	price: "1000.00",
	photo: "assets/img/shop/special.jpg"
  },
  {
	productName: "February Special Away Kit",
	price: "1000.00",
	photo: "assets/img/shop/special_2.jpg"
  },
  {
	productName: "Men's Goalkeeper Kit",
	price: "700.00",
	photo: "assets/img/shop/gk.jpg"
  },
  {
	productName: "Men's Practice Kit",
	price: "600.00",
	photo: "assets/img/shop/practice.jpg"
  },
  ];

    showProductGallery(productItem);

    // Open cart modal on button click
    $('#openCartModal').click(openCartModal);

    // Close cart modal on button click
    $('#closeCartModal').click(closeCartModal);

    // Close cart modal when clicking outside the modal
    $('#cartModalOverlay').click(closeCartModal);
});
