DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(50) NOT NULL,
salary INTEGER NOT NULL,
department_id INTEGER,
CONSTRAINT fk_department1 FOREIGN KEY (department_id) REFERENCES departments(id) 

);

CREATE TABLE employees (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  department_id INTEGER,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id),
  CONSTRAINT fk_department2 FOREIGN KEY (department_id) REFERENCES departments(id)
);