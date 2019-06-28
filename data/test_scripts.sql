-- v1

-- create table test_user(name varchar(50));

-- insert into test_user values('bill steiner');

-- sehlect * from test



 select * from "MYCJ"."codejam.data::mydata.Book";
 
 select * from "MYCJ"."codejam.data::mydata.Book" where ID = 5;
 
  update "MYCJ"."codejam.data::mydata.Book"   set BOOKNAME = 'Learning SAPUI5'   where ID = 5;
 
 
   DELETE from "MYCJ"."codejam.data::mydata.Book"   where ID > 5;


-- select * from  "_SYS_XS"."SQL_CONNECTIONS"   WHERE name = 'codejam::Anonymous_Access';

-- UPDATE "_SYS_XS"."SQL_CONNECTIONS" SET username = 'BILL'   WHERE name = 'codejam::Anonymous_Access';

-- UPDATE "_SYS_XS"."SQL_CONNECTIONS" SET username = 'SYSTEM'   WHERE name = 'codejam::Anonymous_Access';

-- UPDATE "_SYS_XS"."SQL_CONNECTIONS" SET username = 'BILL'   WHERE name = 'codejam::Anonymous_Access';

-- UPDATE "_SYS_XS"."SQL_CONNECTIONS" SET username = 'BILL'   WHERE name = 'HelloWorld::Anonymous_Access';

-- INSERT into "MYCJ"."codejam.data::mydata.Book" values (6,'BOOKNAME','CATEGORY',CURDATE() );


INSERT into "MYCJ"."codejam.data::mydata.Book" (BOOKNAME,CATEGORY,INVDATE) values ('BOOKNAME2','CATEGORY2',CURDATE() );
 
  INSERT into "MYCJ"."codejam.data::mydata.Book" (ID,BOOKNAME)  values (1002, 'myBOOKNAME'  ); 

    DELETE from "MYCJ"."codejam.data::mydata.Book"   where ID > 5;
    
INSERT INTO "MYCJ"."codejam.data::mydata.Book" VALUES (6, 'My Test Book', 'test cat', CURDATE() );

CREATE COLUMN TABLE "NEO_ALIEN"."PERSONAL" ("EMAIL" NVARCHAR(30), "FIRSTNAME" NVARCHAR(30), "LASTNAME" NVARCHAR(30), "AGE" NVARCHAR(3), "ADDRESS" NVARCHAR(50))

 INSERT INTO "NEO_ALIEN"."PERSONAL" VALUES( 'dirk.brian@example.com', 'Dirk', 'Brian', '49', 'Exeter, England');


 