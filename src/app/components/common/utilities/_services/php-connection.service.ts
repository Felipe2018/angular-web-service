import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
/**
 * Maneja las consultas a la base de datos remota, es un proveedor Http echo para ser llamado 
 * desde toda la aplicación y realizar los post al servidor desde aquí.
 * @author Juan Lozoya <jlozoya1995@gmail.com>
 * @see [Http](https://angular.io/guide/http)
 */
@Injectable()
export class PhpConnectionService {

  /**
   * Es la url del servidor.
   */
  url: string = "http://localhost/angular-web-service";
  /**
   * Es la extención de la url a la que se desea accesar.
   */
  urlActions: string = this.url + "/models/actions.php";
  /**
   * Variable para agregarle un header al post.
   */
  options: any;

  constructor(public http: Http) {
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    this.options = new RequestOptions({
        headers: headers
    });
  }
  /**
   * Regresa la url del servidor web ej. "http://xxx.xxx.xxx.xxx/cimav_ionic".
   * @return url 
   */
  public getUrl(): string{
    return this.url;
  }
  /** 
   * Se envia una peticion a un servidor web y regresa los datos que son recuperados 
   * en formato JSON.
   * 
   * Ejemplo de consulta:
   * {"action": "select", "data": "SELECT * FROM myTabla"}
   * 
   * @param query es la consulta a realizar.
   * @param timeout tiempo limite para terminar el proceso
   * @return Es la respuesta del servidor según la consulta que se realice 
   * puede ser un Array<Object> o una cadena de texto
   *  | reject Es una cadena de texto con la respuesta del servidor o un mensaje de error.
   */
  postRawQuery(query: any, timeout?: number): any {
    return new Promise((resolve, reject) => {
      // Esta instrucion envia los datos
      this.http.post(this.urlActions, query, this.options).subscribe(response => {
        try {
          let result = JSON.parse(response["_body"]);
          resolve(result);
        } catch (error) {
          reject(`Error: ${error}, Content: ${response["_body"]}`);
        }
      }, fail => {
        console.log(fail["_body"]);
        reject(`Fail ${JSON.stringify(fail)}`);
      });
      if (timeout) {
        setTimeout(() => {
          reject("No tienes conexión a internet");
        }, timeout);
      }
    });
  }
  /** 
   * Se envia una peticion a un servidor web y regresa los datos que son recuperados 
   * en formato JSON.
   * 
   * Ejemplo de consulta:
   * {"action": "select", "data": "SELECT * FROM myTabla"}
   * 
   * @param query Es la consulta a realizar.
   * @param inUrl Es la url a la que se desea hacer post.
   * @param timeout Tiempo limite para terminar el proceso.
   * @return Es la respuesta del servidor según la consulta que se realice 
   * puede ser un Array<Object> o una cadena de texto
   *  | reject Es una cadena de texto con la respuesta del servidor o un mensaje de error.
   */
  postRawQueryOpenUrl(query: any, inUrl: string, timeout?: number): any {
    return new Promise((resolve, reject) => {
      // Esta instrucion envia los datos
      this.http.post(inUrl, query, this.options).subscribe(response => {
        try {
          let result = JSON.parse(response["_body"]);
          resolve(result);
        } catch (error) {
          reject(`Error: ${error}, Content: ${response["_body"]}`);
        }
      }, fail => {
        console.log(fail["_body"]);
        reject(`Fail ${JSON.stringify(fail)}`);
      });
      if (timeout) {
        setTimeout(() => {
          reject("No tienes conexión a internet");
        }, timeout);
      }
    });
  }
}