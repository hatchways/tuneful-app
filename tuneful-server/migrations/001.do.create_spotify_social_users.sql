DROP TABLE IF EXISTS user_accounts;

CREATE TABLE user_accounts (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR (355) NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  refresh_token VARCHAR,
  description VARCHAR,
  date_created TIMESTAMP NOT NULL DEFAULT now()
);