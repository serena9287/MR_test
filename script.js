var modal = document.getElementById("cart-group");

  $('#my-cart').click(function(){
      modal.style.display = "block";
  })
  $('.close').click(function(){
    modal.style.display = "none";
  })

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

//Select size
$('.btn--size').on("click", function(){
  var size = $(this).data('size');
  $('.size-selected').html(size);
})

// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
  // =============================
  // Private methods and properties
  // =============================
  cart = [];
  
  // Constructor
  function Item(name, price, count, size) { 
    this.name = name;
    this.price = price;
    this.count = count;
    this.size = size; 
  }
  
  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  

  // =============================
  // Public methods and properties
  // =============================
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(name, price, count, size) { 
    for(var item in cart) {
      if(cart[item].size === size) { //
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count, size); 
    cart.push(item);
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];
      }
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('#add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $('.item-title').data('name'); 
  var price = Number($('.item-price').data('price'));
  var size =  $('.size-selected').html(); 
  if($('.size-selected').html() == ""){
    alert('Please select you size');
  } 
  else
  {
    shoppingCart.addItemToCart(name, price, 1, size);
  } 
  displayCart();
});

function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for(var i in cartArray) { 
      output += `
        <div class="cart-item">
            <img class="cart-img" src="https://mrdevelopertestassets.s3.ap-southeast-2.amazonaws.com/classic-tee.jpg">
            <div class="cart-text">
                <p class="cart-title">${cartArray[i].name}</p>
                <p class="cart-price"><span class="quantity">${cartArray[i].count}</span> x $${cartArray[i].price}</p>
                <p class="cart-size">Size: ${cartArray[i].size}</p> 
            </div>
        </div>  
  ` 
  }

  console.log(cartArray); // del
  console.log(output); // del
  $('.items-group').html(output);
  $('.total-count').html(shoppingCart.totalCount());  
}


displayCart();
