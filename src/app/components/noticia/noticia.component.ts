import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

	@Input() noticia: Article;
	@Input() indice: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser,
              public actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocalService: DataLocalService,
              public toastController: ToastController) { }

  ngOnInit() {}

  abrirNoticia(){
  	 const browser = this.iab.create(this.noticia.url, '_system');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      color: 'primary',
      duration: 500,
      position: 'top'
    });
    toast.present();
  }

  async larzarMenu(){

    let guardarBorrarBtn;

    if (this.enFavoritos) { 
      // borrar de favoritos
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        cssClass: 'action-dark',
        icon: 'trash',
        handler: () => {
          console.log('Borrar en Favorito');
          this.dataLocalService.borrarNoticia(this.noticia);
          this.presentToast('Eliminado exitosamente');
        }
      };
    } else {
     guardarBorrarBtn = {
        text: 'Favorito',
        cssClass: 'action-dark',
        icon: 'star',
        handler: () => {
          console.log('Favorito');
          this.dataLocalService.guardarNoticia(this.noticia);
          this.presentToast('Guardado en Favoritos exitosamente');
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Compartir',
        cssClass: 'action-dark',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
      guardarBorrarBtn,
       {
        text: 'Cancelar',
        cssClass: 'action-dark',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
