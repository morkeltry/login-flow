BEGIN;
  DROP TABLE IF EXISTS users
  CASCADE;

CREATE TABLE users
(
  username VARCHAR(35) PRIMARY KEY,
  salt VARCHAR(29) NOT NULL,
  hashedPw VARCHAR(60) NOT NULL,
  created BIGINT,
  lastLogin BIGINT
);

INSERT INTO users
VALUES ('admin', '$2b$10$HRhOrxQGexZuwq7V54NDq.', '$2b$10$HRhOrxQGexZuwq7V54NDq.yHpqk72c/TDf58vHABsKzpatAr0Z5Z6', 1, 1);

COMMIT;
