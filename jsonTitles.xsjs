// allow cors
$.response.contentType = "application/json"; //other examples: $.response.contentType = "text/html";
$.response.headers.set("Access-Control-Allow-Origin", "*");

//Open a database connection
//var conn = $.db.getConnection();  // use this if not anonymous access
let conn = $.db.getConnection("codejam::Anonymous_Access");
let response_status = 200;
let pstmt, output, response, rs;
let oResult = [];
//load post params
let paramID = $.request.parameters.get("ID") ? parseInt($.request.parameters.get("ID")) : "";
let paramTitle = $.request.parameters.get("Title") ? $.request.parameters.get("Title") : "";
let paramAction = $.request.parameters.get("action") ? $.request.parameters.get("action") : "";

logMe('*codejam API started. paramID: ' + paramID + ', paramTitle: ' + paramTitle + ', paramAction: ' + paramAction);
getIp();

// crud actions
try {
	switch (paramAction) {
		case "update":
			response = JSON.stringify({
				"title": paramTitle
			});

			pstmt = conn.prepareStatement("update \"MYCJ\".\"codejam.data::mydata.Book\"   set BOOKNAME = ? where ID = ?");
			pstmt.setString(1, paramTitle);
			pstmt.setInt(2, paramID);
			executePstmt(pstmt, conn);
			//pstmt.execute();
			//conn.commit();
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

			// Get all Table data 
		case "get":
			logMe('get all rows');
			pstmt = conn.prepareStatement('SELECT * FROM "MYCJ"."codejam.data::mydata.Book"');
			rs = pstmt.executeQuery();
			// get a row first!
			if (!rs.next()) {
				response = "Failed to retrieve data";
				$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			} else {
				do {
					output = output + rs.getString(1) + ' ' + rs.getString(2) + ' ' + rs.getString(3) + ' ' + rs.getString(4) + '<br>';
					oResult.push({
						"ID": rs.getString(1),
						"Title": rs.getString(2)
					});

				} while (rs.next())
			}
			//  
			response = JSON.stringify(oResult);
			logMe('all rows: ' + response);
			break;
		default:

	}

	// return the response
	$.response.status = response_status;
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
	closeResources(rs, pstmt, conn);

}

function closeResources(rs, pstmt, conn) {
	try {
		rs.close();
		pstmt.close();
		conn.close();
	} catch (e) {
		//ignore
	}
}

function executePstmt(pstmt, conn) {
	try {
		pstmt.execute();
		conn.commit();
		logMe('Prepared statement executed for api action: ' + paramAction);
	} catch (e) {
		//ignore
	}
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