const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;
document.getElementsByClassName("today")[0].innerHTML = currentDate;

var elements = document.getElementsByClassName("today");

for (var i=0; i<elements.length; i++) {
    elements[i].innerHTML = currentDate;
}




const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");


menuBtn.addEventListener('click',() => {
    sideMenu.style.display = 'block';
})

closeBtn.addEventListener('click',() => {
    sideMenu.style.display = 'none';
})

// themeToggler.addEventListener('click',() =>{
//     document.body.classList.toggle('dark-theme-variables')

//     themeToggler.querySelector('i:nth-child(1)').classList.toggle('active')
//     themeToggler.querySelector('i:nth-child(2)').classList.toggle('active')
// })

function myFunction() {
    document.body.classList.toggle('dark-theme-variables')
    themeToggler.querySelector('i:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('i:nth-child(2)').classList.toggle('active')
    
 }


// sales - balance 
// offline - expense
// customers - income



var spreassheetID = '1y2cgQVPGDd_XJuV8aywtQVa52rqefLYcJnVvLVhcRfw'
var api_key = 'AIzaSyDyn7WQTn4K4LktpGPRE16JEtkEbndLDJw'
var expense_sheet = 'Expense'
var income_sheet = 'Income'
var amount_cells = '!C2:C'

var income_url = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreassheetID +'/values/' + income_sheet + amount_cells + '?key=' + api_key
var expense_url = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreassheetID +'/values/' + expense_sheet + amount_cells + '?key=' + api_key

var income_amt = 0.0
var expense_amt = 0.0

fetch(income_url)
.then(response => response.json())
.then(data => {
    // Extract values from the response
    let values = data.values;
    // Iterate over values and sum them up
    values.forEach(row => {
        row.forEach(cell => {
            // Parse cell value to number and add to sum
            income_amt += parseFloat(cell) || 0;
        });
    });

    // Display the sum in the HTML file
    document.getElementById('income').innerText = "₹" + income_amt.toLocaleString('en-IN');
})

fetch(expense_url)
.then(response => response.json())
.then(data => {
    // Extract values from the response
    let values = data.values;
    // Iterate over values and sum them up
    values.forEach(row => {
        row.forEach(cell => {
            // Parse cell value to number and add to sum
            expense_amt += parseFloat(cell) || 0;
        });
    });

    // Display the sum in the HTML file
    document.getElementById('expense').innerText = "₹" + expense_amt.toLocaleString('en-IN');
    document.getElementById('balance').innerText = "₹" + (income_amt-expense_amt).toLocaleString('en-IN');
})


