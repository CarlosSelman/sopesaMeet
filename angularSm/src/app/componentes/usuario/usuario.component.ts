import { Component, OnInit, ViewChild } from '@angular/core';
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
export class UsuarioComponent implements OnInit {

  listUsuarios: Usuario[] = [
    {_id: "avaedognowjeoigj23423sddfdf",nombres: "",apellidos:"",contrasena:"",usuario: "cselman", correo: "cselman@sopesa.com", tel: "1234 - 5678", rol: "Usuario", estado: "Activo"},
    {_id: "avaedognocvbcvbcvcbvbcvbcvdfdf",nombres: "",apellidos:"",contrasena:"",usuario: "jperez", correo: "jperez@sopesa.com", tel: "6789 - 1011", rol: "Usuario", estado: "Activo"},
    {_id: "avaedoswwsfrgggggg3423sddfdf",nombres: "",apellidos:"",contrasena:"",usuario: "abran", correo: "abran@sopesa.com", tel: "1111 - 2222", rol: "Usuario", estado: "Activo"},
    {_id: "avaedo75wtedrggdg3sddfdf",nombres: "",apellidos:"",contrasena:"",usuario: "ebran", correo: "ebran@sopesa.com", tel: "3333 - 4444", rol: "Usuario", estado: "Activo"},
    {_id: "avaedog125258ygbnmklfhgfbf23423sddfdf",nombres: "",apellidos:"",contrasena:"",usuario: "adavid", correo: "adavid@sopesa.com", tel: "5555 - 6656", rol: "Usuario", estado: "Activo"},
    {_id: "76754256dfgdeytghdff6gfb",nombres: "",apellidos:"",contrasena:"",usuario: "ljota", correo: "ljota@sopesa.com", tel: "6377 - 2323", rol: "Usuario", estado: "Activo"}
   ];

  displayedColumns: string[] = ['usuario','correo', 'tel','rol', 'acciones'];
  dataSource = new MatTableDataSource(this.listUsuarios);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

   ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
