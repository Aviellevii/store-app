import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm!:FormGroup;
  isSubmitted = false;

  returnUrl = '';
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private userService:UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(5)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]],
      confirmPassword:['',[Validators.required]],
      address:['',[Validators.required,Validators.minLength(10)]]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;
  }

  passwordMatchingValidatior(fg: FormGroup): Validators {
    if(fg.get('password')?.value === fg.get('confirmPassword')?.value){
      return {notmatched:false};
    }
    return {notmatched:true}
}
get fc(){
  return this.registerForm.controls;
}
submit(){
  this.isSubmitted = true;
  if(this.registerForm.invalid) return;

  const fv= this.registerForm.value;

  const user :IUserRegister={
    name:fv.name,
    email:fv.email,
    password:fv.password,
    confirmPassword:fv.confirmPassword,
    address:fv.address
  }
  this.userService.Register(user).subscribe(()=>{
    this.router.navigateByUrl(this.returnUrl);
  })
}

}
