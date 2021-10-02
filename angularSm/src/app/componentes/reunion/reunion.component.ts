//IMPORTACIÓN DE MODELOS
import { Usuario } from 'src/app/modelos/usuario.modelo';
import { Reunion } from 'src/app/modelos/reunion.modelo';
import { Sala } from 'src/app/modelos/sala.modelo';

//IMPORTACIÓN DE SERVICIOS
import { SalaService } from 'src/app/servicios/sala.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ReunionService } from 'src/app/servicios/reunion.service';
import { TipoSalaService } from 'src/app/servicios/tipoSala.service';

//IMPORTACIÓN PARA ALERTAS
import Swal from 'sweetalert2';

//IMPORTACIONES PARA LA SECCIÓN DE LA TABLA (CON ANGULAR MATERIAL)
import { AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//OTRAS IMPORTACIONES
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';

//DECLARANDO $ PARA UTILIZAR JQUERY
declare var $: any;

//CONJUNTO DE COLORES
const colors: any = {
  red: { primary: '#ad2121', secondary: '#FAE3E3'},
  gray: { primary: '#979291', secondary: '#FAE3E3'},
  blue: { primary: '#1e90ff', secondary: '#D1E8FF'},
  yellow: { primary: '#e3bc08',secondary: '#FDF1BA'},
};

@Component({
  selector: 'app-reunion',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./reunion.component.scss'],
  templateUrl: './reunion.component.html',
  providers: [UsuarioService,SalaService,ReunionService,TipoSalaService]
})

export class ReunionComponent implements OnInit, AfterViewInit{

  //DECLARACIÓN DE VARIABLES PARA DIVERSOS USOS

  public identidad;
  public token;
  public salas;
  public reunionesModelGet;
  public reunionesModelAdd: Reunion;
  public reunionesModelGetId: Reunion;
  public idReunionModel: Reunion;

  public tipos;
  public salasModelGet;
  public salasModelAdd: Sala;
  public salasModelGetId: Sala;
  public idSalaModel: Sala;

  public reuniones;
  public todayDate;
  public reunionesT;

  public datos = new Array<Reunion>();
/*
  public events:CalendarEvent[];
*/
    //ViewChild DE LA PAGINACIÓN Y DEL SORT DE LA TABLA CON TODOS LOS DATOS
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    //VARIABLES QUE INSTANCIAS PARA LOS DATOS DE LAS TABLAS
    dataSourceReuniones = new MatTableDataSource<any[]>();
    dataSourceReunionesC = new MatTableDataSource<any[]>();
    dataSourceReunionesP = new MatTableDataSource<any[]>();
    dataSourceReunionesR = new MatTableDataSource<any[]>();

    //VARIABLES QUE TRAEN LAS COLUMNAS DE CADA TABLA
    displayedColumns: string[] = ['title','estado','cantidadAsist','start','end','acciones'];
    displayedColumnsC: string[] = ['title','estado','cantidadAsist','start','end','acciones'];
    displayedColumnsP: string[] = ['title','estado','cantidadAsist','start','end','acciones'];
    displayedColumnsR: string[] = ['title','estado','cantidadAsist','start','end','acciones'];

    //events:Reunion;

  constructor(

    //CREANDO UNA VARIABLE PARA NgbModal
    private modal: NgbModal,
    //SERVICIOS
    public _usuarioService: UsuarioService,
    public _reunionService: ReunionService,
    public _salaService: SalaService,
    public _tipoSalaService:TipoSalaService
    ) {
    //OBTENIENDO IDENTIDAD Y TOKEN
    this.identidad = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();
    //INSTANCIANDO LOS DATOS DE LA DB DE REUNIÓN CON LAS VARIABLES
    this.reunionesModelAdd = new Reunion("","","",null,null,"","",{usuario:""},{nombre:""},"")
    this.reunionesModelGetId = new Reunion("","","",null,null,"","",{usuario:""},{nombre:""},"")
    this.idReunionModel =  new Reunion("","","",null,null,"","",{usuario:""},{nombre:""},"")
    //INSTANCIANDO LOS DATOS DE LA DB DE SALA CON LAS VARIABLES
    this.salasModelGetId = new Sala("","","","","","","","","");
    this.salasModelAdd = new Sala("","","","","","","","","");
    this.idSalaModel = new Sala("","","","","","","","","");
    //VARIABLE OBTENIENDO LA FECHA ACTUAL PARA VALIUDACIÓN EN PARTE DEL CRUD
    this.todayDate = new Date();
    //DECLARANDO QUE LAS VARIABLES OBTIENEN DATOS DEL SERVICIO
    this._reunionService.obtenerReunionesT().subscribe ( reunionesT => {
      this.dataSourceReuniones.data = reunionesT;
    })
    this._reunionService.obtenerReunionesC().subscribe ( reunionesT => {
      this.dataSourceReunionesC.data = reunionesT;
    })
    this._reunionService.obtenerReunionesR().subscribe ( reunionesT => {
      this.dataSourceReunionesR.data = reunionesT;
    })
    this._reunionService.obtenerReunionesP().subscribe ( reunionesT => {
      this.dataSourceReunionesP.data = reunionesT;
    })


    this._reunionService.obtenerReunionesG().subscribe ( reuniones => {
      this.datos = reuniones;
    })


  }



  obtenerReunionesG(){
    this._reunionService.obtenerReunionesG().subscribe(
      response => {
         this.datos = response.reunionesEncontradas;
         console.log(response)
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //events: CalendarEvent[] = this.datos[]
  //FUNCIONES DE OBTENER REUNIONES EN TABLAS
  obtenerReunionesP(){
    this._reunionService.obtenerReunionesP().subscribe(
      response => {
         this.dataSourceReunionesP.data = response.reunionesEncontradas;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerReunionesT(){
    this._reunionService.obtenerReunionesT().subscribe(
      response => {
         this.dataSourceReuniones.data = response.reunionesEncontradas;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerReunionesC(){
    this._reunionService.obtenerReunionesC().subscribe(
      response => {
         this.dataSourceReunionesC.data = response.reunionesEncontradas;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerReunionesR(){
    this._reunionService.obtenerReunionesR().subscribe(
      response => {
         this.dataSourceReunionesR.data = response.reunionesEncontradas;
      },
      error => {
        console.log(<any>error);
      }
    )
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

  //FUNCIONES CRUD
  cancelarSolicitud(idReunion){
    this._reunionService.cancelarSolicitud(idReunion).subscribe(
      response=>{
        console.log(response)
        //Refrescando la ventana
        this.reload();
      }
    )
  }

  confirmarSolicitud(idReunion){
    this._reunionService.confirmarSolicitud(idReunion).subscribe(
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

  pendienteSolicitud(idReunion){
    this._reunionService.pendienteSolicitud(idReunion).subscribe(
      response=>{
        console.log(response)
        //Refrescando la ventana
        this.reload();
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

  editarSolicitud(){
    //Validación
      if(
        this.idReunionModel.nombre===""||
        this.idReunionModel.title===""||
        this.idReunionModel.cantidadAsist===""||
        this.idReunionModel.start===null||
        this.idReunionModel.end===null
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
        this.idReunionModel.start >= this.idReunionModel.end
      ){
        Swal.fire({
          icon: 'warning',
          title: 'La fecha de inicio no puede ser mayor o igual a la final',
          showConfirmButton: false,
          timer: 2500,
        });
        //Validando que la fecha de inicio no sea menor a la actual
      }else if(
        this.idReunionModel.start < this.todayDate
      ){
        Swal.fire({
          icon: 'warning',
          title: 'La fecha de inicio es del pasado',
          text: "Pon una fecha que no sea menor a la actual.",
          showConfirmButton: false,
          timer: 2500,
        });
      }else{
        console.log(this.idReunionModel)
      this._reunionService.editarSolicitud(this.idReunionModel).subscribe(
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

  obtenerReunionesDB(){
    this._reunionService.obtenerReuniones(this.token).subscribe(
      response => {
         //this.reunionesModelGet = response.reunionesEncontradas;
         this.reunionesModelGet = response.reunionesEncontradas;
         console.log(response)
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerReuniones(){
    this._reunionService.obtenerReuniones(this.token).subscribe(
      response => {
         this.reunionesModelGet = response.reunionesEncontradas;
         //this.events = response.reunionesEncontradas;
         console.log(response)
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  crearReunion(){

    //Validación
      if(
        this.reunionesModelAdd.nombre===""||
        this.reunionesModelAdd.title===""||
        this.reunionesModelAdd.cantidadAsist===""||
        this.reunionesModelAdd.start===null||
        this.reunionesModelAdd.end===null||
        this.reunionesModelAdd.idSala.nombre===""){
        //Alerta para que se llenen todos los campos
        Swal.fire({
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
        //Validando que la fecha te inicio no sea mayor o igual a la final
      }else if(
        this.reunionesModelAdd.start >= this.reunionesModelAdd.end
      ){
        Swal.fire({
          icon: 'warning',
          title: 'La fecha de inicio no puede ser mayor o igual a la final',
          showConfirmButton: false,
          timer: 2500,
        });
        //Validando que la fecha de inicio no sea menor a la actual
      }else if(
        this.reunionesModelAdd.start < this.todayDate
      ){
        Swal.fire({
          icon: 'warning',
          title: 'La fecha de inicio es del pasado',
          text: "Pon una fecha que no sea menor a la actual.",
          showConfirmButton: false,
          timer: 2500,
        });
      }else{
        console.log(this.reunionesModelAdd)
      this._reunionService.crearReunion(this.reunionesModelAdd,this.token).subscribe(
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
          this.reunionesModelAdd.nombre ='';
          this.reunionesModelAdd.title ='';//Descripcion
          this.reunionesModelAdd.cantidadAsist ='';
          this.reunionesModelAdd.start =null;
          this.reunionesModelAdd.end =null;
          this.reunionesModelAdd.idSala.nombre ='';
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

/*
  obtenerReuniones(){
    this._reunionService.obtenerReuniones(this.token).subscribe(
      response => {
         //this.reunionesModelGet = response.reunionesEncontradas;
         this.events = response.reunionesEncontradas;
         //console.log(response)
      },
      error => {
        console.log(<any>error);
      }
    )
  }
*/

/* SECCIÓN DEL CALENDARIO */
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  /*
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },


    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },

  ];
*/
  refresh: Subject<any> = new Subject();
/*
  events: CalendarEvent[] = [

    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },

  ];
  */

/*events: CalendarEvent[] = [];*/

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
/*
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
*/
   handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  /*
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'Nuevo evento',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        //color: colors.gray,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }
  */

  /*
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }
  */

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

//OnInit y AfterViewInit

  ngOnInit(): void {
    this.obtenerTipoSalas();
    this.obtenerSalasT();
    this.obtenerReuniones();
    this.obtenerReunionesG();
    //this.obtenerReunionesG(); //IMPRIMIENDO DE LA DB
    //console.log(this.datos); //IMPRIMIENDO LOS EVENTOS ESTATICOS
  }

  ngAfterViewInit() {
    this.dataSourceReuniones.sort = this.sort;
    this.dataSourceReuniones.paginator = this.paginator;
  }

  //Función para refrescar la pantalla
  reload(): void{
    window.location.reload();
  }
}


