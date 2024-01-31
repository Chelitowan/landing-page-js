document.addEventListener('DOMContentLoaded', () => {

    const cart = [];

    const productContainer = document.getElementById('products');
    const cartContainer = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');

    // Definir el array de productos
    const products = [
        { id: 1, name: 'Remera Negra', price: 7800 },
        { id: 2, name: 'Campera algodon', price: 19500 },
        { id: 3, name: 'Almohadon 30x30', price: 2800 },
        { id: 4, name: 'Taza Magica', price: 7000 },
        { id: 5, name: 'Rompecabezas Polimero', price: 3200 },
        { id: 6, name: 'Carcasas celular', price: 3800 }
    ];

    function renderProducts() {
        productContainer.innerHTML = '';

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-card');
            productItem.innerHTML = `
            <img src="./img/${product.name.replace(/ /g, '-').toLowerCase()}.jpg" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                    <button class="add-to-cart green-button">Agregar</button>
                </div>`;
            productContainer.appendChild(productItem);

            const addToCartButton = productItem.querySelector('.add-to-cart');
            addToCartButton.addEventListener('click', () => {
                const productId = product.id;
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        const selectedProduct = products.find(product => product.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...selectedProduct, quantity: 1 });
        }
        updateCartUI();
    }

    function removeFromCart(productId) {
        const cartItemIndex = cart.findIndex(item => item.id === productId);
        if (cartItemIndex !== -1) {
            const cartItem = cart[cartItemIndex];
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
            } else {
                cart.splice(cartItemIndex, 1);
            }
            updateCartUI();
        }
    }

    function updateCartUI() {
        cartContainer.innerHTML = '';
        let totalAmount = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span class="cart-item-name">${item.name} (${item.quantity})</span>
                <span class="cart-item-price">$${item.price * item.quantity}</span>
                <button class="remove-from-cart" data-product-id="${item.id}">Quitar</button>
            `;
            cartContainer.appendChild(cartItem);

            const removeFromCartButton = cartItem.querySelector('.remove-from-cart');
            removeFromCartButton.addEventListener('click', () => {
                const productId = parseInt(removeFromCartButton.dataset.productId);
                removeFromCart(productId);
            });

            totalAmount += item.price * item.quantity;
        });

        cartTotalAmount.textContent = totalAmount.toFixed(2);
    }

    renderProducts();

    const resetCartButton = document.getElementById('reset-cart');

    resetCartButton.addEventListener('click', () => {
        cart.length = 0;
        updateCartUI();
    });
});
