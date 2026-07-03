import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FavoritesPage } from './favorites.page';
import { FavoritesPageRoutingModule } from './favorites-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FavoritesPageRoutingModule],
  declarations: [FavoritesPage],
})
export class FavoritesPageModule {}
