import { Component, OnInit } from '@angular/core';
import { UploadsService } from '../../servicios/uploads.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  myImages;

  constructor(private uploadsService: UploadsService) { }

  ngOnInit(): void {
    setInterval(()=> this.getImages(), 1000)
  }

  getImages(){
    this.uploadsService.getImages().subscribe(data=>{
      console.log("los datos de las imagenes: ", data)
      this.myImages = data
    })
  }

}
