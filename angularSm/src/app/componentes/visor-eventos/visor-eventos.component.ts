//IMPORTACIÓN DE MODELOS
import { Usuario } from 'src/app/modelos/usuario.modelo';
import { Event } from 'src/app/modelos/event.modelo';
import { Sala } from 'src/app/modelos/sala.modelo';

//IMPORTACIÓN DE SERVICIOS
import { SalaService } from 'src/app/servicios/sala.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TipoSalaService } from 'src/app/servicios/tipoSala.service';
import { EventService } from 'src/app/servicios/event.service';


import { ReunionService } from 'src/app/servicios/reunion.service';

//IMPORTACIÓN PARA ALERTAS
import Swal from 'sweetalert2';

//OTRAS Importaciones
import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-visor-eventos',
  templateUrl: './visor-eventos.component.html',
  styleUrls: ['./visor-eventos.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [UsuarioService,SalaService,ReunionService,TipoSalaService]
})
export class VisorEventosComponent implements OnInit {

  public identidad;
  public token;
  public salas;
  public eventsModelGet;
  public eventsModelAdd: Event;
  public eventsModelGetId: Event;
  public idEventModel: Event;

  public tipos;
  public salasModelGet;
  public salasModelAdd: Sala;
  public salasModelGetId: Sala;
  public idSalaModel: Sala;

  public reuniones;
  public todayDate;
  public reunionesT;

  public events: Event[];
  public options: any;

  constructor(
    private eventService: EventService,
    private _usuarioService: UsuarioService,
    private _salaService: SalaService,
    private _tipoSalaService: TipoSalaService,
    ) {

      this.identidad = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();

      this.eventsModelAdd =new Event("","","","","","","",{usuario:""},{nombre:""},"");
      this.eventsModelGetId =new Event("","","","","","","",{usuario:""},{nombre:""},"");
      this.idEventModel =new Event("","","","","","","",{usuario:""},{nombre:""},"");

      this.salasModelGetId = new Sala("","","","","","","","","");
    this.salasModelAdd = new Sala("","","","","","","","","");
    this.idSalaModel = new Sala("","","","","","","","","");

    //OBTENIENDO LOS DATOS DE LA DB PARA EL CALENDARIO
    this.eventService.obtenerEvents().subscribe(events => {
      this.events = events;
    });

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

  this.options = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    defaultDate: new Date(),
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    editable: false
  };

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

  crearEvent(){

    //Validación
      if(
        this.eventsModelAdd.nombre===""||
        this.eventsModelAdd.title===""||
        this.eventsModelAdd.cantidadAsist===""||
        this.eventsModelAdd.start===""||
        this.eventsModelAdd.end===""||
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
        this.eventsModelAdd.start < this.todayDate
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
          this.eventsModelAdd.start ='';
          this.eventsModelAdd.end ='';
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


  ngOnInit(): void {
    this.obtenerEvents();
    this.obtenerTipoSalas();
    this.obtenerSalasT();
  }

  //Función para refrescar la pantalla
  reload(): void{
    window.location.reload();
  }

}
