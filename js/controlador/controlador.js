/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(indice){
  	this.modelo.borrarPregunta(indice);
  },
  borrarTodo: function(){
  	this.modelo.borrarTodo();
  },
  editarPregunta: function(indice, pregunta){
  	this.modelo.editarPregunta(indice, pregunta);
  },
  agregarVoto: function(pregunta,respuestaSelecionada){
    this.modelo.agregarVoto(pregunta,respuestaSelecionada);
  }
};
