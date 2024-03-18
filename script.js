document.getElementById("sign-in-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // For demo purposes, check if username and password are valid
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Here you can implement your backend authentication logic
    // For simplicity, let's consider username: "admin" and password: "password"
    if (username === "admin" && password === "password") {
        window.location.href = "home.html"; // Redirect to dashboard
    } else {
        alert("Invalid username or password");
    }
  });
  
function preventBack(){window.history.forward();}
setTimeout("preventBack()", 0);
window.onunload=function(){null};
