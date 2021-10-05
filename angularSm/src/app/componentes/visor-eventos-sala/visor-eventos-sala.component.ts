//IMPORTACIÓN DE MODELOS
import { Usuario } from 'src/app/modelos/usuario.modelo';
import { EventCalendar } from 'src/app/modelos/event.modelo';
import { Sala } from 'src/app/modelos/sala.modelo';

//IMPORTACIÓN DE SERVICIOS
import { SalaService } from 'src/app/servicios/sala.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TipoSalaService } from 'src/app/servicios/tipoSala.service';
import { EventService } from 'src/app/servicios/event.service';

//IMPORTACIÓN PARA ALERTAS
import Swal from 'sweetalert2';

//IMPORTACIONES PARA LA SECCIÓN DE LA TABLA (CON ANGULAR MATERIAL)
import { AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//DECLARANDO $ PARA UTILIZAR JQUERY
declare var $: any;

//OTRAS Importaciones
import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ActivatedRoute } from '@angular/router';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-visor-eventos-sala',
  templateUrl: './visor-eventos-sala.component.html',
  styleUrls: ['./visor-eventos-sala.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [UsuarioService,SalaService,TipoSalaService]
})
export class VisorEventosSalaComponent implements OnInit {

  public identidad;
  public token;
  public salas;
  public eventsModelGet;
  public eventsModelAdd: EventCalendar;
  public eventsModelGetId: EventCalendar;
  public idEventModel: EventCalendar;

  public tipos;
  public salasModelGet;
  public salasModelAdd: Sala;
  public salasModelGetId: Sala;
  public idSalaModel: Sala;

  public salaModel;
  public idSalaRuta: string;
  public idSala;

  public usuarioModel: Usuario;
  public idUsuarioModel: Usuario;

  public reuniones;
  public todayDate;
  public reunionesT;

  public events: EventCalendar[];
  public options: any;


  //ViewChild DE LA PAGINACIÓN Y DEL SORT DE LA TABLA CON TODOS LOS DATOS
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //VARIABLES QUE INSTANCIAS PARA LOS DATOS DE LAS TABLAS
  dataSourceReuniones = new MatTableDataSource<any[]>();

  //VARIABLES QUE TRAEN LAS COLUMNAS DE CADA TABLA
  displayedColumns: string[] = ['title','estado','cantidadAsist','start','end','acciones'];



