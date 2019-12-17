import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/owners/owner';
import { FormGroup, FormControl } from '@angular/forms';
import { OwnerService } from 'src/app/owners/shared/owner.service'

@Component({
  selector: 'app-admin-owners',
  templateUrl: './admin-owners.component.html',
  styleUrls: ['./admin-owners.component.scss']
})
export class AdminOwnersComponent implements OnInit {

  owners: Owner[];
  selectedOwner: Owner;
  isCreating: boolean;

  ownerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private ownerService: OwnerService) 
  { 

  }

  ngOnInit() {
    this.refresh();
  }

  /**
   * Refresh the content of the page by loading most current owners
   * And by seting selected owner to null 
   */
  refresh() {
    this.isCreating = false;
    this.selectedOwner = null;
    this.ownerService.getAll().subscribe(receivedOwners => this.owners = receivedOwners);
  }

  /**
   * Sets creating tag to true
   * Reset owner form
   */
  prepareCreate(){
    this.isCreating=true;
    this.selectedOwner = null;
    this.ownerForm.reset();
  }

  save(){
    const owner = this.ownerForm.value;
    if(!this.isCreating)
      owner.id = this.selectedOwner.id;
    var subcription = this.isCreating ? this.ownerService.create(owner) : this.ownerService.update(owner);
    subcription.subscribe(_ => this.refresh());
  }

  onSelect(owner: Owner){
    this.selectedOwner = owner;
    this.ownerForm.patchValue({
      firstName: owner.firstName,
      lastName: owner.lastName,
      address: owner.address,
      phoneNumber: owner.phoneNumber,
      email: owner.email
    });
  }

  onDelete(owner: Owner){
    this.ownerService.delete(owner).subscribe(_ => this.refresh());
  }

}
