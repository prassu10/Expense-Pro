document.getElementById("sign-in-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // For demo purposes, check if username and password are valid
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Here you can implement your backend authentication logic
    // For simplicity, let's consider username: "admin" and password: "password"
    if (username === "admin" && password === "password") {
        document.querySelector("#login-container").style.display = 'none';
        document.querySelector("#home").style.display = 'block';
    } else {
        alert("Invalid username or password");
    }
  });

 document.getElementById("logout").addEventListener('click', () => {
    document.querySelector("#home").style.display = 'none';
    document.querySelector("#login-container").style.display = 'block';
 });



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

let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
yesterday = yesterday.toLocaleDateString('en-IN');
console.log(yesterday)


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

var categoryIcons = {
    'Salary': 'fa-wallet',
    'Balance': 'fa-piggy-bank',
    'Recieve': 'fa-receipt',
    'Mom': 'fa-house',
    'Food': 'fa-utensils',
    'Beverages': 'fa-mug-hot',
    'Travel': 'fa-car',
    'Fuel': 'fa-gas-pump',
    'Spend': 'fa-comment-dollar',
    'Smoke': 'fa-smoking',
    'Betting': 'fa-biohazard',
    'Grooming': 'fa-scissors'
};

var spreassheetID = '1y2cgQVPGDd_XJuV8aywtQVa52rqefLYcJnVvLVhcRfw'
var api_key = 'AIzaSyDyn7WQTn4K4L'
var api = 'ktpGPRE16JEtkEbndLDJw'
var sheet = 'Dashboard'
var cells = '!A:G'

var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreassheetID +'/values/' + sheet + cells + '?key=' + api_key + api

var income_amt = 0.0
var expense_amt = 0.0

var bank_balance = 0.0;
var meal_balance = 0.0;
var cash_balance = 0.0;

fetch(url)
    .then(response => response.json())
    .then(data => {
        data.values.forEach(row => {
            
            var date = row[0];
            var title = row[1];
            var amount = parseFloat(row[2]);
            var category = row[3];
            var type = row[4];
            var method = row[5]
            var notes = row[6]

            if (type === "Income") {
                income_amt += amount;
                
                if (method === "Cash") {
                    cash_balance += amount;
                }
                if (method === "Meal Card") {
                    meal_balance += amount;
                }
                if (method === "Online") {
                    bank_balance += amount;
                }
            }

            else if (type === "Expense") {
                expense_amt += amount;
                
                if (method === "Cash") {
                    cash_balance -= amount;
                }
                if (method === "Meal Card") {
                    meal_balance -= amount;
                }
                if (method === "Online") {
                    bank_balance -= amount;
                }
            }

            
            
        });
        document.getElementById('income').innerText = "₹" + income_amt.toLocaleString('en-IN');
        document.getElementById('expense').innerText = "₹" + expense_amt.toLocaleString('en-IN');
        document.getElementById('balance').innerText = "₹" + (income_amt-expense_amt).toLocaleString('en-IN');
        document.getElementById('p-bank').innerText = "₹" + bank_balance.toLocaleString('en-IN');
        document.getElementById('p-cash').innerText = "₹" + cash_balance.toLocaleString('en-IN');
        document.getElementById('p-card').innerText = "₹" + meal_balance.toLocaleString('en-IN');
    })
    .catch(error => console.error('Error fetching data: ', error));


fetch(url)
    .then(response => response.json())
    .then(data => {
        // Get the last 3 rows in descending order
        var lastThreeRows = data.values.slice(-5).reverse();
    
        // Set the "Title" values of the last 3 rows to specific elements
        lastThreeRows.forEach((row, index) => {
            
            var title = row[1];
            var elementId = 'r-title' + (index + 1);
            document.getElementById(elementId).innerText = title;
    
            var title = row[2];
            var elementId = 'r-amt' + (index + 1);
            document.getElementById(elementId).innerText = "₹" + title.toLocaleString('en-IN');
            
            var type = row[4];
            if (type === 'Income') {
                document.getElementsByClassName('r-icon')[index].style.background = 'var(--color-success)';
                document.getElementById(elementId).classList.add('success')
                var category = row[3];
                var iconClass = categoryIcons[category];
                var rIcon = document.getElementsByClassName('ri')[index];
                
                if (iconClass) {
                    rIcon.classList.add(iconClass);
                }


            } else if (type === 'Expense') {
                document.getElementsByClassName('r-icon')[index].style.background = 'var(--color-danger)';
                document.getElementById(elementId).classList.add('danger')
                var category = row[3];
                
                var iconClass = categoryIcons[category];
                var rIcon = document.getElementsByClassName('ri')[index];
                
                if (iconClass) {
                    rIcon.classList.add(iconClass);
                }

            }
        });
    })
    .catch(error => console.error('Error fetching data: ', error));