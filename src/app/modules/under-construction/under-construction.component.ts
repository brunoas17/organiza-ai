import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-under-construction',
  imports: [FormsModule],
  templateUrl: './under-construction.component.html',
  styleUrl: './under-construction.component.scss'
})
export class UnderConstructionComponent implements OnInit {

  #apiService = inject(ApiService);

  ngOnInit() {

  }

  subscribe(email: NgModel) {

    if(email.valid) {

      this.#apiService.createData('newsletter', { email: email.value }).subscribe((res) => {
        console.log(res);
      })

    }

  }

}
