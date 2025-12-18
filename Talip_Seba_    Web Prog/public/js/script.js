const cart = []; 

function addToCart(productName, price) {
 
  const existingProduct = cart.find(item => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity += 1; 
  } else {
    cart.push({ name: productName, price, quantity: 1 }); 
  }

  updateCartUI(); 
}

function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = ''; 
  if (cart.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.textContent = 'Sepetiniz boş.';
    cartItems.appendChild(emptyMessage);
  } else {
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ₺${item.price} x${item.quantity}`;
      cartItems.appendChild(li);
    });
  }
}

function toggleCart() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal.style.display === 'block') {
    cartModal.style.display = 'none';
  } else {
    updateCartUI();
    cartModal.style.display = 'block';
  }
}

function checkout() {
  alert('Alışveriş tamamlandı!');
  clearCart();
}

function clearCart() {
  cart.length = 0;
  updateCartUI();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const productName = button.getAttribute('data-product');
      const productPrice = parseFloat(button.getAttribute('data-price')); // Parse price as a number
      addToCart(productName, productPrice);
    });
  });

  document.getElementById('cart-btn').addEventListener('click', toggleCart);

  document.querySelector('.close-cart').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
  });
});
