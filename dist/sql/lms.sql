DROP DATABASE IF EXISTS LMS;
CREATE DATABASE LMS;
USE LMS;
CREATE TABLE BOOK(Isbn VARCHAR(10) primary key, Title VARCHAR(1000) not null, isCheckedOut boolean);
CREATE TABLE AUTHORS(Author_id INT UNSIGNED primary key, Name VARCHAR(100));
CREATE TABLE BOOK_AUTHORS(Isbn VARCHAR(10),Author_id INT UNSIGNED  ,primary key(Author_id,Isbn),FOREIGN KEY(Author_id) references AUTHORS(Author_id),FOREIGN KEY(Isbn) references BOOK(Isbn));

CREATE TABLE BORROWER(Card_id VARCHAR(10) primary key ,Ssn varchar(9) NOT NULL unique, Bname VARCHAR(100) NOT NULL,Address VARCHAR(1000) NOT NULL,Phone varchar(10));

CREATE TABLE BOOK_LOANS(Loan_id INT unsigned AUTO_INCREMENT primary key,Isbn VARCHAR(10) ,Card_id VARCHAR(10) ,Date_out datetime, Due_date datetime,Date_in datetime,FOREIGN KEY(Isbn) references BOOK(Isbn),FOREIGN KEY(card_id) references BORROWER(Card_id));
 
CREATE TABLE FINES(Loan_id INT unsigned primary key , Fine_amt DOUBLE, Paid boolean,FOREIGN KEY(Loan_id) references BOOK_LOANS(Loan_id));