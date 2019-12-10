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
        valuelist.push(listOfStudents[i].name.toUpperCase());
        valuelist.push(listOfStudents[i].surname.toUpperCase());
        valuelist.push(listOfStudents[i].centre.toUpperCase());
        valuelist.push(listOfStudents[i].courseList);
        for(var k =0; k<valuelist[3].length; k++){
            var tmp = valuelist[3][k].toUpperCase();
            valuelist[3][k] = tmp;
        }
        var objlen = valuelist.length;

        for(var x =0; x< objlen; x++){
            var cell = document.createElement("td");
            var cellbody = document.createTextNode(valuelist[x]);
            cell.appendChild(cellbody);
            document.getElementById("table01").appendChild(cell)  
        }
        var Tinput = document.createElement("input");
        Tinput.setAttribute("type","text");
        Tinput.setAttribute("id","tableinput");
        document.getElementById("table01").appendChild(Tinput);
    }
    
})
 .catch( error => console.log("Error during fetch: ",error));


 var edcomment = document.getElementById("Tinput");
 