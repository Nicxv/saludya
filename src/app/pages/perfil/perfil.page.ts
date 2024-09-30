import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private auth: AuthService, private interaction: InteractionService, private router: Router) { }

  logout() {
    this.auth.logout();
    this.interaction.presentToast('Has cerrado sesión');
    this.router.navigate(['/login'])
  }

  ngOnInit() {
    
  }

}
