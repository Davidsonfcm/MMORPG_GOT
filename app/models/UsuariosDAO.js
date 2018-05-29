function UsuariosDAO(connection) {
	this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
	this._connection.then(function(connection) {
  		connection.collection('usuarios', function(err, collection){
  			collection.insert(usuario);
  		});
	});
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){

	this._connection.then(function(connection) {
		connection.collection('usuarios', function(err, collection){
			collection.find(usuario).toArray(function(err, result){
				if(result[0] != undefined){
					req.session.autorizado = true;
					req.session.usuario = result[0].usuario;
					req.session.casa = result[0].casa;
				}

				if(req.session.autorizado)
					res.redirect("jogo");
				else
					res.render("index", {validacao: {}});
			});
		});
		
	});
}

module.exports = function() {
	return UsuariosDAO;
}
