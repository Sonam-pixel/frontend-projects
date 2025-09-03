const products = document.querySelectorAll('.product');
const cartItemsContainer = document.querySelector('.cart-items');
const subtotalEl = document.getElementById('subtotal');
const shippingEl = document.getElementById('shipping');
const discountEl = document.getElementById('discount');
const totalEl = document.getElementById('total');
const couponInput = document.getElementById('coupon-code');
const applyCouponBtn = document.getElementById('apply-coupon');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let discount = 0;

// Render Cart
function renderCart() {
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img src="https://via.placeholder.com/60" alt="${item.name}">
      <div class="item-details">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
        <div class="quantity">
          <button class="minus">-</button>
          <span class="qty">${item.qty}</span>
          <button class="plus">+</button>
        </div>
      </div>
      <p class="item-total">$${itemTotal}</p>
      <button class="remove-btn">❌</button>
    `;

    // Event listeners for buttons
    div.querySelector('.plus').addEventListener('click', () => {
      item.qty++;
      saveCart();
      renderCart();
    });

    div.querySelector('.minus').addEventListener('click', () => {
      if (item.qty > 1) {
        item.qty--;
        saveCart();
        renderCart();
      }
    });

    div.querySelector('.remove-btn').addEventListener('click', () => {
      cart = cart.filter(c => c.id !== item.id);
      saveCart();
      renderCart();
    });

    cartItemsContainer.appendChild(div);
  });

  // Update totals
  subtotalEl.innerText = `$${subtotal}`;
  const shipping = subtotal > 0 ? 5 : 0;
  shippingEl.innerText = `$${shipping}`;
  discountEl.innerText = `-$${discount}`;
  totalEl.innerText = `$${subtotal + shipping - discount}`;
}

// Save cart
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to cart
products.forEach(product => {
  product.querySelector('.add-to-cart').addEventListener('click', () => {
    const id = product.dataset.id;
    const price = parseFloat(product.dataset.price);
    const name = product.querySelector('h3').innerText;

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, name, price, qty: 1 });
    }

    saveCart();
    renderCart();
  });
});

// Apply coupon
applyCouponBtn.addEventListener('click', () => {
  const code = couponInput.value.trim();
  if (code === "SAVE10") {
    discount = 10;
    alert("Coupon applied: $10 off");
  } else {
    discount = 0;
    alert("Invalid coupon");
  }
  renderCart();
});

// Initial render
renderCart();
