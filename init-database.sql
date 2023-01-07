CREATE TABLE IF NOT EXISTS TipoPagamento
(
    id   SERIAL PRIMARY KEY,
    tipo VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Categoria
(
    id        SERIAL PRIMARY KEY,
    nome      VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Despesa
(
    id              SERIAL PRIMARY KEY,
    valor           NUMERIC(10, 2) NOT NULL,
    dataCompra      DATE           NOT NULL,
    descricao       VARCHAR(255)   NOT NULL,
    idTipoPagamento INTEGER        NOT NULL,
    idCategoria     INTEGER        NOT NULL,
    CEP             VARCHAR(255)   NOT NULL,
    logradouro      VARCHAR(255),
    numero          VARCHAR(255),
    complemento     VARCHAR(255),
    bairro          VARCHAR(255),
    cidade          VARCHAR(255),
    estado          VARCHAR(255),
    FOREIGN KEY (idTipoPagamento) REFERENCES TipoPagamento (id),
    FOREIGN KEY (idCategoria) REFERENCES Categoria (id)
);

INSERT INTO TipoPagamento (tipo)
VALUES ('Dinheiro'),
       ('Débito'),
       ('Crédito'),
       ('Pix')
ON CONFLICT DO NOTHING;