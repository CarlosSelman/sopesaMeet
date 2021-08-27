export class TipoSala{
  constructor(
    public _id: String,
    public nombre:String,
    public descripcion: String,
    public capacidadMax: Number,
    public estado: String
  ){}
}
