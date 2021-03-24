
\c docker;

CREATE TABLE IF NOT EXISTS "Requests"
(
    requestid SERIAL PRIMARY KEY,
    name character varying(80) COLLATE pg_catalog."default" NOT NULL,
    description character varying(120) COLLATE pg_catalog."default" NOT NULL,
    status character varying(25) COLLATE pg_catalog."default",
    createdby character varying(25) COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    updated boolean,
    CONSTRAINT "Requests_pkey" PRIMARY KEY (requestid)
)


