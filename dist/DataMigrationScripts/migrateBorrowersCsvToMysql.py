import mysql.connector
import csv

#enter your username and password
cnx = mysql.connector.connect(user='', password='',database='LMS',charset='utf8')
cursor = cnx.cursor(prepared=True)

with open('borrowers.csv') as csvfile:
	readCSV = csv.reader(csvfile, delimiter=',')	
	for row in readCSV:
		query = 'Insert into borrower(card_id,ssn,bname,address,phone) values(%s,%s,%s,%s,%s)'
		ssn = ''.join(row[1].split()).replace('-','').replace('(','').replace(')','')
		name = row[2] + ' ' + row[3]
		address = row[5] + ',' + row[6] + ',' + row[7]
		phone = ''.join(row[8].split()).replace('-','').replace('(','').replace(')','')
		cursor.execute(query,(row[0],ssn,name,address,phone))
		
cnx.commit()
cursor.close()
cnx.close()
			
			
	
