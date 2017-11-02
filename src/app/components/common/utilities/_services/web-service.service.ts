import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
/**
 * Maneja las consultas a la base de datos remota, es un proveedor Http echo para ser llamado
 * desde toda la aplicación y realizar los post al servidor desde aquí.
 * @author <a href="mailto:jlozoya1995@gmail.com">Juan Lozoya</a>
 * @see [Http](https://angular.io/guide/http), [Services](https://angular.io/tutorial/toh-pt4)
 */
@Injectable()
export class WebService {

  /**
   * Es la url del servidor.
   *
   * Llama a la función getCorrectUrl()
   */
  url = `http://${this.getCorrectUrl()}/angular-web-service`;
  /**
   * Es la extención de la url a la que se desea accesar.
   */
  urlActions = `${this.url}/models/actions.php`;
  /**
   * Variable para agregarle un header al post.
   */
  options: any;

  constructor(public http: Http) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    this.options = new RequestOptions({
      headers: headers
    });
  }
  /**
   * Para hacer referencia a un servidor local, cuando se están haciendo pruebas, por ejemplo,
   * al utilizar __ng serve__ y al encontrarse la aplicación en producción hace referencia al
   * servidor donde se encuentre alojada.
   *
   * Ejecuta una regex para saber si la url es válida, con esta función no es necesario estar
   * definiendo la dirección del servidor web.
   */
  getCorrectUrl() {
    if (typeof location.host === "undefined" || (/(localhost|127.0.0.1)?$/).test(location.host)) {
      // ip privada
      return "localhost";
    } else {
      // dirección en la url
      return location.host;
    }
  }
  /**
   * Regresa la url del servidor web ej. "http://xxx.xxx.xxx.xxx/angular-web-service".
   * @return {string} Regresa la url.
   */
  public getUrl(): string {
    return this.url;
  }
  /**
   * Se envia una peticion a un servidor web y regresa los datos que son recuperados
   * en formato JSON.
   *
   * Ejemplo de consulta:
   * {"action": "select", "data": "SELECT * FROM myTabla"}
   *
   * @param {any} query Es la consulta a realizar.
   * @param {number} timeout Tiempo limite para terminar el proceso
   * @return {Promise<any> | Promise<string>} Regresa la respuesta del servidor según la consulta que
   * se realice o un mensaje de error.
   */
  postRawQuery(query: any, timeout?: number): any {
    return new Promise((resolve, reject) => {
      // Esta instrucion envia los datos
      this.http.post(this.urlActions, query, this.options).subscribe(response => {
        try {
          const result = JSON.parse(response["_body"]);
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
   * @param {any} query Es la consulta a realizar.
   * @param {string} inUrl Es la url a la que se desea hacer post.
   * @param {number} timeout Tiempo limite para terminar el proceso.
   * @return {Promise<any> | Promise<string>} Regresa la respuesta del servidor según la consulta que
   * se realice o un mensaje de error.
   */
  postRawQueryOpenUrl(query: any, inUrl: string, timeout?: number): any {
    return new Promise((resolve, reject) => {
      // Esta instrucion envia los datos
      this.http.post(inUrl, query, this.options).subscribe(response => {
        try {
          const result = JSON.parse(response["_body"]);
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
