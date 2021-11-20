INSERT INTO departments (name)
VALUES
("development"),
("finance");

INSERT INTO roles (title, salary, department_id)
VALUES
("coder", 80000, 1),
("accountant", 60000, 2),
("ux designer", 60000, 2);

INSERT INTO employees (first_name, last_name, role_id, department_id)
VALUES
("bob","rogers",1,1),
("rick","grimes",2,2),
("phillip","gallagher",3,1);