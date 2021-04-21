DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;





CREATE TABLE employee (
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
PRIMARY KEY (id)
);

CREATE TABLE department (
employee_id INT AUTO_INCREMENT NOT NULL,
id INT,
name VARCHAR(30),
PRIMARY KEY (id),
FOREIGN KEY (employee_id) REFERENCES employee(id)
);

CREATE TABLE role (
employee_id INT AUTO_INCREMENT NOT NULL,
id INT,
title VARCHAR(30),
salary DECIMAL,
department_id int,
PRIMARY KEY (id),
FOREIGN KEY (employee_id) REFERENCES employee(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;