// Main page functionality
let cart = [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeDefaultData();
    loadMenu();
    loadCart();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('payNowBtn').addEventListener('click', showQRCode);
    document.getElementById('printBillBtn').addEventListener('click', printBill);
    document.getElementById('clearCartBtn').addEventListener('click', clearCart);
    document.getElementById('closeModal').addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('qrModal');
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Load menu items
function loadMenu() {
    const menuItems = getMenuItems();
    const menuGrid = document.getElementById('menuGrid');
    
    if (menuItems.length === 0) {
        menuGrid.innerHTML = '<p style="text-align: center; color: #999;">No menu items available. Please add items in Manage Menu.</p>';
        return;
    }
    
    menuGrid.innerHTML = menuItems.map(item => `
        <div class="menu-item" onclick="addToCart(${item.id})">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/150?text=${encodeURIComponent(item.name)}'">
            <h3>${item.name}</h3>
            <div class="price">₹${item.price}</div>
        </div>
    `).join('');
}

// Add item to cart
function addToCart(itemId) {
    const menuItems = getMenuItems();
    const item = menuItems.find(i => i.id === itemId);
    
    if (!item) return;
    
    const existingItem = cart.find(c => c.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartDisplay();
}

// Update item quantity
function updateQuantity(itemId, change) {
    const item = cart.find(c => c.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        saveCart();
        updateCartDisplay();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const billSummary = document.getElementById('billSummary');
    const payNowBtn = document.getElementById('payNowBtn');
    const printBillBtn = document.getElementById('printBillBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        billSummary.style.display = 'none';
        payNowBtn.disabled = true;
        printBillBtn.disabled = true;
        clearCartBtn.disabled = true;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="cart-item-price">₹${item.price * item.quantity}</div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total').textContent = `₹${total}`;
    
    billSummary.style.display = 'block';
    payNowBtn.disabled = false;
    printBillBtn.disabled = false;
    clearCartBtn.disabled = false;
}

// Calculate total
function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Show QR Code
function showQRCode() {
    const total = calculateTotal();
    const paymentQR = getPaymentQR();
    const qrAmount = total;
    
    // Create payment link with amount
    const paymentLink = paymentQR + qrAmount;
    
    document.getElementById('qrAmount').textContent = `₹${qrAmount}`;
    
    // Clear previous QR code
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';
    
    // Create canvas for QR code
    const canvas = document.createElement('canvas');
    qrContainer.appendChild(canvas);
    
    // Generate QR code
    QRCode.toCanvas(canvas, paymentLink, {
        width: 200,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        }
    }, function (error) {
        if (error) {
            console.error('QR Code generation error:', error);
            qrContainer.innerHTML = '<p style="color: red;">Error generating QR code. Please try again.</p>';
        }
    });
    
    document.getElementById('qrModal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('qrModal').style.display = 'none';
}

// Print Bill as PDF
function printBill() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const total = calculateTotal();
    const date = new Date().toLocaleString('en-IN');
    
    // Header
    doc.setFontSize(20);
    doc.text('Restaurant Bill', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 20, 35);
    doc.text(`Bill No: ${Date.now()}`, 20, 42);
    
    // Items
    let yPos = 60;
    doc.setFontSize(14);
    doc.text('Items', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(11);
    cart.forEach(item => {
        const itemText = `${item.name} x ${item.quantity}`;
        const price = `₹${item.price * item.quantity}`;
        doc.text(itemText, 20, yPos);
        doc.text(price, 180, yPos, { align: 'right' });
        yPos += 8;
        
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
    });
    
    // Total
    yPos += 10;
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Total:', 20, yPos);
    doc.text(`₹${total}`, 180, yPos, { align: 'right' });
    
    // Footer
    yPos += 20;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Thank you for your visit!', 105, yPos, { align: 'center' });
    
    // Save order
    saveOrderToHistory(total);
    
    // Download PDF
    doc.save(`bill_${Date.now()}.pdf`);
    
    // Clear cart after printing
    clearCart();
}

// Save order to history
function saveOrderToHistory(total) {
    const order = {
        date: new Date().toISOString(),
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: total
    };
    
    saveOrder(order);
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartDisplay();
}

