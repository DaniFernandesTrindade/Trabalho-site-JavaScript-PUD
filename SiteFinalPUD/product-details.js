// Variáveis e funções para o carrinho
const getCart = () => JSON.parse(localStorage.getItem("cart")) || {};
const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

function renderCartCounter() {
    const cart = getCart();
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const cartCounter = document.getElementById("cartCounter");
    cartCounter.textContent = totalItems;
    cartCounter.style.display = totalItems > 0 ? 'block' : 'none';
}

// Lógica da página de descrição
let currentQuantity = 1;
const quantityDisplay = document.getElementById("quantityDisplay");

function updateQuantity(change) {
    currentQuantity += change;
    if (currentQuantity < 1) {
        currentQuantity = 1;
    }
    quantityDisplay.textContent = currentQuantity;
}

function addToCart(productId) {
    const productName = document.getElementById("productTitle").textContent;
    const productPrice = parseFloat(document.getElementById("itemPrice").textContent);
    const productImg = document.getElementById("productImage").src;
    
    const cart = getCart();
    
    if (cart[productId]) {
        cart[productId].quantity += currentQuantity;
    } else {
        cart[productId] = {
            name: productName,
            price: productPrice,
            quantity: currentQuantity,
            image: productImg
        };
    }
    
    saveCart(cart);
    renderCartCounter();
    
    alert(`Adicionado ${currentQuantity}x de "${productName}" ao carrinho!`);
    
    // Reseta a quantidade para 1 após adicionar ao carrinho
    currentQuantity = 1;
    quantityDisplay.textContent = currentQuantity;
}

// Funções de Menu e Tema
const mobileSidebar = document.querySelector('.mobile-sidebar');
const menuToggle = document.querySelector('.menu-toggle');
const closeBtn = document.querySelector('.close-btn');

menuToggle.addEventListener('click', () => {
    mobileSidebar.classList.add('is-open');
});

closeBtn.addEventListener('click', () => {
    mobileSidebar.classList.remove('is-open');
});

document.addEventListener('click', (e) => {
    if (!mobileSidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileSidebar.classList.remove('is-open');
    }
});

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    document.getElementById('themeToggleText').textContent = isDarkMode ? 'Modo Claro' : 'Modo Escuro';
}

// Inicialização
window.addEventListener('load', renderCartCounter);
