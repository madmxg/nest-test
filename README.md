## Description

Nest-test is the Nest.js application, which send http request and cache results.

## Requirements

- Node.js v18+.
- PostgreSQL v15+.

## Usage

### Build app

```bash
npm run build
```

### Run app

```bash
node run start:prod
```

## SQL DDL

```sql
-- DROP TYPE public.action_enum;
CREATE TYPE public.action_enum AS ENUM (
	'deposit',
	'withdraw');

-- public.users definition
CREATE TABLE public.users (
	id serial4 NOT NULL,
	balance numeric(10, 2) NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- public.events definition
CREATE TABLE public.events (
	id serial4 NOT NULL,
	user_id int4 NOT NULL,
	"action" public.action_enum NOT NULL,
	amount numeric(10, 2) NOT NULL,
	ts timestamp NOT NULL DEFAULT now(),
	CONSTRAINT events_pkey PRIMARY KEY (id)
);

-- public.events foreign keys
ALTER TABLE public.events ADD CONSTRAINT events_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
```
