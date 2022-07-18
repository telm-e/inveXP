DROP SCHEMA IF EXISTS Invexp;
CREATE SCHEMA IF NOT EXISTS Invexp;

CREATE TABLE Invexp.Assets (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  price decimal(10,2) NOT NULL,
  available INTEGER NOT NULL
);

CREATE TABLE Invexp.Clients (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE Invexp.Accounts (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  clientId INTEGER,
  balance DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (clientId) REFERENCES Invexp.Clients (id)
);

CREATE TABLE Invexp.Types (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE Invexp.AccountTransactions (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  date datetime,
  clientId INTEGER,
  typeId INTEGER,
  previousBalance DECIMAL(10,2),
  amount DECIMAL(10,2),
  newBalance DECIMAL(10,2),
  FOREIGN KEY (clientId) REFERENCES Invexp.Accounts (clientId),
  FOREIGN KEY (typeId) REFERENCES Invexp.Types (id)
);

CREATE TABLE Invexp.WalletTransactions (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  date datetime,
  clientId INTEGER,
  typeId INTEGER,
  assetId INTEGER,
  previousBalance INTEGER,
  amount INTEGER,
  newBalance INTEGER,
  FOREIGN KEY (clientId) REFERENCES Invexp.Accounts (clientId),
  FOREIGN KEY (assetId) REFERENCES Invexp.Assets (id),
  FOREIGN KEY (typeId) REFERENCES Invexp.Types (id)
);

INSERT INTO
  Invexp.Assets (name, price, available)
VALUES
  ("VALE3", 68.30, 2000),
  ("PETR4", 27.98, 1000),
  ("ITUB", 22.38, 698),
  ("B3SA3", 10.03, 675),
  ("ABEV3", 14.58, 371);

INSERT INTO
  Invexp.Clients (email, password)
VALUES
  ("donnaharaway@fake.com", "cyborg"),
  ("isabelle_stengers@fake.com", "catastrophes"),
  ("bell_thehooks@fake.com", "community"),
  ("puig_bellacasa@fake.com", "care");

INSERT INTO
  Invexp.Types (description)
VALUES
  ("Débito/Compra"),
  ("Crédito/Venda");

INSERT INTO
  Invexp.Accounts (clientId, balance)
VALUES
  (1, 7000),
  (2, 3000),
  (3, 10000),
  (4, 20);
  
INSERT INTO
  Invexp.AccountTransactions (date, clientId, typeId, previousBalance, amount, newBalance)
VALUES
  ('2022-07-03 15:34:25', 1, 1, 7300, 300, 7000),
  ('2022-07-04 10:09:56', 2, 2, 3300, 700, 4000),
  ('2022-07-04 11:43:52', 4, 1, 5200, 500, 20),
  ('2022-07-07 23:21:12', 2, 1, 4003, 1003, 3000),
  ('2022-07-10 13:12:21', 3, 2, 9658.50, 341.50, 10000);
  
  INSERT INTO
  Invexp.WalletTransactions (date, clientId, typeId, assetId, previousBalance, amount, newBalance)
VALUES
  ('2022-07-07 23:21:12', 2, 1, 4, 0, 100, 100),
  ('2022-07-10 13:12:21', 3, 2, 1, 20, 5, 15);