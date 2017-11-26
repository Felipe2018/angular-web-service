import { Component, OnInit } from '@angular/core';
import { WebService } from '../common/utilities/_services/index';
/**
 * Establece la vista de la página home.
 * @author <a href="https://www.youtube.com/channel/UCV_hl9Z6PnvlwQOhmikjrBQ" target="_blank">Juan Lozoya</a>
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  /**
   * Es un array donde se almacenarían los datos resultantes de la consulta.
   */
  liResultados: HomeComponentLiResultados[] = [];
  /**
   * Es el número de la página de la tabla seleccionado.
   */
  pageNumber = 1;

  constructor(
    private webService: WebService
  ) { }
  ngOnInit() {
    this.consultarConPost("select", "SELECT * FROM myTabla;");
  }
  /**
   * Llama la función postRawQuery del servicio phpConnectionService y le pasa como parámetro lo que se va
   * a enviar al servidor.
   *
   * @param {string} action Es el nombre de la acción que se quiere realizar, puede variar dependiendo de lo que este
   * escrito en el servidor que se espera recibir.
   * @param {any} data Es una cadena de texto o un diccionario de datos, dependiendo de lo que este
   * escrito en el servidor que se espera recibir.
   */
  consultarConPost(acction: string, data: any) {
    const query = {
      acction: acction,
      data: data
    };
    this.webService.postRawQuery(query, 10000).then((response: HomeComponentLiResultados[]) => {
      this.liResultados = response;
    }, fail => {
      console.log(fail);
    });
  }
}
/**
 * Las interfaces en TypeScript sirven para definir tipos de clases variables y funciones,
 * pero si no necesitas tener definidas las variables puedes omitir utilizarlas.
 */
export interface HomeComponentLiResultados {
  dato_1: string;
  dato_2: string;
  dato_3: string;
  dato_4: string;
}
