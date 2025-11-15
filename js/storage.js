// localStorage utility functions

// Menu Items
function getMenuItems() {
    const items = localStorage.getItem('menuItems');
    return items ? JSON.parse(items) : [];
}

function saveMenuItems(items) {
    localStorage.setItem('menuItems', JSON.stringify(items));
}

// Orders
function getOrders() {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
}

function saveOrder(order) {
    const orders = getOrders();
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Payment QR
function getPaymentQR() {
    return localStorage.getItem('paymentQR') || 'upi://pay?pa=your-upi-id@paytm&pn=Restaurant&am=';
}

function setPaymentQR(link) {
    localStorage.setItem('paymentQR', link);
}

// Admin Password
function getAdminPassword() {
    return localStorage.getItem('adminPassword') || 'admin123';
}

function setAdminPassword(password) {
    localStorage.setItem('adminPassword', password);
}

function checkAdminPassword(password) {
    return password === getAdminPassword();
}

// Initialize default data if not exists
function initializeDefaultData() {
    if (getMenuItems().length === 0) {
        const defaultMenu = [
            { id: 1, name: 'Idly', price: 30, image: 'https://images.unsplash.com/photo-1588168333984-ff9c9b4a0ad6?w=400', category: 'Breakfast' },
            { id: 2, name: 'Dosa', price: 50, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', category: 'Breakfast' },
            { id: 3, name: 'Poori', price: 40, image: 'https://images.unsplash.com/photo-1631452180519-c014fe762bc9?w=400', category: 'Breakfast' },
            { id: 4, name: 'Vadai', price: 25, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', category: 'Breakfast' },
            { id: 5, name: 'Pongal', price: 45, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', category: 'Breakfast' },
            { id: 6, name: 'Upma', price: 35, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', category: 'Breakfast' },
            { id: 7, name: 'Poha', price: 30, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', category: 'Breakfast' },
            { id: 8, name: 'Vada', price: 35, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', category: 'Breakfast' },
            { id: 9, name: 'Uttapam', price: 55, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', category: 'Breakfast' },
            { id: 10, name: 'Appam', price: 60, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', category: 'Breakfast' }
        ];
        saveMenuItems(defaultMenu);
    }
    
    if (!localStorage.getItem('paymentQR')) {
        setPaymentQR('upi://pay?pa=restaurant@paytm&pn=Restaurant&am=');
    }
}

