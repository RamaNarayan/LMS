# LMS
Full stack library management system - React,Python,Flask and MySQL
-------------------------------------------------------------------------------------------
	Installation:
		Required Software:
			- Install Python 3.6 and pip.
			- Install Flask by running 'pip install flask' from command prompt.
			- Install  MySQL server.
			- Install MySQL connector for python using 'pip install mysql-connector==2.1.4'
		
		Initial Data Load:
			- Navigate to dist folder.
			- Locate the lms.sql script under 'sql' folder and run in MySQL as 'root' user.
			- Navigate to 'DataMigrationScripts' folder.
			- Edit books.csv - Remove the first row(header) if found.
			- Edit migrateBooksCsvToMysql.py. Locate the following line:
				cnx = mysql.connector.connect(user='', password='',database='lms',charset='utf8')
				Enter your root username and password. Save the file.
			- Run migrateBooksCsvToMysql.py using python
			- Edit borrowers.csv - Remove the first row(header) if found.
			- Edit migrateBorrowersCsvToMysql.py. Locate the following line:
				cnx = mysql.connector.connect(user='', password='',database='lms',charset='utf8')
				- Enter your root username and password. Save the file.
			- Run migrateBorrowersCsvToMysql.py using python
		
		Start Server:
			- Navigate to "dist/server/".
			- Edit server.py. Locate the following line:
				cnx = mysql.connector.connect(user='', password='',database='lms',charset='utf8')
				- Enter your root username and password. Save the file.
			- Run server.py using python
		
Web application access - http://localhost:5000/

Supported Browser: Google Chrome.


	Dev Mode Installation:
		Required software:
			In addition to the above requirements,
				- Install Node.js and npm from https://nodejs.org/en/download/ 
				- Navigate to "source code/static/" folder and find the package.json file.
				- package.json has all dependencies specified under "dependencies" and "devDependencies".
				- In "source code/static", run "npm install" in command prompt.
				- node_modules folder will be created with all downloaded dependencies.
			
		Initial Data Load:
			Perform the same steps from "Installation -> Initial Data Load Section"

		Build App:	
			- Run "npm run watch" in "source code/static/" folder.
			- dist folder will be created which will have the js and css distributables.

		Start Server:
			- Navigate to "source code/server/".
			- Edit server.py. Locate the following line:
				cnx = mysql.connector.connect(user='', password='',database='lms',charset='utf8')
				- Enter your username and password. Save the file.
			- Run server.py using python
		
Web application access - http://localhost:5000/
			

