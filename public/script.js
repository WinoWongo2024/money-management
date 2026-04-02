// script.js

// Get references to DOM elements
const transactionForm = document.getElementById('transactionForm');
const transactionList = document.getElementById('transactionList');
const currentBalance = document.getElementById('currentBalance');

// Initialize transactions from localStorage or an empty array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Function to update the balance
function updateBalance() {
    const total = transactions.reduce((acc, transaction) => {
        return transaction.type === 'income' ? acc + parseFloat(transaction.amount) : acc - parseFloat(transaction.amount);
    }, 0);
    currentBalance.textContent = '$' + total.toFixed(2);
}

// Function to add a transaction to the DOM
function addTransactionToDOM(transaction) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        ${transaction.description} - $${transaction.amount} (${transaction.type})
    `;
    transactionList.appendChild(listItem);
}

// Function to initialize the app
function init() {
    transactionList.innerHTML = ''; // Clear existing list
    transactions.forEach(addTransactionToDOM);
    updateBalance();
}

// Add a new transaction
function addTransaction(description, amount, type) {
    const transaction = {
        id: generateID(),
        description,
        amount: +amount, // Convert to number
        type
    };

    transactions.push(transaction);
    addTransactionToDOM(transaction);
    updateBalance();
    updateLocalStorage();
}

// Generate a unique ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Event listener for form submission
transactionForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting and refreshing the page

    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;

    if (description.trim() === '' || amount.trim() === '') {
        alert('Please enter a description and amount');
        return;
    }

    addTransaction(description, amount, type);

    // Clear the form
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
});

// Initialize the app
init();
