// Admin page functionality
let editingId = null;
let initialized = false;

// Initialize admin page (called after password verification)
function initializeAdminPage() {
    if (initialized) return;
    initialized = true;
    
    initializeDefaultData();
    loadMenuItems();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    const menuForm = document.getElementById('menuForm');
    if (menuForm) {
        menuForm.addEventListener('submit', handleFormSubmit);
    }
}

// Load menu items
function loadMenuItems() {
    const menuItems = getMenuItems();
    const menuList = document.getElementById('menuList');
    
    if (menuItems.length === 0) {
        menuList.innerHTML = '<div class="no-data">No menu items. Add your first item above.</div>';
        return;
    }
    
    menuList.innerHTML = menuItems.map(item => `
        <div class="menu-list-item">
            <div class="menu-list-item-info">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80?text=${encodeURIComponent(item.name)}'">
                <div class="menu-list-item-details">
                    <h3>${item.name}</h3>
                    <p>₹${item.price} | ${item.category}</p>
                </div>
            </div>
            <div class="menu-list-item-actions">
                <button class="btn btn-primary btn-small" onclick="editItem(${item.id})">Edit</button>
                <button class="btn btn-danger btn-small" onclick="deleteItem(${item.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Handle form submit
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('itemName').value.trim();
    const price = parseFloat(document.getElementById('itemPrice').value);
    const image = document.getElementById('itemImage').value.trim();
    const category = document.getElementById('itemCategory').value.trim();
    
    if (!name || price < 0 || !image || !category) {
        alert('Please fill all fields correctly.');
        return;
    }
    
    const menuItems = getMenuItems();
    
    if (editingId !== null) {
        // Update existing item
        const index = menuItems.findIndex(item => item.id === editingId);
        if (index !== -1) {
            menuItems[index] = {
                id: editingId,
                name,
                price,
                image,
                category
            };
            saveMenuItems(menuItems);
            cancelEdit();
        }
    } else {
        // Add new item
        const newId = menuItems.length > 0 ? Math.max(...menuItems.map(i => i.id)) + 1 : 1;
        menuItems.push({
            id: newId,
            name,
            price,
            image,
            category
        });
        saveMenuItems(menuItems);
        document.getElementById('menuForm').reset();
    }
    
    loadMenuItems();
}

// Edit item
function editItem(id) {
    const menuItems = getMenuItems();
    const item = menuItems.find(i => i.id === id);
    
    if (!item) return;
    
    editingId = id;
    document.getElementById('itemId').value = id;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemImage').value = item.image;
    document.getElementById('itemCategory').value = item.category;
    
    document.getElementById('formTitle').textContent = 'Edit Menu Item';
    document.getElementById('submitBtn').textContent = 'Update Item';
    document.getElementById('cancelBtn').style.display = 'block';
    
    // Scroll to form
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// Cancel edit
function cancelEdit() {
    editingId = null;
    document.getElementById('menuForm').reset();
    document.getElementById('itemId').value = '';
    document.getElementById('formTitle').textContent = 'Add New Menu Item';
    document.getElementById('submitBtn').textContent = 'Add Item';
    document.getElementById('cancelBtn').style.display = 'none';
}

// Delete item
function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }
    
    const menuItems = getMenuItems();
    const filteredItems = menuItems.filter(item => item.id !== id);
    saveMenuItems(filteredItems);
    loadMenuItems();
}

