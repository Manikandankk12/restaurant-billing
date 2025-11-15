# 🍽️ Restaurant Billing System

A modern, responsive web application for restaurant billing and menu management built with HTML, CSS, and JavaScript. Features include menu display, cart management, QR code payment, PDF bill generation, and sales reporting.

## ✨ Features

### Customer Features
- **Menu Display**: Beautiful grid layout showing all menu items with images
- **Shopping Cart**: Add items to cart with quantity controls
- **Real-time Billing**: Automatic calculation of total amount
- **QR Code Payment**: Generate QR code for quick payment via UPI
- **PDF Bill Generation**: Download bills as PDF documents
- **Clear Cart**: Easy cart management

### Admin Features
- **Password Protection**: Secure admin access with password authentication
- **Menu Management**: Full CRUD operations (Create, Read, Update, Delete) for menu items
- **Sales Reports**: Monthly sales tracking with filtering options
- **Data Persistence**: All data stored in browser localStorage

## 🛠️ Technologies Used

- **HTML5**: Structure and markup
- **CSS3**: Styling with modern gradients, animations, and responsive design
- **JavaScript (ES6+)**: Core functionality and interactivity
- **localStorage API**: Client-side data persistence
- **QRCode.js**: QR code generation library (CDN)
- **jsPDF**: PDF generation library (CDN)

## 📁 Project Structure

```
Billing web app/
│
├── index.html          # Main customer-facing page
├── admin.html          # Admin menu management page
├── sales.html          # Sales report page
│
├── css/
│   └── styles.css      # All styling and responsive design
│
└── js/
    ├── storage.js      # localStorage utility functions
    ├── main.js         # Main page functionality (cart, billing, QR, PDF)
    ├── admin.js        # Admin page CRUD operations
    └── sales.js        # Sales report generation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required - runs entirely in the browser

### Installation

1. **Clone or download** the project files to your local machine

2. **Open the project** in your preferred code editor (optional)

3. **Launch the application**:
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended for development):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```
   - Then navigate to `http://localhost:8000` in your browser

## 📖 Usage Guide

### For Customers

1. **Browse Menu**: View all available menu items on the main page
2. **Add to Cart**: Click on any menu item to add it to your cart
3. **Manage Cart**: 
   - Use `+` and `-` buttons to adjust quantities
   - Items are automatically added when clicked
4. **Checkout**:
   - Click **"Pay Now"** to view QR code for payment
   - Click **"Print Bill"** to generate and download PDF bill
   - Click **"Clear Cart"** to remove all items

### For Administrators

#### Accessing Admin Panel

1. Navigate to **"Manage Menu"** from the navigation bar
2. Enter the admin password (default: `your password`)
3. Click **"Login"** or press Enter

#### Managing Menu Items

**Adding a New Item**:
1. Fill in the form with:
   - Item Name
   - Price (₹)
   - Image URL (use free image hosting services like Unsplash, Pexels)
   - Category (e.g., Breakfast, Lunch, Dinner)
2. Click **"Add Item"**

**Editing an Item**:
1. Click **"Edit"** button on any menu item
2. Modify the details in the form
3. Click **"Update Item"** or **"Cancel"** to discard changes

**Deleting an Item**:
1. Click **"Delete"** button on any menu item
2. Confirm the deletion

#### Viewing Sales Reports

1. Navigate to **"Sales Report"** from the navigation bar
2. Select a month and/or year from the dropdown filters
3. View sales data in the table format showing:
   - Date and time
   - Items ordered
   - Total amount
4. Monthly totals are automatically calculated

## 🎨 Features in Detail

### Menu Display
- Responsive grid layout
- Hover effects and animations
- Image fallback for broken links
- 10 default breakfast items pre-loaded

### Cart Management
- Real-time quantity updates
- Visual feedback on interactions
- Sticky cart section for easy access
- Empty cart state handling

### Payment System
- QR code generation with payment link
- Static UPI ID support
- Dynamic amount calculation
- Modal display for QR code

### PDF Bill Generation
- Professional bill format
- Includes date, bill number, items, and total
- Automatic order saving to sales history
- Cart clears after bill generation

### Sales Reporting
- Filter by month and year
- Complete order history
- Total sales calculation
- Responsive table design

## 💾 Data Storage

All data is stored in the browser's `localStorage`:
- **menuItems**: Array of menu items
- **orders**: Array of completed orders
- **cart**: Current shopping cart
- **paymentQR**: Payment QR code link
- **adminPassword**: Admin access password

> **Important**: Data is stored locally in the browser. Clearing browser data will reset all information.

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

Breakpoints:
- Desktop: > 768px
- Tablet: 768px - 480px
- Mobile: < 480px

## 🔧 Customization

### Changing Default Menu Items
Edit the `initializeDefaultData()` function in `js/storage.js`

### Modifying Payment QR Code
Update the payment link in `js/storage.js`:
```javascript
setPaymentQR('your-upi-link-here');
```

### Styling Customization
All styles are in `css/styles.css`. Key customization points:
- Color scheme: Search for `#667eea` and `#764ba2` (gradient colors)
- Font sizes: Adjust in respective sections
- Spacing: Modify padding and margin values

## 🐛 Troubleshooting

### QR Code Not Generating
- Check browser console for errors
- Ensure QRCode.js library is loaded (check CDN connection)
- Verify payment link format

### PDF Not Downloading
- Check browser console for errors
- Ensure jsPDF library is loaded
- Verify browser allows downloads

### Menu Items Not Saving
- Check browser localStorage is enabled
- Verify no browser extensions blocking localStorage
- Check browser console for errors

## 📝 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)

## 🚧 Future Enhancements

Potential features for future versions:
- Multiple payment methods
- Order history for customers
- Table/seat management
- Kitchen display system
- Inventory management
- Customer feedback system
- Multi-language support

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Development

### Adding New Features

1. **New Page**: Create HTML file and link to `styles.css`
2. **New Functionality**: Add JavaScript file and include in HTML
3. **Data Storage**: Use functions from `storage.js` for consistency

### Code Structure

- **Separation of Concerns**: HTML (structure), CSS (styling), JS (functionality)
- **Modular Design**: Each page has its own JS file
- **Shared Utilities**: Common functions in `storage.js`

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review browser console for errors
3. Verify all files are in correct locations

## 🙏 Acknowledgments

- **QRCode.js**: QR code generation library
- **jsPDF**: PDF generation library
- **Unsplash/Pexels**: Free image resources for menu items

---

**Made with ❤️ for restaurants**

Enjoy using the Restaurant Billing System! 🍽️

