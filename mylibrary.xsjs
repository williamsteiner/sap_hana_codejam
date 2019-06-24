$.response.contentType = "text/html";
var output = "My Personal Library!<br><br>";

//Open a database connection
//var conn = $.db.getConnection();
var conn = $.db.getConnection("codejam::Anonymous_Access");

//Prepare a simple SQL statement on the system table "DUMMY"
var pstmt = conn.prepareStatement('SELECT * FROM "MYCJ"."codejam.data::mydata.Book"');

//Execute the query
var rs = pstmt.executeQuery();

//Check the query result
if (!rs.next()) {
    //Something went wrong: Return an error
    $.response.setBody("Failed to retrieve data");
    $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
} else {
    //All went fine: Return the Query result
    output = output + "This is the response from my SQL:<br><br>";
    output = output + rs.getString(1) + ' ' +  rs.getString(2) + ' ' +  rs.getString(3) + ' ' +  rs.getString(4) + '<br>';
}

var oResult = [];

//get all rows
        output = output + "</br></br> Displaying  all rows now: </br></br>";
     do {
            // output = output + "</br></br> Displaying all books:";
        output = output + rs.getString(1) + ' ' +  rs.getString(2) + ' ' +  rs.getString(3) + ' ' +  rs.getString(4) + '<br>';
        
        oResult.push({
          "ID" : rs.getString(1),
          "Title" : rs.getString(2)
        }); 
        
    } while (rs.next()) //So that the first entry will be pulled out as well.

//Close the database connection
rs.close();
pstmt.close();
conn.close();

// add json to output
output+="</br>JSON output: </br>"  + JSON.stringify(oResult);

//Return the HTML response.
$.response.setBody(output);