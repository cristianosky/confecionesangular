import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Confesion';
  confesiones = []
  form= new FormGroup({
    iconfesion:new FormControl('',Validators.required)
  })
  confesion: Observable<any[]>;
  constructor(public api:AngularFireDatabase){
    this.confesion = api.list('confesion').valueChanges();
    this.confesion.subscribe(data=>{
      this.form.controls.iconfesion.reset()

      const array1 = data

      this.confesiones = array1.reverse()
    })

    

  }

  guardar(confi){
    this.api.list('confesion').push({ content: confi,fecha:moment().format('DD-MM-YYYY hh:mm') });
  }
  
}
