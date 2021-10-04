export class Event{
  constructor(
    public _id: String,
    public nombre:String,
    public title: string, //Descripcion
    public start: string,
    public end: string,
    public cantidadAsist: String,
    public estado: String,
    public idResponsable: {
      usuario: String;
    },
    public idSala: {
      nombre: String;
    },
    public fechaDeGestion: String
  ){}
}
