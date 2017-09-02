## Angular web service

Para usar este proyecto es necesario instalar [node](https://nodejs.org/es/) una vez instalado desde consola abierta como administrado en windows o usando sudo en linux instalar [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm).

```bash
npm install npm -g
```

Con [npm](https://www.npmjs.com/) instalar el [CLI de angular](https://github.com/angular/angular-cli).

```bash
npm install -g @angular/cli
```

De forma opcional se puede instalar [git](https://git-scm.com/) para clonar el repositorio directamente.

```bash
git clone https://github.com/jlozoya/angular-web-service-example.git
```

Con todo lo anterior listo, hay que instalar las librerias del proyecto de forma local.

```bash
npm install
```

Y por ultimo compilar el proyecto, para lo que hay dos opciones.

Si no se quiere mover los archivos de la carpeta donde se generan y así se accesara a la página en la dirección localhost/angular-web-service/dist/

```bash
ng build --base-href /angular-web-service/dist/ --prod
```

O una vez generados los archivos se pueden mover de la carpeta donde se generan a la raíz del web host.

```bash
ng build --base-href /
```
## Angular CLI

Este proyecto se generó con [Angular CLI](https://github.com/angular/angular-cli) versión 1.3.2.

## Servidor de desarrollo

Ejecute `ng serve` para un servidor dev. Navegue hasta `http://localhost:4200/`. La aplicación se volverá a cargar automáticamente si cambia alguno de los archivos de codigo fuente.

O `ng serve --port 8000 -o` en caso de que el puerto este ocupado.

## Andamios de código

Ejecutar `ng generate component component-name` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construción

Ejecutar `ng build` para construir el proyecto. Los artefactos de compilación se almacenarán en el directorio `dist/`. Utilice el indicador `-prod` para una compilación de producción.

Para construir el proyecto y no moverlo de la carpeta donde se genera se esta usando el siguiente comando `ng build --base-href /angular-web-service/dist/ --prod`.

## Ejecución de pruebas unitarias

Ejecutar `ng test` corre las pruebas de unitarias vía [Karma](https://karma-runner.github.io).

## Ejecución de pruebas de extremo a extremo

Ejecutar `ng e2e` corre las pruebas de extremo a extremo a través de [Protractor] (http://www.protractortest.org/). Antes de ejecutar las pruebas asegúrese de que está sirviendo la aplicación a través de `ng serve`.

## Ayuda futura

Para obtener más ayuda sobre la CLI angular, utilice `ng help` o visite el [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).