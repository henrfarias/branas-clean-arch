ALTER SCHEMA public RENAME TO template;

CREATE TABLE template.orders (
  id serial,
  coupon text,
  code text,
  cpf text,
  issue_date timestamp,
  freight numeric,
  sequence integer,
  primary key (id)
);

CREATE TABLE template.items (
  id serial,
  category text,
  description text,
  price numeric,
  width integer,
  height integer,
  length integer,
  weight integer,
  primary key (id)
);

INSERT INTO template.items (category, description, price, width, height, length, weight) values ('Instrumentos Musicais', 'Guitarra', 1000, 100, 50, 15, 3);
INSERT INTO template.items (category, description, price, width, height, length, weight) values ('Instrumentos Musicais', 'Amplificador', 5000, 50, 50, 50, 22);
INSERT INTO template.items (category, description, price, width, height, length, weight) values ('Acessórios', 'Cabo', 30, 10, 10, 10, 1);

CREATE TABLE template.coupons (
  code text,
	percentage numeric,
	expire_date timestamp,
	primary key (code)
);

INSERT INTO template.coupons (code, percentage, expire_date) values ('VALE20', 20, '2021-10-10T10:00:00');

CREATE TABLE template.order_items (
  id_order integer,
	id_item integer,
	price numeric,
	quantity integer,
	primary key (id_order, id_item)
);

CREATE SCHEMA project;

CREATE TABLE project.orders (
  id serial,
  coupon text,
  code text,
  cpf text,
  issue_date timestamp,
  freight numeric,
  sequence integer,
  primary key (id)
);

CREATE TABLE project.products (
  id serial,
  name text,
  price numeric,
  description text,
  width integer,
  height integer,
  length integer,
  weight integer,
  primary key (id)
);

INSERT INTO project.products (name, price, description, width, height, length, weight) values ('lápis', 2, 'Faber-castell', 10, 15, 20, 1);
INSERT INTO project.products (name, price, description, width, height, length, weight) values ('caneta', 3.7, 'Pilot', 10, 30, 100, 3);
INSERT INTO project.products (name, price, description, width, height, length, weight) values ('caderno', 20, 'Tilibra', 50, 100, 200, 40);

CREATE TABLE project.coupons (
  code text,
	percentage numeric,
	expire_date timestamp,
	primary key (code)
);

INSERT INTO project.coupons (code, percentage, expire_date) values ('VALE20', 20, '2021-10-10T10:00:00');

CREATE TABLE project.order_items (
  id_order integer,
	id_item integer,
	price numeric,
	quantity integer,
	primary key (id_order, id_item)
);
