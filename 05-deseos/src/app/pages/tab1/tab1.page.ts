import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  paginaActual: string;

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertController: AlertController ) {
  
                this.paginaActual = 'tab1';


  }

  // la pablabra async transforma toda la funcion en una promesa
  // cuando la funcion es una promesa se puede utilizar la clausula
  // await, que hace que se espere hasta se ejecute el codigo y lo almacene en la varible
  async agregarLista() {
    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder:  'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: ( data ) => {

              if ( data.titulo.length === 0) {
                 return;
              }

              const listaId = this.deseosService.crearLista(data.titulo);

              this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          }
        }
      ]
    });

    alert.present();

  }
}
