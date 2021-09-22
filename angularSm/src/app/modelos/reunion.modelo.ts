export class Reunion{
  constructor(
    public _id: String,
    public nombre:String,
    public descripcion: String,
    public start: String,
    public end: String,
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
