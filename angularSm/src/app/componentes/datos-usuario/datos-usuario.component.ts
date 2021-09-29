//IMPORTACIÓN DE MODELOS
import { Usuario } from 'src/app/modelos/usuario.modelo';
import { Reunion } from 'src/app/modelos/reunion.modelo';
import { Sala } from 'src/app/modelos/sala.modelo';

//IMPORTACIÓN DE SERVICIOS
import { SalaService } from 'src/app/servicios/sala.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ReunionService } from 'src/app/servicios/reunion.service';
import { TipoSalaService } from 'src/app/servicios/tipoSala.service';

//IMPORTACIONES PARA LA SECCIÓN DE LA TABLA (CON ANGULAR MATERIAL)
import { AfterViewInit,Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//IMPORTACIÓN PARA ALERTAS
import Swal from 'sweetalert2';

//OTRA IMPORTACIÓN
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.scss'],
  providers: [UsuarioService,ReunionService]
})
export class DatosUsuarioComponent implements AfterViewInit {
  public identidad;

  displayedColumns: string[] = ['title','estado','cantidadAsist','start','end','acciones'];
  dataSource = new MatTableDataSource<any[]>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumnsD: string[] = ['title','estado','cantidadAsist','start','end','acciones'];
  dataSourceD = new MatTableDataSource<any[]>();

  public usuariosModelGet;
  public token;
  public usuarios;
  public user: Usuario;
  public usuarioModel;
  public idUsuarioModel: Usuario;
  public idUsuarioRuta: string;
  public idReunionModel: Reunion;

  constructor(

    public _usuarioService: UsuarioService,
    public _reunionService: ReunionService,
    public _salaService: SalaService,
    public _tipoSalaService:TipoSalaService,
    public _activatedRoute: ActivatedRoute,
   /* private fb: FormBuilder,*/
    private _router: Router
    ) {
    this.identidad = this._usuarioService.getIdentidad();

    this.user = new Usuario("","","","","","","","","");
    this.idUsuarioModel = new Usuario("","","","","","","","","");
    this.token = this._usuarioService.getToken();
    this.usuarioModel = new Usuario("","","","","","","","","");
    this.idReunionModel = new Reunion("","","","","","","",{usuario:""},{nombre:""},"");

/*
    this._reunionService.obtenerReunionesUsuario(this.identidad).subscribe ( usuarios => {
      this.dataSource.data = usuarios;
    })
*/

    this._usuarioService.obtenerUsuariosD().subscribe ( usuarios => {
      this.dataSource.data = usuarios;
    })
   }


   ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idUsuarioRuta = dataRuta.get('idResponsable');
    });
    this.obtenerReunionesUsuario(this.idUsuarioRuta);
  }

  obtenerUsuario(idUsuario){
    this._usuarioService.obtenerUsuarioId(idUsuario).subscribe(
      response => {
        this.usuarioModel =response.salaEncontrada;
        console.log(response);
      }
    )
  }

  //Obteniendo los usuarios activos

  obtenerReunionesUsuario(idUsuarioRuta){

    this._reunionService.obtenerReunionesUsuario(idUsuarioRuta).subscribe(
      response => {
         this.dataSource.data = response.reunionesObtenidas;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //Obteniendo los usuarios desactivados
  obtenerUsuariosD(){
    this._usuarioService.obtenerUsuariosD().subscribe(
      response => {
         this.dataSourceD.data = response.usuariosEncontrados;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerUsuarioId(idUsuario:String){
    this._usuarioService.obtenerUsuarioId(idUsuario).subscribe(
      response=>{
        this.idUsuarioModel = response.usuarioEncontrado;
        console.log(response);

      }
    )
  }

  activarUsuario(idUsuario){
    this._usuarioService.activarUsuario(idUsuario).subscribe(
      response=>{
        console.log(response)
        //Refrescando la ventana
        this.refresh();
      }
    )
  }

  desactivarUsuario(idUsuario){
    this._usuarioService.desactivarUsuario(idUsuario).subscribe(
      response=>{
        console.log(response)
        //Refrescando la ventana
        this.refresh();
      }
    )
  }

  obtenerReunion(idReunion:String){
    this._reunionService.obtenerReunion(idReunion).subscribe(
      response=>{
        this.idReunionModel = response.reunionEncontrada;
        console.log(response);

      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  //Filtro tabla de usuarios activos
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Crear los usuarios
  crearUsuarios(){
    //Validación
      if(
        this.user.nombres===""||
        this.user.apellidos===""||
        this.user.usuario===""||
        this.user.tel===""||
        this.user.correo===""||
        this.user.contrasena===""){
        //Alerta para que se llenen todos los campos
        Swal.fire({
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }else{
      console.log(this.user)

      this._usuarioService.crearUsuario(this.user).subscribe(
        response=>{
          console.log(response);
          //Alerta de que se creó correctamente el usuario
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          //Limpiando los campos luego de la creación
          this.user.nombres ='';
          this.user.apellidos ='';
          this.user.correo ='';
          this.user.usuario ='';
          this.user.contrasena ='';
          this.user.tel ='';
          //Refrescando la ventana
          this.refresh();
          //this._router.navigate(['/usuarios'])
        },
        (error) => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: 'No se pudo crear el usuario',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      )
    }

  }

  editarUsuario(){
    //Validación
      if(
        this.idUsuarioModel.nombres===""||
        this.idUsuarioModel.apellidos===""||
        this.idUsuarioModel.usuario===""||
        this.idUsuarioModel.tel===""||
        this.idUsuarioModel.correo===""
      ){
        //Alerta para que se llenen todos los campos
        Swal.fire({
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }else{

      this._usuarioService.editarUsuario(this.idUsuarioModel).subscribe(
        response=>{
          console.log(response);
          //Alerta de que se actualizó correctamente el usuario
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          //Refrescando la ventana
          $('#mEditarUsuario').modal('hide');

          this.refresh();
        },
        (error) => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: 'No se pudo actualizar el usuario',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      )
    }
  }

  refresh(): void{
    window.location.reload();
  }
}
