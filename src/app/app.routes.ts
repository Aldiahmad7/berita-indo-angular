import { Routes } from '@angular/router'
import { HomeComponent } from './features/home/home.component'
import { DetailComponent } from './features/detail/detail.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'kategori/:kategori', component: HomeComponent },
  { path: 'detail', component: DetailComponent }
]
