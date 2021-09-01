import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadsService } from '../../servicios/uploads.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {

  imageForm: FormGroup;
  image: any = "../../../assets/upload-cloud.png"
  file: any;
  constructor(private uploadsService: UploadsService) { }

  ngOnInit(): void {
    this.imageForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      file: new FormControl(null, Validators.required)
    })
  }


  onFileChange(event) {

    if(event.target.files && event.target.files.length > 0){
      const file = event.target.files[0];
      if(file.type.includes("image")){
        const reader = new FileReader()
        reader.readAsDataURL(file);

        reader.onload = function load(){
          this.image = reader.result;
        }.bind(this);

        this.file = file;
      }else{
        console.log("There was an error");
      }
    }
  }

  onSubmit(){
    console.log("uploading image")

    const form = this.imageForm;
    if(form.valid){
      this.uploadsService.uploadImage(form.value.name, this.file)
      .subscribe(data => {
        this.imageForm = new FormGroup({
          name: new FormControl(null),
          file: new FormControl(null)
        })

        this.image="../../../assets/upload-cloud.png"
      })
    }
  }
}
