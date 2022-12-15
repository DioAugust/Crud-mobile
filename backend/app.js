// Externos
const express = require('express')
const cors = require('cors')
// Internos
const operations = require('./src/operations.js');
require('dotenv').config()

const app = express()
app.use(cors())

// Iniciando servidor
app.listen(process.env.PORT, () => {
    console.log(`Server rodando na porta ${process.env.PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Login usuario
app.post('/usuarios/login', (req, res) => {
    return operations.login(req.body)
    .then(([ rows ]) => {
        console.log(rows)
        if(rows.length > 0) {
        res.status(204)
        res.end()
        } else {
            res.status(401)
            res.end()
        }
    })
    .catch(function (error) {
        console.log(error)
      })
})

// Pega o id do usuario
app.get('/usuario/:email', (req, res) => {
    return operations.getId(req.params.email)
    .then(([ rows ]) => {
        console.log(rows[0])
        res.send(rows[0])
        res.end()
    })
    .catch((err) => {
        console.log(err)
    })
})

app.get('/usuario/dados/:id', (req, res) => {
    console.log(req.params.id)
    return operations.user(req.params.id)
    .then(([ rows ]) => {
        console.log(rows)
        res.send(rows)
        res.end()
    })
    .catch((err) => {
        console.log(err)
    })
})


// Cadastro usuario
app.post('/usuarios/cadastro', (req, res) => {
    return operations.saveUser(req.body)
    .then(([ rows ]) => {
        res.status(201)
        res.end()
    })
    .catch((err) => {
        console.log(err)
    })

})
// Listar produtos
app.get('/produtos', (req, res) => {
    return operations.listProducts()
    .then(([ rows ]) => {
        res.send(rows)
        res.end()
    })
    .catch((err) => {
        console.log(err)
    })
})

// Cadastro de produtos
app.post('/produtos/cadastro', (req, res) => {
    return operations.saveProduct(req.body)
    .then(([ rows ]) => {
        res.status(201)
        res.end()
    })
    .catch((err) => {
        console.log(err)
    })

})
// Alterar produto
app.put('/produtos/:id', (req, res) => {
    return operations.updateProduct(req.body, req.params.id)
    .then(([ rows ]) => {
        res.status(204)
        res.end()
    })
    .catch((err) => {
        console.log(err)
    })
})
// Deletar produto
app.delete('/produtos/:id', (req, res) => {
        return operations.removeProduct(req.params.id)
        .then( () => {
            res.status(204)
            res.end()
        })
        .catch((err) => {
            console.log(err)
        })
    })
