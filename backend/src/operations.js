const banco = require('./conexao.js')

const operations = {
    listProducts: function(cliente) {
        return banco.promise().query("Select * from produto")
    },
    updateProduct: function(produto, id) {
        return banco.promise().execute("update produto set nome=?, armazenamento=?, valor=?, foto=? where id=?", [produto.nome, produto.armazenamento, produto.valor, produto.foto, id])
    },
    saveProduct: function(produto) {
        return banco.promise().execute("insert into produto (nome, armazenamento, valor,foto) values (?,?,?,?)", [produto.nome, produto.armazenamento, produto.valor, produto.foto])
    },
    removeProduct: function(id) {
        return banco.promise().execute("delete from produto where id=?", [id])
    },
    saveUser: function(usuario) {
        return banco.promise().execute("insert into usuario (email, senha, nome) values (MD5(?),MD5(?),MD5(?))", [usuario.email, usuario.senha, usuario.nome])
    },
    login: function(usuario) {
        return banco.promise().execute("select * from usuario where (email=MD5(?) and senha=MD5(?))", [usuario.email, usuario.senha])
    }
}

module.exports = operations