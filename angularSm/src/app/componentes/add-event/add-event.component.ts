import { Component, OnInit } from '@angular/core';
import { EventInt } from 'src/app/modelos/event.model';
import { EventService } from 'src/app/servicios/event.service';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  public today: Date;
  public event: EventInt;
  public showEnd: boolean;
  public showTime: boolean;
  constructor(private eventService: EventService) {
    this.event = new EventInt({});

    this.today = new Date();
    this.event.startDate=new Date();
    this.event.endDate=new Date();


    this.showEnd=false;
   }

  ngOnInit(): void {
  }

  addEvent(){

    if(!this.showEnd){
      this.event.end = null;
    }
    console.log(this.event);

  }

}