  constructor(
    private eventService: EventService,
    private _usuarioService: UsuarioService,
    private _salaService: SalaService,
    private _tipoSalaService: TipoSalaService,
    public _activatedRoute: ActivatedRoute,
    ) {

    this.identidad = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();

    this.eventsModelAdd = new EventCalendar("","","",null,null,"","",{usuario:""},{nombre:""},"");
    this.eventsModelGetId = new EventCalendar("","","",null,null,"","",{usuario:""},{nombre:""},"");
    this.idEventModel = new EventCalendar("","","",null,null,"","",{usuario:""},{nombre:""},"");

    this.salaModel = new Sala("","","","","","","","","");
    this.salasModelGetId = new Sala("","","","","","","","","");
    this.salasModelAdd = new Sala("","","","","","","","","");
    this.idSalaModel = new Sala("","","","","","","","","");

    this.usuarioModel = new Usuario('', '', '', '', '', '', '', '', '');
    this.idUsuarioModel = new Usuario('', '', '', '', '', '', '', '', '');



    //VARIABLE OBTENIENDO LA FECHA ACTUAL PARA VALIUDACIÓN EN PARTE DEL CRUD
    this.todayDate = new Date();


  this.options = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    defaultDate: new Date(),
    initialView:'dayGridMonth',
    locale: esLocale,
    header: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: false,

    //eventColor: '#378006',

    //eventBorderColor: '#378006'
  };

  }

  confirmarSolicitud(idEvento){
    this.eventService.confirmarSolicitudEvent(idEvento).subscribe(
      response=>{
        console.log(response)
        //Refrescando la ventana
        this.reload();
      }
    )
  }

  asistencia(idEvento){
    this.eventService.asistenciaEvent(idEvento).subscribe(
      response=>{
        console.log(response);
        this.cerrarSesion();
            Swal.fire({
              //position: 'top-end',
              icon: 'success',
              title: 'Asistencia Registrada',
              showConfirmButton: false,
              timer: 1500,
            });
        //Refrescando la ventana
        this.reload();
      }
    )
  }

  cerrarSesion(){
    this.identidad = null;
    this.token = null;
    localStorage.setItem('identidad', JSON.stringify(this.identidad))
    localStorage.setItem('token', JSON.stringify(this.token));
  }

  obtenerUsuarioId(idUsuario:String){
    this._usuarioService.obtenerUsuarioId(idUsuario).subscribe(
      response=>{
        this.idUsuarioModel = response.usuarioEncontrado;
        console.log(response);

      }
    )
  }

  pendienteSolicitud(idEvento){
    this.eventService.pendienteSolicitudEvent(idEvento).subscribe(
      response=>{
        console.log(response)
        //Refrescando la ventana
        this.reload();
      }
    )
  }

  obtenerEventsT(idSala){
    this.eventService.obtenerEventsSala(idSala).subscribe(
      response => {
         this.dataSourceReuniones.data = response.reunionesObtenidas;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerSalasT() {
    this._salaService.obtenerSalasT().subscribe(
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

  cancelarSolicitudEvent(idEvento){
    this.eventService.cancelarSolicitudEvent(idEvento).subscribe(
      response=>{
        console.log(response)
        //Refrescando la ventana
        this.reload();
      }
    )
  }

  confirmarSolicitudEvent(idEvento){
    this.eventService.confirmarSolicitudEvent(idEvento).subscribe(
      response=>{
        console.log(response)
        Swal.fire({
          icon: 'success',
          title: 'Confirmada',
          showConfirmButton: false,
          timer: 1500,
        });
        //Refrescando la ventana
        this.reload();
      },
      error=>{
        console.log(error)
        Swal.fire({
          icon: 'warning',
          title: 'No se pudo confirmar la reunión',
          text: "Hay interferencia con el horario.",
          showConfirmButton: false,
          timer: 3500,
        });
      }
    )
  }

  pendienteSolicitudEvent(idEvento){
    this.eventService.pendienteSolicitudEvent(idEvento).subscribe(
      response=>{
        console.log(response)
        //Refrescando la ventana
        this.reload();
      }
    )
  }

  obtenerEvent(idEvento:String){
    this.eventService.obtenerEvent(idEvento).subscribe(
      response=>{
        this.idEventModel = response.eventoEncontrado;
        console.log(response);

      }
    )
  }

  editarSolicitudEvent(){
    //Validación
      if(
        this.idEventModel.nombre===""||
        this.idEventModel.title===""||
        this.idEventModel.cantidadAsist===""||
        this.idEventModel.start===null||
        this.idEventModel.end===null
      ){
        //Alerta para que se llenen todos los campos
        Swal.fire({
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
        //Validando que la fecha te inicio no sea mayor o igual a la final
      }else if(
        this.idEventModel.start >= this.idEventModel.end
      ){
        Swal.fire({
          icon: 'warning',
          title: 'La fecha de inicio no puede ser mayor o igual a la final',
          showConfirmButton: false,
          timer: 2500,
        });
        //Validando que la fecha de inicio no sea menor a la actual
      }else if(
        this.idEventModel.start < this.todayDate
      ){
        Swal.fire({
          icon: 'warning',
          title: 'La fecha de inicio es del pasado',
          text: "Pon una fecha que no sea menor a la actual.",
          showConfirmButton: false,
          timer: 2500,
        });
      }else{
        console.log(this.idEventModel)
      this.eventService.editarSolicitudEvent(this.idEventModel).subscribe(
        response=>{
          console.log(response);
          //Alerta de que se creó correctamente el usuario
          Swal.fire({
            icon: 'success',
            title: 'Reunión actualizada correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          //Refrescando la ventana
          this.reload();
          //this._router.navigate(['/usuarios'])
        },
        (error) => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: 'No se pudo actualizar la reunión',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      )
    }
  }

  obtenerSalaSelect(idSala){
    this._salaService.obtenerSala(idSala).subscribe(
      response => {
        this.salaModel =response.salaEncontrada;
        console.log(response);
      }
    )
  }

  obtenerEventsSala(idSala){
    this.eventService.obtenerEventsSala(idSala).subscribe(
      response => {
        this.events =response.reunionesObtenidas;
        console.log(response);
      }
    )
  }

  getToken() {
    this._usuarioService.login(this.usuarioModel).subscribe(
      (response)=> {
        console.log(response);
        this.token = response.token;
        localStorage.setItem('token', JSON.stringify(this.token));
        this.reload();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  login() {
    this._usuarioService.login(this.usuarioModel).subscribe(
      (response) => {
        console.log(response);
        //this.refresh()
        this.identidad = response.usuarioEncontrado;
        localStorage.setItem('identidad', JSON.stringify(this.identidad));
        //this.getToken();
        this.token=response.token;
        localStorage.setItem('token', JSON.stringify(this.token));

        if(this.identidad.estado=="Activo"){
            this.usuarioModel.usuario='';
            this.usuarioModel.contrasena='';
            if( this.identidad.usuario === this.idEventModel.idResponsable.usuario){
              $('#mConfirmacion').modal('show');
            }else if(this.identidad.usuario != this.idEventModel.idResponsable.usuario){
              Swal.fire({
                icon: 'warning',
                title: 'No se pudo marcar asistencia',
                text: "Solo el creador de la solicitud de reunión puede confirmar asistencia.",
                showConfirmButton: false,
                timer: 2500,
              });
              $('#mLogin').modal('show');
            }

        } else if(this.identidad.estado!="Activo"){
          Swal.fire({
            icon: 'error',
            title: 'Su cuenta no está activa',
            showConfirmButton: false,
            timer: 1500,
          });
          this.usuarioModel.usuario='';
          this.usuarioModel.contrasena='';
          $('#mLogin').modal('show');
        }
      },
      (error) => {
        console.log(<any>error);
        Swal.fire({
          //position: 'top-end',
          icon: 'error',
          title: 'Dato(s) incorrecto(s)',
          showConfirmButton: false,
          timer: 1500,
        });
        this.usuarioModel.usuario='';
        this.usuarioModel.contrasena='';
        $('#mLogin').modal('show');
      }
    );
  }


//OnInit y AfterViewInit

  ngOnInit(): void {

    this.obtenerTipoSalas();
    this.obtenerSalasT();

    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idSalaRuta = dataRuta.get('idSala');
    });
    this.obtenerSalaSelect(this.idSalaRuta);
    this.obtenerEventsSala(this.idSalaRuta);
    this.obtenerEventsT(this.idSalaRuta);



  }

  ngAfterViewInit() {
    this.dataSourceReuniones.sort = this.sort;
    this.dataSourceReuniones.paginator = this.paginator;
  }

  //Función para refrescar la pantalla
  reload(): void{
    window.location.reload();
  }

  //FILTROS DE LAS TABLAS
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceReuniones.filter = filterValue.trim().toLowerCase();
  }

}

