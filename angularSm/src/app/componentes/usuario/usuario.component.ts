import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from "../../servicios/usuario.service";
declare var $: any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: [UsuarioService]
})
export class UsuarioComponent implements AfterViewInit {

displayedColumns: string[] = ['usuario','correo', 'tel','rol','acciones'];
dataSource = new MatTableDataSource<any[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public usuarios:any;

  constructor(private _usuarioService: UsuarioService) {
    this._usuarioService.obtenerUsuarios().subscribe ( usuarios => {
      this.dataSource.data = usuarios;
    })
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
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
    //console.log('\nNgAfterViewInit...\n');
    //this.obtenerUsuarios();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
