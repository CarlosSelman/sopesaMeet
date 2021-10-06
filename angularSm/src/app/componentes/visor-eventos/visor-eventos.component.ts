//IMPORTACIÓN DE MODELOS
import { Usuario } from 'src/app/modelos/usuario.modelo';
import { EventCalendar } from 'src/app/modelos/event.modelo';
import { Sala } from 'src/app/modelos/sala.modelo';
import esLocale from '@fullcalendar/core/locales/es';

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
import Tooltip from 'tooltip.js'
import { FullCalendar } from 'primeng/fullcalendar/fullcalendar';
//import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-visor-eventos',
  templateUrl: './visor-eventos.component.html',
  styleUrls: ['./visor-eventos.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [UsuarioService,SalaService,TipoSalaService]
})
export class VisorEventosComponent implements OnInit {

  @ViewChild('fcm',{static:false}) fcm: FullCalendar;
  public identidad;
  public token;
  public salas;
  public eventsModelGet;
  public eventsModelAdd: EventCalendar;
  public eventsModelGetId: EventCalendar;
  public idEventModel: EventCalendar;
  public event: EventCalendar;

  public tipos;
  public salasModelGet;
  public salasModelAdd: Sala;
  public salasModelGetId: Sala;
  public idSalaModel: Sala;

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
  dataSourceReunionesC = new MatTableDataSource<any[]>();
  dataSourceReunionesP = new MatTableDataSource<any[]>();
  dataSourceReunionesR = new MatTableDataSource<any[]>();
  dataSourceReunionesA = new MatTableDataSource<any[]>();
  //VARIABLES QUE TRAEN LAS COLUMNAS DE CADA TABLA
  displayedColumns: string[] = ['title','estado','cantidadAsist','start','end','acciones'];
  displayedColumnsC: string[] = ['title','estado','cantidadAsist','start','end','acciones'];
  displayedColumnsP: string[] = ['title','estado','cantidadAsist','start','end','acciones'];
  displayedColumnsR: string[] = ['title','estado','cantidadAsist','start','end','acciones'];
  displayedColumnsA: string[] = ['title','estado','cantidadAsist','start','end','acciones'];
  constructor(
    private eventService: EventService,
    private _usuarioService: UsuarioService,
    private _salaService: SalaService,
    private _tipoSalaService: TipoSalaService,
    ) {

    this.identidad = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();

    this.eventsModelAdd = new EventCalendar("","","",null,null,"","","",{usuario:""},{nombre:""},"");
    this.eventsModelGetId = new EventCalendar("","","",null,null,"","","",{usuario:""},{nombre:""},"");
    this.idEventModel = new EventCalendar("","","",null,null,"","","",{usuario:""},{nombre:""},"");

    this.salasModelGetId = new Sala("","","","","","","","","");
    this.salasModelAdd = new Sala("","","","","","","","","");
    this.idSalaModel = new Sala("","","","","","","","","");

    //OBTENIENDO LOS DATOS DE LA DB PARA LAS TABLAS
    this.eventService.obtenerEventsT().subscribe ( reunionesT => {
      this.dataSourceReuniones.data = reunionesT;
    })
    this.eventService.obtenerEventsC().subscribe ( reunionesT => {
      this.dataSourceReunionesC.data = reunionesT;
    })
    this.eventService.obtenerEventsR().subscribe ( reunionesT => {
      this.dataSourceReunionesR.data = reunionesT;
    })
    this.eventService.obtenerEventsP().subscribe ( reunionesT => {
      this.dataSourceReunionesP.data = reunionesT;
    })
    this.eventService.obtenerEventsAsist().subscribe ( reunionesT => {
      this.dataSourceReunionesA.data = reunionesT;
    })

    //OBTENIENDO LOS DATOS DE LA DB PARA EL CALENDARIO
    this.eventService.obtenerEvents().subscribe(events => {
      this.events = events;
    });

    //OPCIONES GENERALES (DISEÑO VISTA CALENDARIO)
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
      eventRender: (e) =>  {
        var tooltip = new Tooltip(e.el, {
          title: "<h6>"+e.event.title +"</h6>"+e.event.extendedProps.idSala.nombre + "<br>"+e.event.extendedProps.estado,
          placement: 'top',
          trigger: 'hover',
          container: 'body',
          html: true
        });
      },
      editable: false,
      //eventColor: '#378006',
      //eventBorderColor: '#378006'
    };

