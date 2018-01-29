import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/timeout';
/**
 * Maneja las consultas a un web service, es un proveedor Http echo para ser llamado
 * desde toda la aplicación y realizar los post al servidor desde aquí.
 * @author <a href="https://www.youtube.com/channel/UCV_hl9Z6PnvlwQOhmikjrBQ" target="_blank">Juan Lozoya</a>
 * @see [Http](https://angular.io/guide/http), [Services](https://angular.io/tutorial/toh-pt4)
 */
@Injectable()
export class ApiService {

  /**
   * Es la url del servidor.
   *
   * Llama a la función getCorrectUrl()
   */
  url = `http://${this.getCorrectUrl()}/angular-web-service`;

  constructor(
    private http: Http
  ) { }
  /**
   * Para hacer referencia a un servidor local, cuando se están haciendo pruebas, por ejemplo,
   * al utilizar __ng serve__ y al encontrarse la aplicación en producción hace referencia al
   * servidor donde se encuentre alojada.
   *
   * Ejecuta una regex para saber si la url es válida, con esta función no es necesario estar
   * definiendo la dirección del servidor de desarrollo o de producción.
   */
  getCorrectUrl() {
    if (typeof location.host === "undefined" || (/(localhost|127.0.0.1)?$/).test(location.host) || location.host === "") {
      // Puedes cambiar esta dirección para hacer referencia a tu servidor de desarrollo.
      return "localhost";
    } else {
      // Dirección arrastrada desde la url.
      return location.host;
    }
  }
  /**
   * Regresa la url del servidor web ej. "http://xxx.xxx.xxx.xxx/angular-web-service".
   * @return {string} Regresa la url.
   */
  getUrl(): string {
    return this.url;
  }
  /**
   * Se envia una peticion `POST` a un servidor web y regresa los datos que son recuperados.
   *
   * Ejemplo de uso:
   *
   * ```typescript
   * const query = {
   *  foo: foo,
   *  var: var
   * };
   * this.webConnectionService.postRawQuery(inUrl, query, 10000).then(
   * (success) => {
   *  console.log(success);
   * }, fail => {
   *  console.log(fail);
   * });
   * ```
   *
   * @param {string} inUrl url a donde hacer post.
   * @param {any} query Es la consulta a realizar.
   * @param {number} timeout Tiempo limite para terminar la consulta, 10000 ms por defecto.
   * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
   */
  postRawQuery(inUrl: string, query?: any, timeout?: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const options = new RequestOptions({
        headers: headers
      });
      this.http.post(`${this.url}${inUrl}`, query, options).timeout(timeout || 10000).subscribe(response => {
        try {
          const data = JSON.parse(response['_body']);
          resolve(data);
        } catch (error) {
          console.log('Error [api-65]', error);
          reject({type: 'error', data: 'SERVER.ERROR', verbose: response});
        }
      }, fail => {
        try {
          const data = JSON.parse(fail['_body']);
          reject(data);
        } catch (error) {
          console.log('Error [api-73]', error);
          reject({type: 'error', data: 'SERVER.ERROR', verbose: fail});
        }
      });
    });
  }
  /**
   * Se envia una peticion `GET` a un servidor web y regresa los datos que son recuperados.
   *
   * Ejemplo de uso:
   *
   * ```typescript
   * this.webConnectionService.getRawQuery(inUrl, query, 10000).then(
   * (success) => {
   *  console.log(success);
   * }, fail => {
   *  console.log(fail);
   * });
   * ```
   *
   * @param {string} inUrl url a donde hacer post.
   * @param {number} timeout Tiempo limite para terminar la consulta, 10000 ms por defecto.
   * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
   */
  getRawQuery(inUrl: string, query?: any, timeout?: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const options = new RequestOptions({
        headers: headers
      });
      this.http.get(`${this.url}${inUrl}`, options).timeout(timeout || 10000).subscribe(response => {
        try {
          const data = JSON.parse(response['_body']);
          resolve(data);
        } catch (error) {
          console.log('Error [api-113]', error);
          reject({type: 'error', data: 'SERVER.ERROR', verbose: response});
        }
      }, fail => {
        try {
          const data = JSON.parse(fail['_body']);
          reject(data);
        } catch (error) {
          console.log('Error [api-121]', error);
          reject({type: 'error', data: 'SERVER.ERROR', verbose: fail});
        }
      });
    });
  }
  /**
   * Se envia una peticion `DELETE` a un servidor web y regresa los datos que son recuperados.
   *
   * Ejemplo de uso:
   *
   * ```typescript
   * this.webConnectionService.deleteRawQuery(inUrl, 10000).then(
   * (success) => {
   *  console.log(success);
   * }, fail => {
   *  console.log(fail);
   * });
   * ```
   *
   * @param {string} inUrl url a donde hacer post.
   * @param {number} timeout Tiempo limite para terminar la consulta, 10000 ms por defecto.
   * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
   */
  deleteRawQuery(inUrl: string, timeout?: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const options = new RequestOptions({
        headers: headers
      });
      this.http.delete(`${this.url}${inUrl}`, options).timeout(timeout || 10000).subscribe(response => {
        try {
          const data = JSON.parse(response['_body']);
          resolve(data);
        } catch (error) {
          console.log('Error [api-161]', error);
          reject({type: 'error', data: 'SERVER.ERROR', verbose: response});
        }
      }, fail => {
        try {
          const data = JSON.parse(fail['_body']);
          reject(data);
        } catch (error) {
          console.log('Error [api-169]', error);
          reject({type: 'error', data: 'SERVER.ERROR', verbose: fail});
        }
      });
    });
  }
  /**
   * Se envia una peticion `PUT` a un servidor web y regresa los datos que son recuperados.
   *
   * Ejemplo de uso:
   *
   * ```typescript
   * const query = {
   *  foo: foo,
   *  var: var
   * };
   * this.webConnectionService.putRawQuery(inUrl, query, 10000).then(
   * (success) => {
   *  console.log(success);
   * }, fail => {
   *  console.log(fail);
   * });
   * ```
   *
   * @param {string} inUrl url a donde hacer post.
   * @param {any} query Es la consulta a realizar.
   * @param {number} timeout Tiempo limite para terminar la consulta, 10000 ms por defecto.
   * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
   */
  putRawQuery(inUrl: string, query?: any, timeout?: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const options = new RequestOptions({
        headers: headers
      });
      this.http.put(`${this.url}${inUrl}`, query, options).timeout(timeout || 10000).subscribe(response => {
        try {
          const data = JSON.parse(response['_body']);
          resolve(data);
        } catch (error) {
          console.log('Error [api-214]', error);
          reject({type: 'error', data: 'SERVER.ERROR', verbose: response});
        }
      }, fail => {
        try {
          const data = JSON.parse(fail['_body']);
          reject(data);
        } catch (error) {
          console.log('Error [api-222]', error);
          reject({type: 'error', data: 'SERVER.ERROR', verbose: fail});
        }
      });
    });
  }
}
