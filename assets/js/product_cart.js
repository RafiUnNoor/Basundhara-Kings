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
});

function showProductGallery(product) {
	//Iterate javascript shopping cart array
	var productHTML = "";
	product.forEach(function(item) {
		productHTML += '<div class="product-item col-md-6 col-xl-4">' +
    '<img src="' + item.photo + '">' +
    '<div class="product_name">' + item.productName + '</div>' +
    '<div class="price"><span>' + item.price + '</span>/=</div>' +
    '<div class="cart-action">' +
    '<input type="text" class="product-quantity" name="quantity" value="1" size="2" />' +
    '<input type="submit" value="Add to Cart" class="add-to-cart" onClick="addToCart(this)" />' +
    '</div>' +
    '</div>';
	"<tr>";
		
	});
	$('#product-item-container').html(productHTML);
}


function addToCart(element) {
	var productParent = $(element).closest('div.product-item');

	var price = $(productParent).find('.price span').text();
	var productName = $(productParent).find('.product_name').text();
	var quantity = $(productParent).find('.product-quantity').val();

	var cartItem = {
		productName: productName,
		price: price,
		quantity: quantity
	};
	var cartItemJSON = JSON.stringify(cartItem);

	var cartArray = new Array();
	// If javascript shopping cart session is not empty
	if (sessionStorage.getItem('shopping-cart')) {
		cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));
	}
	cartArray.push(cartItemJSON);

	var cartJSON = JSON.stringify(cartArray);
	sessionStorage.setItem('shopping-cart', cartJSON);
	showCartTable();
}

function emptyCart() {
	if (sessionStorage.getItem('shopping-cart')) {
		// Clear JavaScript sessionStorage by index
		sessionStorage.removeItem('shopping-cart');
		showCartTable();
	}
}

function showCartTable() {
	var cartRowHTML = "";
	var itemCount = 0;
	var grandTotal = 0;

	var price = 0;
	var quantity = 0;
	var subTotal = 0;

	if (sessionStorage.getItem('shopping-cart')) {
		var shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
		itemCount = shoppingCart.length;

		//Iterate javascript shopping cart array
		shoppingCart.forEach(function(item) {
			var cartItem = JSON.parse(item);
			price = parseFloat(cartItem.price);
			quantity = parseInt(cartItem.quantity);
			subTotal = price * quantity

			cartRowHTML += "<tr>" +
				"<td>" + cartItem.productName + "</td>" +
				"<td class='text-right'>$" + price.toFixed(2) + "</td>" +
				"<td class='text-right'>" + quantity + "</td>" +
				"<td class='text-right'>$" + subTotal.toFixed(2) + "</td>" +
				"</tr>";

			grandTotal += subTotal;
		});
	}

	$('#cartTableBody').html(cartRowHTML);
	$('#itemCount').text(itemCount);
	$('#totalAmount').text("$" + grandTotal.toFixed(2));
}


document.addEventListener('DOMContentLoaded', function() {
	const openCartBtn = document.getElementById('openCartBtn');
	const closeCartBtn = document.getElementById('closeCartBtn');
	const cartModal = document.getElementById('shopping-cart');
  
	openCartBtn.addEventListener('click', function() {
	  cartModal.classList.add('open');
	  // Add event listener to close modal if clicked outside
	  document.addEventListener('click', closeCartOutside);
	});
  
	closeCartBtn.addEventListener('click', function() {
	  cartModal.classList.remove('open');
	  document.removeEventListener('click', closeCartOutside);
	});
  
	function closeCartOutside(event) {
	  if (!cartModal.contains(event.target) && event.target !== openCartBtn) {
		cartModal.classList.remove('open');
		document.removeEventListener('click', closeCartOutside);
	  }
	}
  });