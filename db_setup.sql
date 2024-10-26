CREATE DATABASE rules_db;

USE rules_db;

CREATE TABLE rules (
    id INT NOT NULL AUTO_INCREMENT,
    rule_text TEXT NOT NULL,
    PRIMARY KEY (id)
);
