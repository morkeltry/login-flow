BEGIN;
  DROP TABLE IF EXISTS users
  CASCADE;

CREATE TABLE users
(
  username NOT NULL,
  salt VARCHAR(29) NOT NULL,
  hashedPw VARCHAR(59) NOT NULL,
  created INTEGER,
  lastLogin INTEGER
);

INSERT INTO users
VALUES ("admin", "$2b$10$HRhOrxQGexZuwq7V54NDq.", "$2b$10$HRhOrxQGexZuwq7V54NDq.yHpqk72c/TDf58vHABsKzpatAr0Z5Z6", 1, 1);

COMMIT;
