//Citation for updating data (Updating)
//      # Date: 3/9/2024
//      # Adapted from assignment tutorial
//      # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data 

// Get the objects we need to modify
let updateReportForm = document.getElementById('update-report-form-ajax');

// Modify the objects we need
updateReportForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let reportIDInput = document.getElementById("reportSelect");
    let titleInput = document.getElementById("titleInputUpdate");
    let activityInput = document.getElementById("activityInputUpdate");
    let distanceInput = document.getElementById("distanceInputUpdate");
    let descriptionInput = document.getElementById("descriptionInputUpdate");
    let reportDateInput = document.getElementById("reportDateInputUpdate");
    let [userNameInput, userIDInput] = document.getElementById("userIDInputUpdate").value.split('|');
    let trailsTraveledInput= document.getElementById("trailsTraveledInputUpdate");
    

    trailsTraveledArray = [];
    for (let i = 0; i < trailsTraveledInput.options.length; i++){
        if (trailsTraveledInput.options[i].selected){
            trailsTraveledArray.push(trailsTraveledInput.options[i].value);
        }
    }
    console.log(trailsTraveledArray);

    if (isNaN(distanceInput.value)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        reportIDInput: reportIDInput.value, 
        titleInput: titleInput.value,
        activityInput: activityInput.value,
        distanceInput: distanceInput.value,
        descriptionInput: descriptionInput.value,
        userNameInput: userNameInput,
        userIDInput: userIDInput,
        reportDateInput: reportDateInput.value,
        trailsTraveledInput: trailsTraveledArray
    };
    console.log(data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-report-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, reportIDInput.value);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, reportID){
    let parsedData = JSON.parse(data);
    console.log(parsedData)
    
    let table = document.getElementById("report-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       console.log(i)
       console.log(table.rows[i].getAttribute("data-value"))
       console.log(reportID)
       if (table.rows[i].getAttribute("data-value") == reportID) {
            console.log("Match!")
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            console.log(updateRowIndex);

            let td2 = updateRowIndex.getElementsByTagName("td")[2]; 
            td2.innerHTML = parsedData[0].title; 
    
            let td3 = updateRowIndex.getElementsByTagName("td")[3]; 
            td3.innerHTML = parsedData[0].activity; 
    
            let td4 = updateRowIndex.getElementsByTagName("td")[4]; 
            td4.innerHTML = parsedData[0].distance; 
    
            let td5 = updateRowIndex.getElementsByTagName("td")[5]; 
            td5.innerHTML = parsedData[0].description; 

            let td6 = updateRowIndex.getElementsByTagName("td")[6]; 
            td6.innerHTML = parsedData[0].reportDate;
            
            let td7 = updateRowIndex.getElementsByTagName("td")[7]; 
            td7.innerHTML = parsedData[0].userName; 
        }
    }
}
