function UsuariosDAO(connection) {
	this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
	this._connection.then(function(connection) {
  		connection.collection('usuarios', function(err, collection){
  			collection.insert(usuario);
  		});
  		connection.close();
	});
}

module.exports = function() {
	return UsuariosDAO;
}
