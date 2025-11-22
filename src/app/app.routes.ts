import { Routes } from '@angular/router';
import { LoginComponant } from './Componants/login-componant/login-componant';
import { SignUpComponant } from './Componants/sign-up-componant/sign-up-componant';
import { ForgetPassword } from './Componants/forget-Password/forget-password';

export const routes: Routes = [
    {path:'login' , component:LoginComponant},
    {path:'signup', component:SignUpComponant} ,
    {path:'forget_password', component:ForgetPassword} ,
];
