import { Component, OnInit, ViewChild } from '@angular/core';
import { WebService } from '../common/utilities/_services/index';
import { DataSource } from '@angular/cdk/collections';
import { MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

/**
 * Genera la vista de la página principal.
 * @author Juan Lozoya <jlozoya1995@gmail.com>
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns = ['dato_1', 'dato_2', 'dato_3', 'dato_4'];
  exampleDatabase = new ExampleDatabase(this.webService);
  dataSource: ExampleDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  li_resultados;
  constructor(
    private webService: WebService
  ) { }
  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator);
  }
}

export interface UserData {
  dato_1: string,
  dato_2: string,
  dato_3: string,
  dato_4: string
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  get data(): UserData[] { return this.dataChange.value; }

  constructor(
    private webService: WebService
  ) {
    this.consultarConPost("select", "SELECT * FROM myTabla;");
  }
  /**
   * Llama la función postRawQuery del servicio phpConnectionService y le pasa como parámetro lo que se va 
   * a enviar al servidor.
   * 
   * @param action Es el nombre de la acción que se quiere realizar, puede variar dependiendo de lo que este
   * escrito en el servidor que se espera recibir.
   * @param data Es una cadena de texto o un diccionario de datos, dependiendo de lo que este
   * escrito en el servidor que se espera recibir.
   */
  consultarConPost(action: string, data: any) {
    let query = {
      action: action,
      data: data
    };
    this.webService.postRawQuery(query, 10000).then(response => {
      this.dataChange.next([{
        dato_1: "dato_1", 
        dato_2: "dato_2", 
        dato_3: "dato_3", 
        dato_4: "dato_4"
      }]);
      for (let datos of response) {
        this.dataChange.next([datos]);
      }
    }, fail => {
      console.log(fail);
    });
  }
}
/**
 * Fuente de datos para proporcionar qué datos se deben representar en la tabla. 
 * Tenga en cuenta que la fuente de datos puede recuperar sus datos de cualquier manera. En este caso, 
 * la fuente de datos se proporciona una referencia a una base de datos común, ExampleDatabase. No es
 * responsabilidad de la fuente de datos administrar los datos subyacentes. En cambio, sólo necesita 
 * tomar los datos y enviar a la tabla exactamente lo que debe ser procesado.
 */
export class ExampleDataSource extends DataSource<any> {
constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MdPaginator) {
  super();
}
/** Conecta la función llamada por la tabla para recuperar una secuencia que contiene los datos a renderizar. */
connect(): Observable<UserData[]> {
  const displayDataChanges = [
    this._exampleDatabase.dataChange,
    this._paginator.page,
  ];
  return Observable.merge(...displayDataChanges).map(() => {
    const data = this._exampleDatabase.data.slice();
    // Coge la porción de datos de la página.
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    return data.splice(startIndex, this._paginator.pageSize);
  });
}
disconnect() {}
}