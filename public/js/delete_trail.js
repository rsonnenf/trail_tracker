//Citation for deleting data
//      # Date: 3/9/2024
//      # Adapted from assignment tutorial
//      # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data 

// code for deleteTrails function using jQuery
function deleteTrail(trailID) {
    let link = '/delete-trail-ajax/';
    let data = {
      trailID: trailID
    }
  
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-trail-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(trailID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

  
  function deleteRow(trailID){
      let table = document.getElementById("trail-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
        let rowTrailID = table.rows[i].getAttribute("data-value");
        console.log(rowTrailID)
        console.log(table.rows[i].getAttribute("data-value"));
        if (table.rows[i].getAttribute("data-value") == trailID) {
              table.deleteRow(i);
              deleteDropDownMenu(trailID)
              break;
        }
      }
  }
  
  function deleteDropDownMenu(trailID){
    let selectMenu = document.getElementById("trailSelect");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(trailID)){
        selectMenu[i].remove();
        break;
      } 
  
    }
  }