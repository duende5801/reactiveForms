import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  get fName() { return this.userForm.get('fName');}
  get lName() { return this.userForm.get('lName');}
  get mName() { return this.userForm.get('mName');}

  myUser = {fName: 'David', lName: 'Abdallah', mName: 'Andrew', hasMiddleName: true}
  	
setValue() {
  this.userForm.setValue({
    fName: 'Cassandra',
    lName: 'Pamplona',
    mName: 'Casey',
    hasMiddleName: true
  });
}

setValue2() {
  this.userForm.setValue(this.myUser);
}

patchValue(){
  this.userForm.patchValue({
    fName: 'Casey'
  });
}
submitForm() {
  if(this.userForm.invalid){
    alert('Hey Fix your errors!')
  } else{
    alert('Successful')
    console.log(this.userForm.value);
    this.userForm.reset();
  }
}
  
  ngOnInit() {
    // this.userForm = new FormGroup({
    //   fName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    //   lName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    //   mName: new FormControl('', Validators.required),
    //   hasMiddleName: new FormControl(false)
    // });
    this.userForm = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', [Validators.required, Validators.minLength(2)]],
      mName: ['', Validators.required],
      hasMiddleName: false
    });
    this.userForm.get('hasMiddleName').valueChanges.subscribe(value =>{
      if(value){
        this.mName.clearValidators();
      } else{
        this.mName.setValidators(Validators.required);
      }
      this.mName.updateValueAndValidity();
    });
}}
