import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { CardComponent } from '../components/card/card.component';
import { DetailComponent } from '../components/detail/detail.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const ngModules = [MatProgressSpinnerModule];

@NgModule({
  imports: [
    ...ngModules,
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, CardComponent, DetailComponent],
})
export class HomePageModule {}
