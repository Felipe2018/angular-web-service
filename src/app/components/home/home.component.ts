import { Component, OnInit } from '@angular/core';
import { WebService } from '../common/utilities/_services/index';

/**
 * Genera la vista de la página principal.
 * @author Juan Lozoya <jlozoya1995@gmail.com>
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  li_resultados: UserData[] = [];
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
   * @param action Es el nombre de la acción que se quiere realizar, puede variar dependiendo de lo que este
   * escrito en el servidor que se espera recibir.
   * @param data Es una cadena de texto o un diccionario de datos, dependiendo de lo que este
   * escrito en el servidor que se espera recibir.
   */
  consultarConPost(acction: string, data: any) {
    const query = {
      acction: acction,
      data: data
    };
    this.webService.postRawQuery(query, 10000).then((response: UserData[]) => {
      this.li_resultados = response;
    }, fail => {
      console.log(fail);
    });
  }
}

export interface UserData {
  dato_1: string;
  dato_2: string;
  dato_3: string;
  dato_4: string;
}
