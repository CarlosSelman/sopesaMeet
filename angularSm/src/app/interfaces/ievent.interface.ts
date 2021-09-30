export interface IEvent {
   _id: String,
   nombre:String,
   title: String, //Descripcion
   start: String,
   end: String,
   cantidadAsist: String,
   estado: String,
   idResponsable: {
    usuario: String;
  },
   idSala: {
    nombre: String;
  },
   fechaDeGestion: String
}
