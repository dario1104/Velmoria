import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WishlistPage } from './wishlist.page';
import { WishlistPageRoutingModule } from './wishlist-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, WishlistPageRoutingModule],
  declarations: [WishlistPage],
})
export class WishlistPageModule {}
