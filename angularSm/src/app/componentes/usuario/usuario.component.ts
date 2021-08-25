import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from "../../servicios/usuario.service";

import { Router } from '@angular/router';
import Swal from "sweetalert2";
declare var $: any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: [UsuarioService]
})
export class UsuarioComponent implements AfterViewInit {

  /*form: FormGroup;*/

displayedColumns: string[] = ['usuario','correo', 'tel','rol','acciones'];
dataSource = new MatTableDataSource<any[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public token;
  public usuarios:any;
  public user: Usuario;

  constructor(
    private _usuarioService: UsuarioService,
   /* private fb: FormBuilder,*/
    private _router: Router
    ) {
    this.user = new Usuario("","","","","","","","","");
    this.token = this._usuarioService.getToken();
    this._usuarioService.obtenerUsuarios().subscribe ( usuarios => {
      this.dataSource.data = usuarios;
    })
/*
    this.form= this.fb.group({
      usuario: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.required],
      tel: ['', Validators.required],
      contrasena: ['', Validators.required],
    })
    */
   }

   ngOnInit(): void {
     //this.obtenerUsuarios();
   }

  obtenerUsuarios(){
    this._usuarioService.obtenerUsuarios().subscribe(
      response => {
         this.dataSource.data = response.usuariosEncontrados;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  ngAfterViewInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  crearUsuarios(){
      if(this.user.nombres===""||this.user.apellidos===""||this.user.usuario===""||this.user.tel===""||this.user.correo===""||this.user.contrasena===""){
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
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });

          this.user.nombres ='';
          this.user.apellidos ='';
          this.user.correo ='';
          this.user.usuario ='';
          this.user.contrasena ='';
          this.user.tel ='';
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


  refresh(): void{
    window.location.reload();
  }
}

/*
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from "../../servicios/usuario.service";
declare var $: any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {
  public usuarios:any;
  public idUsuarioModel: Usuario;
  constructor(private _usuarioService: UsuarioService) {
    this.idUsuarioModel = new Usuario("","","","","","","","","");
   }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this._usuarioService.obtenerUsuarios().subscribe(
      response => {
        this.usuarios = response.usuariosEncontrados;
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

  editarUsuario(){
    this._usuarioService.editarUsaurio(this.idUsuarioModel).subscribe(
      response=>{
        console.log(response);
        this.obtenerUsuarios();
      }
    )
  }

  eliminarUsuario(idUsuario:String){
    this._usuarioService.eliminarUsuario(idUsuario).subscribe(
      response=>{
        console.log(response);
        this.obtenerUsuarios();
      }
    )
  }


}
*/
