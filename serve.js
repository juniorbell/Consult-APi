const express = require('express'); // Efetua a criação de um servidor HTTP com rotas.
const axios = require('axios'); // Faz a requisição da API

const app = express();
const PORT = 3000; 

app.get('/aqui/sua_rota', async (req, res) => {
  try {
    // Recebe os parâmetros para efetuar a consulta e retorna os dados.
    const searchQuery = req.query.search || ''; 
    const limit = req.query.limit || 10; 
    
    // Endpoint da API na qual deseja efetuar a consulta
    const sua_api = `https://api.sua_api.br/consult/event.json?search=${searchQuery}&limit=${limit}`; 

    // Faz a requisição à API 
    const response = await axios.get(sua_api);
    
    // Retorna os dados recebidos da API
    res.json(response.data);
  } catch (error) {
    // Trata possíveis erros e envia uma resposta com o erro
    // Aqui verifica se o erro é de sua rede (Não consegue a conexão)
   if (error.code === 'ENOTFOUNF' || error.code === 'ECONNREFUSED') {
    res.status(503).json({ MessageEvent: 'Não foi possível conectar à api {{sua_api}}. Favor verificar sua conexão e tente novamente.'});
   } else if (error.response) {
    //Aqui verifica erros de resposta da API que deseja efetuar a consulta, tais como: 404 ou 500
        res.status (erro.response.status).json ({
            MessageEvent: `Erro na API OpenFDA: ${error.response.statusText}`,
            detail: error.response.data
        });
    } else {
        //Aqui outro tipo de erro.
        res.status(500).json({MessageEvent: 'Ocorreu um erro interno ao tentar acessar os dados API'})
    }
} 
  });

// Inicia o servidor na porta definida na linha 5
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
