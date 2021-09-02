import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sala } from 'src/app/modelos/sala.modelo';
import { SalaService } from 'src/app/servicios/sala.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TipoSalaService } from 'src/app/servicios/tipoSala.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.scss'],
  providers: [SalaService, UsuarioService,TipoSalaService],
})

export class SalaComponent implements OnInit {
  public identidad;
  public token;
  public tipos;
  public salasModelGet;
  public salasModelAdd: Sala;
  public salasModelGetId: Sala;
  public idSalaModel: Sala;

  constructor(

    public _salaService: SalaService,
    public _usuarioService: UsuarioService,
    public _tipoSalaService:TipoSalaService,
    private _router: Router

  ) {

    this.token = this._usuarioService.getToken();
    this.identidad = this._usuarioService.getIdentidad();
    this.salasModelGetId = new Sala("","","","","","","","","");
    this.salasModelAdd = new Sala("","","","","","","","","");
    this.idSalaModel = new Sala("","","","","","","","","");
   }

  ngOnInit(): void {
    this.obtenerSalas();
    this.obtenerTipoSalas();
  }

  obtenerSalas() {
    this._salaService.obtenerSalas(this.token).subscribe(
      (response) => {
        this.salasModelGet = response.salasEncontradas;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  obtenerTipoSalas() {
    this._tipoSalaService.obtenerTipoSalas().subscribe(
      (response) => {
        this.tipos = response.tipoSalasEncontrados;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }


  obtenerSala(idSala){
    this._salaService.obtenerSala(idSala).subscribe(
      response => {
        this.idSalaModel =response.salaEncontrada;
        console.log(response);
      }
    )
  }

  crearSala() {

    if(
      this.salasModelAdd.nombre===""||
      this.salasModelAdd.equipoDisponible===""||
      this.salasModelAdd.ubicacion===""||
      this.salasModelAdd.idTipoSala===""||
      this.salasModelAdd.imagenUno===""||
      this.salasModelAdd.imagenDos===""||
      this.salasModelAdd.imagenTres===""
      )

      {
      Swal.fire({
        /*position: 'top',*/
        icon: 'warning',
        title: 'Llene todos los campos',
        showConfirmButton: false,
        timer: 1500,
      });
    }else{

      this._salaService.crearSala(this.salasModelAdd, this.token).subscribe(
      response=>{

        this.salasModelAdd.nombre = '';
        this.salasModelAdd.equipoDisponible ='';
        this.salasModelAdd.ubicacion = '';
        this.salasModelAdd.idTipoSala ='';
        this.salasModelAdd.imagenUno ='';
        this.salasModelAdd.imagenDos ='';
        this.salasModelAdd.imagenTres ='';

        console.log(response);

        Swal.fire({
          /*position: 'top',*/
          icon: 'success',
          title: 'Sala creada correctamente',
          showConfirmButton: false,
          timer: 1500,
        });

        this.obtenerSalas()
      }
    );
    }
  }

  editarSala(){
        if(
          this.idSalaModel.nombre===""||
          this.idSalaModel.equipoDisponible===""||
          this.idSalaModel.ubicacion===""||
          this.idSalaModel.imagenUno===""||
          this.idSalaModel.imagenDos===""||
          this.idSalaModel.imagenTres===""
        )
        {
          Swal.fire({
            /*position: 'top',*/
            icon: 'warning',
            title: 'Llene todos los campos',
            showConfirmButton: false,
            timer: 1500,
          });
        }else{

      this._salaService.editarSala(this.idSalaModel).subscribe(
        response=>{
          console.log(response);

          Swal.fire({
            /*position: 'top',*/
            icon: 'success',
            title: 'Sala editada y actualizada correctamente',
            showConfirmButton: false,
            timer: 1500,
          });

          this.obtenerSalas();
        }
      )
    }
  }

  activarSala(idSala){
    this._salaService.activarSala(idSala).subscribe(
      response=>{
        console.log(response)
        //Refrescando
        this.obtenerSalas();
      }
    )
  }

  desactivarSala(idSala){
    this._salaService.desactivarSala(idSala).subscribe(
      response=>{
        console.log(response)
        //Refrescando
        this.obtenerSalas();
      }
    )
  }
}
