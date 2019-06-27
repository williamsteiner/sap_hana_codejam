Based on tutorials: 
https://developers.sap.com/tutorials/hana-web-development-workbench.html#3fbee0cf-066c-464d-bef9-68778eafc609
https://github.com/williamsteiner/sap_hana_codejam/blob/master/jsonTitles.xsjs
https://developers.sap.com/tutorials/hana-data-access-authorizations.html#28c5a379-5617-4709-acaf-7b1d98417b1f

--------------------------------
SAP HANA is an in-memory data platform that can be deployed on premise or on demand. 
At its core, it is an innovative in-memory relational database management system.

XS stands for SAP HANA Extended Application Services. Sometimes it is also referred as XS Engine or just XS. 
The main idea of SAP HANA XS is to embed a full featured application server, web server, and development environment 
within the SAP HANA appliance itself.

SAP HANA XS JavaScript (XSJS) is an application programming language in JavaScript. 
It can be used to exposes data stored in database tables or views to client side. Additionally we can also implement 
any business logic. Unlike XSODATA, XSJS is a free flow approach where we can write our own logic using JavaScript.

Important points about SAP HANA XS:
XS is a Small footprint application server / web server.
It is the basis for an application development platform inside SAP HANA.
It simplifies architecture and lowers the TCO (total cost of operation).
It provides easy access to SAP HANA database via HTTP-based consumption

SAP HANA Extended Application Services are provided by the SAP HANA XS server, which provides lightweight application 
services that are fully integrated into SAP HANA. It allows clients to access the SAP HANA system via HTTP. 
Controller applications can run completely natively on SAP HANA, without the need for an additional external application server.

You can use SAP HANA XS to build dynamic HTML5 UI applications. With the SAP HANA XS server, developers can write SAP HANA-based 
applications that cover all server-side aspects, such as tables and database views, database procedures, server-side control logic, 
integration with external systems, and provisioning of HTTP-based services. The integration of the SAP HANA XS server into the 
SAP HANA system also helps to reduce cost of ownership, as all servers are installed, operated and updated as one system.

When you activate an application artifact, the file extension (for example, .hdbdd, .xsjs, or hdbprocedure, ...) is used to determine which runtime plug-in 
to call during the activation process. The plug-in reads the repository artifact selected for activation (for example, a table definition, a complete CDS document, 
or server-side JavaScript code), interprets the object description in the file, and creates the appropriate runtime object in the designated catalog schema.

------------- XS Advanced (cf) vs XS Classic (neo) -----------------
https://blogs.sap.com/2019/02/24/sap-cloud-platform-environment-cloud-foundry-vs-neo/


The XS Advanced Programming Model
Writing applications for deployment to SAP HANA XS advanced.

SAP HANA Extended Application Services advanced model (XS advanced) adds an application platform to the SAP HANA in-memory database. 
In the Cloud, this platform is provided by Cloud Foundry. An SAP-developed run-time environment is bundled with SAP HANA on-premise 
which provides a compatible platform that enables applications to be deployed to both worlds: the Cloud and on-premise. 
XS advanced is optimized for simple deployment and the operation of business applications that need to be deployed in both worlds. 
For this reason, the XS advanced programming model fully embraces the Cloud Foundry model and leverages its concepts and technologies. 
In areas where Cloud Foundry as an intentionally generic platform for distributed Web applications does not address relevant topics 
or offers choice, the XS advanced programming model provides guidance that is in line with the general Cloud programming model.

XS advanced is a polyglot application platform that supports several programming languages and execution environments, for example, 
Java and Node.js. The classic XS JavaScript (XSJS) is supported by a framework running in the Node.js run time.



-------------------------------- SETUP --------------------------------
Make sure your trial subaccount is Europe (ROT) trial
When creating new Hana DB, do not select dp server - web server only
The new DB password you enter is for user: SYSTEM
once logged in to workbench, add below roles to user SYSTEM to access the other tabs on the workbench page

--------------------------------
Create new user example - SYSTEM
--------------------------------
Granted Roles:

codejam.data::user
sap.hana.admin.roles::Administrator
sap.hana.xs.ide.roles::CatalogDeveloper
sap.hana.ide.roles::CatalogDeveloper
sap.hana.ide.roles::EditorDeveloper
sap.hana.xs.ide.roles::EditorDeveloper
sap.hana.ide.roles::SecurityAdmin
sap.hana.ide.roles::TraceViewer
sap.hana.xs.debugger::Debugger
sap.hana.ide.roles::Developer

-- Object priviledges:

codejam.data::mydata.Book (MYCJ)  ??? not sure needed

-- Application privledges:
customer5::Execute

-- the above is mandatory to run once .xsaccess entry below is added:
"authorization":[ "customer5::Execute"], 
-- which MUST match the entries in the .xspivileges file
"privileges": [
  {"name": "Execute", "description": "Execute"} 
]

 
--------------------------------
---------- codejam demo created user  
--------------------------------
>Roles

codejam.data::user

Object priviledges:

codejam.data::mydata.Book (MYCJ)      = select,insert,update,delete
 

--------------------------------
Create new user example - BILL
--------------------------------
Granted Roles:

codejam.data::user
sap.hana.ide.roles::EditorDeveloper
sap.hana.ide.roles::SecurityAdmin
sap.hana.ide.roles::TraceViewer
sap.hana.xs.admin.roles::SQLCCAdministrator
sap.hana.xs.admin.roles::SQLCCViewer
sap.hana.xs.debugger::Debugger
sap.hana.ide.roles::Developer
sap.hana.xs.ide.roles::CatalogDeveloper
??
sap.hana.xs.lm.roles::Administrator
sap.hana.xs.lm.roles::Developer

--------------------------------
Create new user example - API_USER
--------------------------------
Granted Roles:

codejam.data::user


--------------------------------
updates for anonymous access
--------------------------------

-- select * from  "_SYS_XS"."SQL_CONNECTIONS"   WHERE name = 'codejam::Anonymous_Access';
 
-- UPDATE "_SYS_XS"."SQL_CONNECTIONS" SET username = 'SYSTEM' WHERE name = 'codejam::Anonymous_Access';
-- UPDATE "_SYS_XS"."SQL_CONNECTIONS" SET username = 'BILL'   WHERE name = 'codejam::Anonymous_Access';

-------------------------------- test urls --------------------------
https://hanatestap2000584808trial.hanatrial.ondemand.com/codejam/jsonTitles.xsjs?action=get

------------------ non-rewrite example ----------
https://hanatestap2000584808trial.hanatrial.ondemand.com/codejam/jsonTitles.xsjs?action=get

--------------- rewrite example -----------------
https://hanatestap2000584808trial.hanatrial.ondemand.com/codejam/getRows
https://hanatestap2000584808trial.hanatrial.ondemand.com/codejam/action/get

--ref: https://help.sap.com/viewer/400066065a1b46cf91df0ab436404ddc/2.0.04/en-US/8067eabb21af4448b73895982ec394a4.html

------------ example xsaccess ------------------
-- ref: https://help.sap.com/viewer/400066065a1b46cf91df0ab436404ddc/2.0.04/en-US/a9fc5c220d744180850996e2f5d34d6c.html


============================ oData tutorials ============================
https://blogs.sap.com/2018/12/20/create-a-hana-db-and-expose-it-via-odata-on-scp-in-under-45-minutes-1/
https://blogs.sap.com/2018/12/20/create-a-hana-db-and-expose-it-via-odata-on-scp-in-under-40-minutes-2/


