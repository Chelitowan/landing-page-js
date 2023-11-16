

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
    const cartContainer = document.getElementById('cart');

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
                <button class="remove-from-cart" data-product-id="${product.id}">Quitar</button>
            `;
            productContainer.appendChild(productItem);

            // Agregar event listener para el botón "Agregar"
            const addToCartButton = productItem.querySelector('.add-to-cart');
            addToCartButton.addEventListener('click', () => {
                const productId = parseInt(addToCartButton.dataset.productId);
                addToCart(productId);
            });

            // Agregar event listener para el botón "Quitar"
            const removeFromCartButton = productItem.querySelector('.remove-from-cart');
            removeFromCartButton.addEventListener('click', () => {
                const productId = parseInt(removeFromCartButton.dataset.productId);
                removeFromCart(productId);
            });
        });
    }

    function addToCart(productId) {
        const selectedProduct = products.find(product => product.id === productId);
        cart.push(selectedProduct);
        updateCartUI();
    }

    function removeFromCart(productId) {
        const index = cart.findIndex(product => product.id === productId);
        if (index !== -1) {
            cart.splice(index, 1);
            updateCartUI();
        }
    }

    function updateCartUI() {
        cartContainer.innerHTML = '';

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            cart.forEach(product => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <span class="cart-item-name">${product.name}</span>
                    <span class="cart-item-price">$${product.price}</span>
                    <button class="remove-from-cart" data-product-id="${product.id}">Quitar</button>
                `;
                cartContainer.appendChild(cartItem);

                // Agregar event listener para el botón "Quitar" en el carrito
                const removeFromCartButton = cartItem.querySelector('.remove-from-cart');
                removeFromCartButton.addEventListener('click', () => {
                    const productId = parseInt(removeFromCartButton.dataset.productId);
                    removeFromCart(productId);
                });
            });
        }
    }

    // Inicializar la lista de productos al cargar la página
    renderProducts('all');
});
