const banco = require('./conexao.js')

const operations = {
    listProducts: function() {
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
        return banco.promise().execute("insert into usuario (email, senha, nome, foto) values (MD5(?),MD5(?),?,?)", [usuario.email, usuario.senha, usuario.nome, usuario.foto])
    },
    login: function(usuario) {
        return banco.promise().execute("select * from usuario where (email=MD5(?) and senha=MD5(?))", [usuario.email, usuario.senha])
    },
    updateUser: function(usuario) {
        return banco.promise().execute("update usuario set email=MD5(?), foto=?, nome=? where email=MD5(?)", [usuario.email, usuario.foto, usuario.nome, usuario.email])
    },
    getUserByEmail: function(email) {
        return banco.promise().execute("select * from usuario where email=MD5(?)", [email])
    }
}

module.exports = operations