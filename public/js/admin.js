var listOfStudents = [];
console.log("Performing fetch operation...")
fetch('http://localhost:9000/api/get/students') 
 .then(response => {
    if (response.status === 200) {
        console.log('response.body: ', response.body);
        return response.json();
    }
})
.then( jsonData => {
    console.log("final data: ", jsonData)
    listOfStudents = jsonData;
})
 .catch( error => console.log("Error during fetch: ",error));


 