    //VARIABLE OBTENIENDO LA FECHA ACTUAL PARA VALIUDACIÓN EN PARTE DEL CRUD
    this.todayDate = new Date();
  }

   obtenerEvents(){
    this.eventService.obtenerEvents().subscribe(
      response => {
        this.events = response.eventosEncontrados;
        console.log(response)
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerEventsP(){
    this.eventService.obtenerEventsP().subscribe(
      response => {
         this.dataSourceReunionesP.data = response.eventosEncontrados;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerEventsT(){
    this.eventService.obtenerEventsT().subscribe(
      response => {
         this.dataSourceReuniones.data = response.eventosEncontrados;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerEventsC(){
    this.eventService.obtenerEventsC().subscribe(
      response => {
         this.dataSourceReunionesC.data = response.eventosEncontrados;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerEventsR(){
    this.eventService.obtenerEventsR().subscribe(
      response => {
         this.dataSourceReunionesR.data = response.eventosEncontrados;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerEventsAsist(){
    this.eventService.obtenerEventsAsist().subscribe(
      response => {
         this.dataSourceReunionesA.data = response.eventosEncontrados;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  crearEvent(){
    //Validación
      if(
        this.eventsModelAdd.nombre===""||
        this.eventsModelAdd.title===""||
        this.eventsModelAdd.cantidadAsist===""||
        this.eventsModelAdd.start===null||
        this.eventsModelAdd.end===null||
        this.eventsModelAdd.idSala.nombre===""){
        //Alerta para que se llenen todos los campos
        Swal.fire({
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
        //Validando que la fecha te inicio no sea mayor o igual a la final
      }else if(
        this.eventsModelAdd.start >= this.eventsModelAdd.end
      ){
        Swal.fire({
          icon: 'warning',
          title: 'La fecha de inicio no puede ser mayor o igual a la final',
          showConfirmButton: false,
          timer: 2500,
        });
        //Validando que la fecha de inicio no sea menor a la actual
      }else if(
          this.todayDate > this.eventsModelAdd.start
      ){
        Swal.fire({
          icon: 'warning',
          title: 'La fecha de inicio es del pasado',
          text: "Pon una fecha que no sea menor a la actual.",
          showConfirmButton: false,
          timer: 2500,
        });
      }else{
        console.log(this.eventsModelAdd)
      this.eventService.crearEvent(this.eventsModelAdd,this.token).subscribe(
        response=>{
          console.log(response);
          //Alerta de que se creó correctamente el usuario
          Swal.fire({
            icon: 'success',
            title: 'Reunión creada correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          //Limpiando los campos luego de la creación
          this.eventsModelAdd.nombre ='';
          this.eventsModelAdd.title ='';//Descripcion
          this.eventsModelAdd.cantidadAsist ='';
          this.eventsModelAdd.start = null;
          this.eventsModelAdd.end = null;
          this.eventsModelAdd.idSala.nombre ='';
          //Refrescando la ventana
          this.reload();
          //this._router.navigate(['/usuarios'])
        },
        (error) => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: 'No se pudo crear la reunión',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      )
    }
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
    if(this.identidad.usuario === this.idEventModel.idResponsable.usuario){
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
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'No se pudo editar la reunión',
        text: "Solo el creador de la solicitud de reunión puede editarla.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }

//OnInit y AfterViewInit

  ngOnInit(): void {
    this.obtenerEvents();
    this.obtenerTipoSalas();
    this.obtenerSalasT();
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

  applyFilterC(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceReunionesC.filter = filterValue.trim().toLowerCase();
  }

  applyFilterR(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceReunionesR.filter = filterValue.trim().toLowerCase();
  }

  applyFilterP(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceReunionesP.filter = filterValue.trim().toLowerCase();
  }

  applyFilterA(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceReunionesA.filter = filterValue.trim().toLowerCase();
  }


}
/* this.events = [
      {
          "title": "All Day Event",
          "start": "2021-10-02"
      },
      {
          "title": "Long Event",
          "start": "2021-10-04",
          "end": "2021-10-05"
      },
      {
          "title": "Repeating Event",
          "start": "2021-10-13T16:00:00"
      },
      {
          "title": "Repeating Event",
          "start": "2021-10-13T15:00:00"
      },
      {
          "title": "Conference",
          "start": "2021-10-11",
          "end": "2021-10-13"
      }
  ];
*/
