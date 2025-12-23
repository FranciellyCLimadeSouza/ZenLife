CREATE TABLE Usuarios (
  id INT IDENTITY(1,1) PRIMARY KEY,
  nomeCompleto NVARCHAR(120) NOT NULL,
  dataNascimento DATE NOT NULL,
  endereco NVARCHAR(255) NOT NULL,
  cpf CHAR(11) NOT NULL UNIQUE,
  email NVARCHAR(120) NOT NULL UNIQUE,
  senhaHash NVARCHAR(255) NOT NULL,
  papel NVARCHAR(20) NOT NULL DEFAULT 'usuario', -- 'usuario' ou 'admin'
  criadoEm DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

CREATE TABLE Agendamentos (
  id INT IDENTITY(1,1) PRIMARY KEY,
  usuarioId INT NOT NULL FOREIGN KEY REFERENCES Usuarios(id),
  dataHora DATETIME2 NOT NULL,
  status NVARCHAR(20) NOT NULL DEFAULT 'pendente', -- pendente, aceito, confirmado, cancelado
  descricao NVARCHAR(255) NULL,
  criadoEm DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

-- Usuário admin inicial
INSERT INTO Usuarios (nomeCompleto, dataNascimento, endereco, cpf, email, senhaHash, papel)
VALUES ('Administrador', '1990-01-01', 'Endereço Admin', '00000000000', 'admin@zenlife.com',
        'REPLACE_WITH_HASH', 'admin');