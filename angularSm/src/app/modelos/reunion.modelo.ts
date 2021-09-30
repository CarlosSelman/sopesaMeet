export class Reunion{
  constructor(
    public _id: String,
    public nombre:String,
    public title: string, //Descripcion
    public start: Date,
    public end: Date,
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
