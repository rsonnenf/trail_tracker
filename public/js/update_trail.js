//Citation for updating data (Updating)
//      # Date: 3/9/2024
//      # Adapted from assignment tutorial
//      # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data 

// Get the objects we need to modify
let updateTrailForm = document.getElementById('update-trail-form-ajax');

// Modify the objects we need
updateTrailForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let trailIDInput = document.getElementById("trailSelect");
    let regionInput = document.getElementById("regionInputUpdate");
    let elevationInput = document.getElementById("elevationInputUpdate");
    let lengthInput = document.getElementById("lengthInputUpdate");
    let descriptionInput = document.getElementById("descriptionInputUpdate");
    console.log(regionInput)
    console.log(regionInput.value)
    console.log("Hi!")



    if (isNaN(elevationInput.value)) 
    {
        return;
    }

    if (isNaN(lengthInput.value)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        trailIDInput: trailIDInput.value,
        regionInput: regionInput.value,
        elevationInput: elevationInput.value,
        lengthInput: lengthInput.value,
        descriptionInput: descriptionInput.value
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-trail-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, trailIDInput.value);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, trailID){
    let parsedData = JSON.parse(data);
    console.log(parsedData)
    
    let table = document.getElementById("trail-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       console.log(i)
       console.log(table.rows[i].getAttribute("data-value"))
       console.log(trailID)
       if (table.rows[i].getAttribute("data-value") == trailID) {
            console.log("Match!")
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td = updateRowIndex.getElementsByTagName("td")[3];

            td.innerHTML = parsedData[0].region;
            
            let td2 = updateRowIndex.getElementsByTagName("td")[4];

            td2.innerHTML = parsedData[0].length; 

            let td3 = updateRowIndex.getElementsByTagName("td")[5];

            td3.innerHTML = parsedData[0].elevationGain;

            let td4 = updateRowIndex.getElementsByTagName("td")[6];

            // Reassign homeworld to our value we updated to
            td4.innerHTML = parsedData[0].description;
       }
    }
}
