async function populate() {

  const requestURL = 'https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product';
  const request = new Request(requestURL);

  const response = await fetch(request);
  const productInfo = await response.json();

  populateContent(productInfo);
  console.log(productInfo);
}

function populateContent(obj){
  const section = document.querySelector('section');
  const image = document.createElement('img');
  image.src = obj['imageURL'];
  image.classList.add('item-img');
  section.appendChild(image);

  const text = document.createElement('div');
  text.classList.add('item-text');
  section.appendChild(text);

  const title = document.createElement('h2'); //data-name
  title.textContent = obj['title'];
  title.classList.add('item-title');
  title.dataset.name = obj['title'] //data
  text.appendChild(title); 

  const price = document.createElement('p'); //data-price
  price.textContent = "$ " + obj['price']; 
  price.classList.add('item-price');
  price.dataset.price = obj['price'] //data
  text.appendChild(price); 

  const desc = document.createElement('p'); 
  desc.textContent = obj['description']; 
  desc.classList.add('item-desc');
  text.appendChild(desc); 


  const size = document.createElement('p'); 
  size.textContent = "Size: ";
  size.classList.add('item-size');

  const star = document.createElement('span');
  star.textContent = "*";
  star.classList.add('star');
  size.appendChild(star);

  const sizeSelected = document.createElement('span');
  sizeSelected.classList.add('size-selected');
  size.appendChild(sizeSelected);

  text.appendChild(size); 

  const sizeOptions = obj['sizeOptions'];

  const btnGroup = document.createElement('div');
  btnGroup.classList.add('btn-group');

  for (const size of sizeOptions){
      const btn = document.createElement('button');
      btn.innerHTML = size.label;
      btn.classList.add('btn');  //add id
      btn.classList.add('btn--size'); 
      btn.dataset.size = size.label; //data-size
      btnGroup.appendChild(btn);
  }
  text.appendChild(btnGroup);

  $('.btn--size').on("click", function(){
    var size = $(this).data('size');
    $('.size-selected').html(size);
  })
  //$(container).on("click", ".btn-size", () => { ... });

  /** 
  const addBtn = document.createElement('button');
  addBtn.innerHTML = "ADD TO CART";
  addBtn.classList.add('btn');
  addBtn.classList.add('btn--cart'); //id
  text.appendChild(addBtn);
  
  addBtn.onclick = function(event) {
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
  };
*/

}

populate();


if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
var modal = document.getElementById("cart-group");

  $('#my-cart').click(function(){
    if (shoppingCart.totalCount() > 0){
      modal.style.display = "block";
    } else {
      $('.items-group').html("<p class='nothing'>Nothing in the Cart</p>");
      modal.style.display = "block";
    }
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
//$('.btn--size').on("click", function(){
//  var size = $(this).data('size');
//  $('.size-selected').html(size);
//})

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

$('.btn--cart').click(function(event) {
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

  $('.items-group').html(output);
  $('.total-count').html(shoppingCart.totalCount());  
}


displayCart();
};

