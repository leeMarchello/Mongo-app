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
    var listlen = listOfStudents.length;
    var mytable = document.getElementById('table01');
    for (var i = 0; i < listlen; i++) {
        var row = document.createElement('tr');
        row.id= "row"+i;
        document.getElementById("table01").appendChild(row);
        var valuelist = [];
        valuelist.push(listOfStudents[i].name);
        valuelist.push(listOfStudents[i].surname);
        valuelist.push(listOfStudents[i].centre);
        valuelist.push(listOfStudents[i].courseList);
        valuelist.push(listOfStudents[i].comment);
        var objlen = valuelist.length;
        console.log(valuelist);
        for(var x =0; x< objlen; x++){
            var cell = document.createElement("td");
            var cellbody = document.createTextNode(valuelist[x]);
            cell.appendChild(cellbody);
            document.getElementById("table01").appendChild(cell)  
        }
    }
    
})
 .catch( error => console.log("Error during fetch: ",error));


 