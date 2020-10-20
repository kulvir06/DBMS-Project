create table Admin(
  username varchar(12) not NULL,
  password varchar(20) not NULL,
  coaching_code int not NULL,
  PRIMARY key (username));
  
create table Student(
  username varchar(12) not NULL,
  password varchar(20) not NULL,
  coaching_code int not NULL,
  gender varchar(1) not NULL check (gender = "M" or gender = "F" or gender = "T"),
  address varchar(255) not NULL,
  first_name varchar(30) Not NULL,
  last_name varchar(30) not NULL,
  DOB date not NULL,
  contact varchar(10)  not NULL UNIQUE,
  primary key (username));

create table Parent(
  username varchar(12) not NULL,
  password varchar(20) not NULL,
  first_name varchar(30) Not NULL,
  last_name varchar(30) not NULL,
  address varchar(255) not NULL,
  contact varchar(10)  not NULL UNIQUE,
  student_username varchar(12) not NULL UNIQUE,
  primary key (username));
  
Create table Teacher(
  username varchar(12) not NULL,
  password varchar(20) not NULL,
  first_name varchar(30) Not NULL,
  last_name varchar(30) not NULL,
  address varchar(255) not NULL,
  contact varchar(10)  not NULL UNIQUE, 
  subject varchar(15) not NULL,
  salary int not NULL,
  gender varchar(1) not NULL check (gender = "M" or gender = "F" or gender = "T"),
  coaching_code int not NULL,  
  primary key (username)
);

create table coaching(
  coaching_code int not null,
  city varchar(40) not null,
  contact varchar(10) not null UNIQUE,
  coaching_name varchar(60) not null,
  address varchar(255) not null,
  PRIMARY key (coaching_code)
);

create table Marks(
  student_username varchar(12) not NULL ,
  physics int ,
  mathematics int ,
  chemistry int ,
  biology int
  --additional coloumn addded check end of code*** 
);


create table Physics(
  Sno int not null,
  chapter varchar(50) not null,
  book varchar(255) not null,
  coaching_code int not NULL,
  PRIMARY key (Sno)
);
create table Chemistry(
  Sno int not null,
  chapter varchar(50) not null,
  book varchar(255) not null,
  coaching_code int not NULL,
  PRIMARY key (Sno)
);
create table Mathematics(
  Sno int not null,
  chapter varchar(50) not null,
  book varchar(255) not null,
  coaching_code int not NULL,
  PRIMARY key (Sno)
);
create table Biology(
  Sno int not null,
  chapter varchar(50) not null,
  book varchar(255) not null,
  coaching_code int not NULL,
  PRIMARY key (Sno)
);

--MARKS TABLE HAS BEEN ALTERED AS TEST NUMBER WAS REQUIRED