import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
/**
 * @name Api
 * @description
 * Api es un controlador genérico de REST Api. Establezca su URL de API primero.
 *
 * @usage
 *
 * ```typescript
 * import { ApiService } from '../../providers/providers';
 *
 * class MyClass {
 *  constructor(private api: ApiService) {
 *    this.miFunction();
 *  }
 *
 *  myFunction() {
 *    this.api.post(inUrl, 'query').then((success) => {
 *      console.log(success);
 *    }, fail => {
 *      console.log(fail);
 *    });
 *  }
 * }
 * ```
 */
@Injectable()
export class ApiService {
  /**
   * Es la variable donde se asigna la url.
   */
   protected url = 'https://quesidogo.com/big_thinks_back';
  // protected url = 'http://localhost/big_thinks_back';

  constructor(
    private http: Http
  ) {
  }
  /**
   * Regresa la url del servidor web ej.: 'http://xxx.xxx.xxx.xxx/xx'.
   * @return {string} url
   */
  public getUrl(): string {
    return this.url;
  }
  /**
   * Regresa el host del servidor web ej.: 'xxx.xxx.xxx.xxx'.
   * @return {string} url
   */
  public getHost(): string {
    return this.url.split('/').slice(0, -1).join('/');
  }
  /**
   * @name post
   * @description
   * Se envia una peticion `POST` a un servidor web y regresa los datos que son recuperados.
   *
   * @usage
   *
   * ```typescript
   * const query = {
   *  foo: foo,
   *  var: var
   * };
   * this.api.post(inUrl, query, 10000).then(
   * (success) => {
   *  console.log(success);
   * }, fail => {
   *  console.log(fail);
   * });
   * ```
   *
   * @param {string} inUrl url a donde hacer post.
   * @param {any} query Es la consulta a realizar.
   * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
   */
  public post(inUrl: string, query?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const options = new RequestOptions({
        headers: headers
      });
      this.http.post(`${this.url}${inUrl}`, query, options)
      .subscribe(response => {
        try {
          response = response.json();
          resolve(response);
        } catch (error) {
          console.log('[api-274]', response);
          reject(response);
        }
      }, fail => {
        try {
          fail = fail.json();
        } catch (error) {
          console.log('[api-108]', fail);
        }
        reject(fail);
      });
    });
  }
  /**
   * @name get
   * @description
   * Se envia una peticion `GET` a un servidor web y regresa los datos que son recuperados.
   *
   * @usage
   *
   * ```typescript
   * this.api.get(inUrl, 10000).then(
   * (success) => {
   *  console.log(success);
   * }, fail => {
   *  console.log(fail);
   * });
   * ```
   *
   * @param {string} inUrl url a donde hacer post.
   * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
   */
  public get(inUrl: string): Promise<any> {
    const formedUrl = this.filterAccents(inUrl.split(' ').join('-'));
    return new Promise((resolve, reject) => {
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const options = new RequestOptions({
        headers: headers
      });
      this.http.get(`${this.url}${formedUrl}`, options)
      .subscribe(response => {
        try {
          response = response.json();
          resolve(response);
        } catch (error) {
          console.log('[api-274]', response);
          reject(response);
        }
      }, fail => {
        try {
          fail = fail.json();
        } catch (error) {
          console.log('[api-162]', fail);
        }
        reject(fail);
      });
    });
  }
  /**
   * Elimina los acentos de una cadena.
   * @param {string} value
   */
  private filterAccents(value: string) {
    const accents = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
    const original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
    for (let i = 0; i < accents.length; i++) {
      value = value.replace(accents.charAt(i), original.charAt(i));
    }
    return value;
  }
  /**
   * @name delete
   * @description
   * Se envia una peticion `DELETE` a un servidor web y regresa los datos que son recuperados.
   *
   * @usage
   *
   * ```typescript
   * this.api.delete(inUrl, 10000).then(
   * (success) => {
   *  console.log(success);
   * }, fail => {
   *  console.log(fail);
   * });
   * ```
   *
   * @param {string} inUrl url a donde hacer post.
   * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
   */
  public delete(inUrl: string): Promise<any> {
    const formedUrl = inUrl.split(' ').join('-');
    return new Promise((resolve, reject) => {
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const options = new RequestOptions({
        headers: headers
      });
      this.http.delete(`${this.url}${formedUrl}`, options)
      .subscribe(response => {
        try {
          response = response.json();
          resolve(response);
        } catch (error) {
          console.log('[api-274]', response);
          reject(response);
        }
      }, fail => {
        try {
          fail = fail.json();
        } catch (error) {
          console.log('[api-227]', fail);
        }
        reject(fail);
      });
    });
  }
  /**
   * @name put
   * @description
   * Se envia una peticion `PUT` a un servidor web y regresa los datos que son recuperados.
   *
   * @usage
   *
   * ```typescript
   * const query = {
   *  foo: foo,
   *  var: var
   * };
   * this.api.put(inUrl, query, 10000).then(
   * (success) => {
   *  console.log(success);
   * }, fail => {
   *  console.log(fail);
   * });
   * ```
   *
   * @param {string} inUrl url a donde hacer post.
   * @param {any} query Es la consulta a realizar.
   * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
   */
  public put(inUrl: string, query?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const options = new RequestOptions({
        headers: headers
      });
      this.http.put(`${this.url}${inUrl}`, query, options)
      .subscribe(response => {
        try {
          response = response.json();
          resolve(response);
        } catch (error) {
          console.log('[api-274]', response);
          reject(response);
        }
      }, fail => {
        try {
          fail = fail.json();
        } catch (error) {
          console.log('[api-284]', fail);
        }
        reject(fail);
      });
    });
  }
}
