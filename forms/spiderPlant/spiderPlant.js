spiderPlant.onshow=function(){
     query = "SELECT type, size, light, indoor_outdoor, frequency  FROM plant WHERE plant_id = 15"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupa6&query=" + query);

    if (req.status == 200) { //transit trip worked. 
        results = JSON.parse(req.responseText)
        console.log(`The results are \n ${results}`)
        if (results.length == 0)
            txtaSpiderPlant.value = "There are no customers in the database."
        else {
            let message = ""
            for (i = 0; i < results.length; i++)
                message = message + results[i] + " \n "
            txtaSpiderPlant.value = message
        } // end else

    } else // the transit didn't work - bad wifi? server turned off?
        txtaSpiderPlant.value = "Error code: " + req.status
} 

