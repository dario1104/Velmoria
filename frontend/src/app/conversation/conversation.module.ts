import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConversationPage } from './conversation.page';
import { ConversationPageRoutingModule } from './conversation-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConversationPageRoutingModule
  ],
  declarations: [ConversationPage]
})
export class ConversationPageModule {}
