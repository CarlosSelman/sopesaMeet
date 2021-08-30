import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoSala } from 'src/app/modelos/tipoSala.modelo';
import { TipoSalaService } from 'src/app/servicios/tipoSala.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-tipo-sala',
  templateUrl: './tipo-sala.component.html',
  styleUrls: ['./tipo-sala.component.scss'],
  providers: [TipoSalaService, UsuarioService]
})
export class TipoSalaComponent implements OnInit {
  public identidad;
  public token;
  public tiposModelGet;
  public tiposModelAdd: TipoSala;
  public tiposModelGetId: TipoSala;

  constructor(
    private _tipoSalaService: TipoSalaService,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.identidad = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();
    this.tiposModelAdd = new TipoSala("","","",0,"");
   }

  ngOnInit(): void {
    this.obtenerTipoSalas();
  }

  obtenerTipoSalas() {
    this._tipoSalaService.obtenerTipoSalas().subscribe(
      (response) => {
        this.tiposModelGet = response.tipoSalasEncontrados;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  obtenerTipoSala(idTipoSala){
    this._tipoSalaService.obtenerTipoSala(this.token, idTipoSala).subscribe(
      response => {
        this.tiposModelGetId =response.tipoSalaEncontrado;
        console.log(response);
      }
    )
  }

   //Crear los tipos de salas
   crearTipoSala(){
    //Validación
      if(
        this.tiposModelAdd.nombre===""||
        this.tiposModelAdd.descripcion===""){
        //Alerta para que se llenen todos los campos
        Swal.fire({
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }else{
      console.log(this.tiposModelAdd)

      this._tipoSalaService.crearTipoSala(this.tiposModelAdd, this.token).subscribe(
        response=>{
          console.log(response);
          //Alerta de que se creó correctamente el usuario
          Swal.fire({
            icon: 'success',
            title: 'Tipo de Sala creada correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          //Limpiando los campos luego de la creación
          this.tiposModelAdd.nombre = '';
          this.tiposModelAdd.descripcion ='';
          this.tiposModelAdd.capacidadMax = null;
          //Refrescando la ventana
          this.obtenerTipoSalas()
        },
        (error) => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: 'No se pudo crear el tipo de sala',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      )
    }

  }

}
