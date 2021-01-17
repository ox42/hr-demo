CREATE TABLE Account
(
    id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    token      VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (email)
);

CREATE TABLE Department
(
    id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Employee
(
    id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(255) NOT NULL,
    email         VARCHAR(255) NOT NULL,
    salary        BIGINT UNSIGNED NOT NULL,
    department_id BIGINT UNSIGNED NOT NULL,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES Department (id) ON DELETE CASCADE,
    UNIQUE (email)
);


-- ADD Accounts
INSERT INTO Account(name, email, password)
VALUES ("Olga Karatsoli", "olga@chessable.com", "$2y$12$U727RljxAi7bGsfZDKd/P.uOLtpUJ3ni6ASxbwmvs.FU6Jpr8ZFte");

INSERT INTO Account(name, email, password)
VALUES ("Administrator", "admin@chessable.com", "$2y$12$lEfeaw7Apq43DAEt1RBG5.oZy1t5ozKLFL7vLxYEKJFk4hIBgEGwa");


-- ADD Departments
INSERT INTO Department(name)
VALUES ("Human Resources");

INSERT INTO Department(name)
VALUES ("Software Development");

INSERT INTO Department(name)
VALUES ("Quality Assurance");


-- ADD Employees
INSERT INTO Employee(name, email, salary, department_id)
VALUES ('John Smith', 'john.smith@chessable.com', 30000, (SELECT id from Department where name = "Human Resources"));

INSERT INTO Employee(name, email, salary, department_id)
VALUES ('Olga Karatsoli', 'olga@chessable.com', 60000, (SELECT id from Department where name = "Human Resources"));

INSERT INTO Employee(name, email, salary, department_id)
VALUES ('Joe Biden', 'joe@chessable.com', 54000, (SELECT id from Department where name = "Human Resources"));



INSERT INTO Employee(name, email, salary, department_id)
VALUES ('Mark Jackson', 'mark.jackson@chessable.com', 70000, (SELECT id from Department where name = "Human Resources"));



INSERT INTO Employee(name, email, salary, department_id)
VALUES ('Mark Lopez', 'mark@chessable.com', 60000, (SELECT id from Department where name = "Software Development"));

INSERT INTO Employee(name, email, salary, department_id)
VALUES ('Boyan Kostadinov', 'boyan.kostadinov@chessable.com', 60000, (SELECT id from Department where name = "Software Development"));

INSERT INTO Employee(name, email, salary, department_id)
VALUES ('Test Testerovsky', 'qa@chessable.com', 50000, (SELECT id from Department where name = "Quality Assurance"));
