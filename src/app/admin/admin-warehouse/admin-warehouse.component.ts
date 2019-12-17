import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/pets/pet';
import { PetService } from 'src/app/pets/shared/pet.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-warehouse',
  templateUrl: './admin-warehouse.component.html',
  styleUrls: ['./admin-warehouse.component.scss']
})
export class AdminWarehouseComponent implements OnInit {
  pets: Pet[];
  selectedPet: Pet;
  isCreating: boolean;

  petForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    birthDate: new FormControl(''),
    soldDate: new FormControl(''),
    price: new FormControl(0),
  });

  constructor(private petService: PetService) { }

  ngOnInit() {
    this.refresh();
  }

  save(){
    const pet = this.petForm.value;
    if(!this.isCreating)
      pet.id = this.selectedPet.id;
    var subcription = this.isCreating ? this.petService.create(pet) : this.petService.update(pet);
    subcription.subscribe(() => this.refresh());
  }

  refresh(){
    this.isCreating = false;
    this.selectedPet = null;
    this.petService.getAll().subscribe(pets => this.pets = pets);
  }

  onSelect(pet: Pet) {
    this.isCreating = false;
    this.selectedPet = pet;
    this.petForm.patchValue({
      name: pet.name,
      type: pet.type,
      birthDate: pet.birthDate,
      soldDate: pet.soldDate,
      price: pet.price,
    });
  }

  onDelete(pet: Pet){
    this.petService.delete(pet).subscribe( ()=>
    {
      this.refresh();
    });
  }

  prepareCreate(){
    this.isCreating=true;
    this.selectedPet= null;
    this.petForm.reset();
  }

}
