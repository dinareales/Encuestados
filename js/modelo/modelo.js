/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasEditadas = new Evento(this);
  this.votoAgregado = new Evento(this);
  this.traer(); //inicializo el evento que contiene los datos
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if (this.preguntas.length===0) {
      return 0;
    } else{
      var ultimaPregunta = this.preguntas[this.preguntas.length -1];
      return ultimaPregunta.id;
    }
  },
  
  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('Preguntas',JSON.stringify(this.preguntas));
  },

  traer: function(){
    var string_de_preguntas = localStorage.getItem('Preguntas')
    if ( string_de_preguntas !== null) {
      this.preguntas = JSON.parse(string_de_preguntas);
    }
  },

  //se borran las preguntas
  borrarPregunta: function(indice){
    this.preguntas.splice(indice,1);
    this.guardar ();
    this.preguntaEliminada.notificar();
  },

  //se borran todas las preguntas con sus respuestas
  borrarTodo: function(){
    this.preguntas = [];
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  //edita las preguntas
  editarPregunta: function(indice, nuevaPregunta){
    this.preguntas[indice].textoPregunta = nuevaPregunta;
    this.guardar();
    this.preguntasEditadas.notificar();
  },

  //suma un voto a las respuestas
  agregarVoto: function(pregunta, respuestaSelecionada){
    this.preguntas.forEach(elemento =>{
      if (elemento.textoPregunta === pregunta) {
        elemento.cantidadPorRespuesta.forEach(elemento2 =>{
          if (respuestaSelecionada=== elemento2.textoRespuesta) {
            elemento2.cantidad++;
          }
        })
      }
    });
    this.guardar();
    this.votoAgregado.notificar();
  },
};
