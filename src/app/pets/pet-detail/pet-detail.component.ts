import { Component, OnInit,Input } from '@angular/core';
import { Pet } from '../pet';
import { PetService } from '../shared/pet.service';


@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.scss']
})
export class PetDetailComponent implements OnInit {
  @Input() pet: Pet;
  constructor(private petService: PetService) { }

  ngOnInit() {
    if(this.pet)
    {
      this.petService.getById(this.pet.id).subscribe(pet => this.pet = pet);
    }
  }

}
