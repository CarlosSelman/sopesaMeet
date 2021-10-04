import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from 'src/app/servicios/event.service';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-visor-eventos',
  templateUrl: './visor-eventos.component.html',
  styleUrls: ['./visor-eventos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VisorEventosComponent implements OnInit {

  public events: Event[];
  //public events: any;
  public options: any;

  constructor(private eventService: EventService) {

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

  ngOnInit(): void {
    this.obtenerEvents();
  }

}
