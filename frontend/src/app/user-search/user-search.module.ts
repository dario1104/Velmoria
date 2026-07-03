import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserSearchPage } from './user-search.page';
import { UserSearchPageRoutingModule } from './user-search-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserSearchPageRoutingModule
  ],
  declarations: [UserSearchPage]
})
export class UserSearchPageModule {}
