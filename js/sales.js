// Sales report functionality

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeDefaultData();
    setupFilters();
    loadSalesReport();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('monthSelect').addEventListener('change', loadSalesReport);
    document.getElementById('yearSelect').addEventListener('change', loadSalesReport);
}

// Setup filter dropdowns
function setupFilters() {
    const orders = getOrders();
    const months = new Set();
    const years = new Set();
    
    orders.forEach(order => {
        const date = new Date(order.date);
        months.add(date.getMonth());
        years.add(date.getFullYear());
    });
    
    // Populate month dropdown
    const monthSelect = document.getElementById('monthSelect');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    
    Array.from(months).sort().forEach(month => {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = monthNames[month];
        monthSelect.appendChild(option);
    });
    
    // Populate year dropdown
    const yearSelect = document.getElementById('yearSelect');
    Array.from(years).sort((a, b) => b - a).forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });
}

// Load sales report
function loadSalesReport() {
    const orders = getOrders();
    const monthSelect = document.getElementById('monthSelect').value;
    const yearSelect = document.getElementById('yearSelect').value;
    
    let filteredOrders = orders;
    
    if (monthSelect !== '' || yearSelect !== '') {
        filteredOrders = orders.filter(order => {
            const date = new Date(order.date);
            const monthMatch = monthSelect === '' || date.getMonth() === parseInt(monthSelect);
            const yearMatch = yearSelect === '' || date.getFullYear() === parseInt(yearSelect);
            return monthMatch && yearMatch;
        });
    }
    
    displaySalesReport(filteredOrders);
}

// Display sales report
function displaySalesReport(orders) {
    const tbody = document.getElementById('salesTableBody');
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="no-data">No sales data available for the selected period.</td></tr>';
        return;
    }
    
    // Sort by date (newest first)
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let totalSales = 0;
    
    tbody.innerHTML = orders.map(order => {
        const date = new Date(order.date);
        const formattedDate = date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const itemsList = order.items.map(item => 
            `${item.name} (${item.quantity}x)`
        ).join(', ');
        
        totalSales += order.total;
        
        return `
            <tr>
                <td>${formattedDate}</td>
                <td>${itemsList}</td>
                <td>₹${order.total.toFixed(2)}</td>
            </tr>
        `;
    }).join('') + `
        <tr class="total-row">
            <td colspan="2"><strong>Total Sales:</strong></td>
            <td><strong>₹${totalSales.toFixed(2)}</strong></td>
        </tr>
    `;
}

