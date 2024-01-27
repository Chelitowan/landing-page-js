document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Remeras', price: 6800 },
        { id: 2, name: 'Tazas', price: 2400 },
        { id: 3, name: 'Camperas', price: 14600 },
        { id: 4, name: 'Palanquera', price: 1800 },
        { id: 5, name: 'Carcasas celular', price: 2800 },
        { id: 6, name: 'Rompecabezas', price: 1600 },
    ];

    const cart = [];

    const productContainer = document.getElementById('product-list');
    const cartContainer = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');

    function renderProducts(category) {
        productContainer.innerHTML = '';

        const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);

        filteredProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product');
            productItem.innerHTML = `
                <span class="product-name">${product.name}</span>
                <span class="product-price">$${product.price}</span>
                <button class="add-to-cart" data-product-id="${product.id}">Agregar</button>
            `;
            productContainer.appendChild(productItem);

            const addToCartButton = productItem.querySelector('.add-to-cart');
            addToCartButton.addEventListener('click', () => {
                const productId = parseInt(addToCartButton.dataset.productId);
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        const selectedProductIndex = cart.findIndex(product => product.id === productId);
        if (selectedProductIndex !== -1) {
            cart[selectedProductIndex].quantity++;
        } else {
            const selectedProduct = products.find(product => product.id === productId);
            selectedProduct.quantity = 1;
            cart.push(selectedProduct);
        }
        updateCartUI();
    }

    function removeFromCart(productId) {
        const selectedProductIndex = cart.findIndex(product => product.id === productId);
        if (selectedProductIndex !== -1) {
            if (cart[selectedProductIndex].quantity > 1) {
                cart[selectedProductIndex].quantity--;
            } else {
                cart.splice(selectedProductIndex, 1);
            }
            updateCartUI();
        }
    }

    function updateCartUI() {
        cartContainer.innerHTML = '';
        let totalAmount = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>El carrito esta vacio.</p>';
        } else {
            cart.forEach(product => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <span class="cart-item-name">${product.name} (${product.quantity})</span>
                    <span class="cart-item-price">$${product.price * product.quantity}</span>
                    <button class="remove-from-cart" data-product-id="${product.id}">Quitar</button>
                `;
                cartContainer.appendChild(cartItem);

                const removeFromCartButton = cartItem.querySelector('.remove-from-cart');
                removeFromCartButton.addEventListener('click', () => {
                    const productId = parseInt(removeFromCartButton.dataset.productId);
                    removeFromCart(productId);
                });

                totalAmount += product.price * product.quantity;
            });
        }

        cartTotalAmount.textContent = totalAmount.toFixed(2);
    }

    renderProducts('all');

    
    const resetCartButton = document.getElementById('reset-cart');

    // Agregar un event listener al botón de reiniciar carrito
    resetCartButton.addEventListener('click', () => {
        // Reiniciar el arreglo del carrito
        cart.splice(0, cart.length);
        // Actualizar la interfaz del carrito
        updateCartUI();
        // Reiniciar el total del carrito
        updateCartTotal();
    });
});
