/* 
Instale as bibliotecas e o cliente de API:
npm init
npm i express
Procure pela extensão RapidAPI Client no VSCode.
*/
// Para executar a API no terminal: node index.js
// Link para testar a API: http://localhost:3000/rota
const express = require("express")
const app = express()
const port = 3000
app.use(express.json()) // configura API para usar JSON.
const fs = require('fs') // importa leitura e escrita de arquivos.

app.post("/famosos", (req, res) => {
    const famoso = req.body
    try{
    const famosos = JSON.parse(fs.readFileSync("famosos.json","utf8"))
    //adicionar famoso
    famosos.push(famoso)
    //salvar o arquivo
    fs.writeFileSync("famosos.json",JSON.stringify(famosos),"utf8")
    //resposta
    res.status(201).json({resposta:" Famoso cadastrado!"})
    }catch(erro){
        res.status(500).json({erro:erro.message})
    }

})
app.get("/famosos", (req, res) => {
    try {
        const famosos = JSON.parse(fs.readFileSync("famosos.json", "utf8"))
        res.status(200).json({resposta: famosos})
    } catch (erro) {
        res.status(500).json({erro: erro.message})
    }
})

app.get("/famosos/:id", (req, res) => {
    const id = req.params.id
    try {
        const famoso = JSON.parse(fs.readFileSync("famosos.json", "utf8"))
        const famosos= famosos.find((famosos) => famoso.id == id)
        if(!famoso) {
            return res.status(404).json({erro: "Famoso não existe no BD!"})
        }
        res.status(200).json({resposta: famoso})
    } catch (erro) {
        res.status(500).json({erro: erro.message})
    }
})

app.delete("/famosos/:id", (req, res) => {
    // pegar o id da rota
    const id = req.params.id
    try {
        // abrir o banco de dados
        const famosos = JSON.parse(fs.readFileSync("famosos.json", "utf8"))
        // encontrar o índice do famoso a ser excluido
        const indiceFamoso = famosos.findIndex((famosos) => famosos.id == id)
        // remover o indice da lista
        if (indiceFamoso == -1) {
            return res.status(404).json({erro: "O famoso não existe"})
        }
        famosos.splice(indiceFamoso, 1)
        // atualizar o arquivo
        fs.writeFileSync("famosos.json", JSON.stringify(famosos), "utf8")
        // dar uma resposta para o famoso
        res.status(200).json({resposta: "Famoso excluído com sucesso!"})
    } catch (error){
        res.status(500).json({erro: error.message})
    }
})

app.listen(port, ()=>{
    console.log("API rodando na porta" + port)
})

// GET http://localhost:3000/

// TESTAR TODAS AS ROTAS: post, get geral e get cpf!




// Execução da API:
