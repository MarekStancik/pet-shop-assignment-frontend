import { Component, OnInit } from '@angular/core';
import { PetService } from '../shared/pet.service';
import { Pet } from '../pet';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {
  pets: Pet[];
  selectedPet: Pet;

  constructor(private petService: PetService) { }

  ngOnInit() {
    this.petService.getAll().subscribe(pets => this.pets = pets);
  }

  onSelect(pet: Pet){
    this.selectedPet = pet;
  }

}
