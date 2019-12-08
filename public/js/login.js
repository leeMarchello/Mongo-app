function authenticate() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;
    fetch(`http://localhost:9000/api/login`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    .then( response => {
        console.log('login response: ', response);
        if (response.status === 200){
            console.log("The response status is ", response.status);
            window.location.href = 'http://localhost:9000/home.html'    
            //location.replace('http://localhost:9000/home.html') 
        }
        else {
            alert("Login details incorrect, please try again");
        }
    })
}