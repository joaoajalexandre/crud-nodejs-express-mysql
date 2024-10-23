const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/connection');

const app = express();
app.use(bodyParser.json());

// CREATE - Adiciona um novo usuário no banco de dados
app.post('/usuarios', (req, res) => {
  const { nome, email, passe } = req.body;
  const sql = 'INSERT INTO tbusuario (nome, email, passe) VALUES (?, ?, ?)';
  
  connection.query(sql, [nome, email, passe], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao inserir usuário.');
    }
    res.status(201).send('Usuário criado com sucesso.');
  });
});

// READ - Obtém todos os usuários do banco de dados
app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM tbusuario';
  
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar usuários.');
    }
    res.json(results);
  });
});

// READ - Obtém um usuário por ID
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM tbusuario WHERE id = ?';
  
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar o usuário.');
    }
    if (results.length === 0) {
      return res.status(404).send('Usuário não encontrado.');
    }
    res.json(results[0]);
  });
});

// UPDATE - Atualiza um usuário por ID
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, passe } = req.body;
  const sql = 'UPDATE tbusuario SET nome = ?, email = ?, passe = ? WHERE id = ?';
  
  connection.query(sql, [nome, email, passe, id], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao atualizar o usuário.');
    }
    res.send('Usuário atualizado com sucesso.');
  });
});

// DELETE - Remove um usuário por ID
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tbusuario WHERE id = ?';
  
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao remover o usuário.');
    }
    res.send('Usuário removido com sucesso.');
  });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});