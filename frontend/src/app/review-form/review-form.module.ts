import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReviewFormPage } from './review-form.page';
import { ReviewFormPageRoutingModule } from './review-form-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReviewFormPageRoutingModule],
  declarations: [ReviewFormPage],
})
export class ReviewFormPageModule {}
