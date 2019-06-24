$.response.contentType = "text/html";
// allow cors
$.response.contentType = "application/json";
$.response.headers.set("Access-Control-Allow-Origin", "*");

//Open a database connection
//var conn = $.db.getConnection();
let conn = $.db.getConnection("codejam::Anonymous_Access");
// Get Table data 
let pstmt = conn.prepareStatement('SELECT * FROM "MYCJ"."codejam.data::mydata.Book"');
//Execute the query
let rs = pstmt.executeQuery();
let stmt, output, response;
let oResult = [];

//load post params
let paramID = $.request.parameters.get("ID") ? parseInt($.request.parameters.get("ID")) : "";
let paramTitle = $.request.parameters.get("Title") ? $.request.parameters.get("Title") : "";
let paramAction = $.request.parameters.get("action") ? $.request.parameters.get("action") : "";

logMe('codejam API started. paramID: ' + paramID + ', paramTitle: ' + paramTitle + ', paramAction: ' + paramAction);
getIp();

//Check the query result - output first row
if (!rs.next()) {
	//Something went wrong: Return an error
	$.response.setBody("Failed to retrieve data");
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
} else {
	//All went fine: Return the Query result
	output = output + "This is the response from my SQL:<br><br>";
	output = output + rs.getString(1) + ' ' + rs.getString(2) + ' ' + rs.getString(3) + ' ' + rs.getString(4) + '<br>';
}

//Output all rows now.
output = output + "</br></br> Displaying  all rows now: </br></br>";
do {
	output = output + rs.getString(1) + ' ' + rs.getString(2) + ' ' + rs.getString(3) + ' ' + rs.getString(4) + '<br>';
	oResult.push({
		"ID": rs.getString(1),
		"Title": rs.getString(2)
	});

} while (rs.next())
// add json to output
output = JSON.stringify(oResult);
logMe('all rows: ' + output);

// crud part
try {
	// todo refactor to switch
	switch (paramAction) {
		case "update":
			response = JSON.stringify({
				"title": paramTitle
			});

			pstmt = conn.prepareStatement("update \"MYCJ\".\"codejam.data::mydata.Book\"   set BOOKNAME = ? where ID = ?");
			pstmt.setString(1, paramTitle);
			pstmt.setInt(2, paramID);
			pstmt.execute();
			conn.commit();
			break;
		case "insert":
			response = JSON.stringify({
				"title": paramTitle
			});

			pstmt = conn.prepareStatement("INSERT INTO \"MYCJ\".\"codejam.data::mydata.Book\" VALUES (?, ?, 'Educational', CURDATE() )");
			pstmt.setInt(1, 6);
			pstmt.setString(2, paramTitle);
			pstmt.execute();
			conn.commit();
			break;
			
		case "delete":
		    response = JSON.stringify({
				"Deleted ID": paramID
			});
			
			pstmt = conn.prepareStatement("DELETE from \"MYCJ\".\"codejam.data::mydata.Book\"  where ID = ?");
			pstmt.setInt(1, paramID);
			pstmt.execute();
			conn.commit();
			break;
		default:
			response = output;
	}

	// build response
	$.response.status = 200;
	$.response.setBody(response);

} catch (e) {
	let code = getStatusCode(e.message);
	logMe('caught error code: ' + code + ', message: ' + e.message);
	if (code && code === 301) {
		$.response.setBody('Row already exists. Try deleting this row first.');
	} else {
		$.response.setBody(e.message);
	}
	$.response.status = $.net.http.BAD_REQUEST;

} finally {
	rs.close();
	pstmt.close();
	conn.close();
}

function getStatusCode(msg) {
	var m = msg.match('\\:\\s(\\d+)\\s\\-');
	return (m) ? parseInt(m[1], 10) : null;
}

function logMe(msg) {
	//$.trace.info("INFO: parmams. ID: " + paramID);
	$.trace.error("LOG: " + msg);
}

function getIp() {
	var ipAddress = $.request.headers.get("X-FORWARDED-FOR");
	logMe('ip address: ' + JSON.stringify(ipAddress));
}