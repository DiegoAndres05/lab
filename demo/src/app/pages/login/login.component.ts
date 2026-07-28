import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
  <div class="login-container">
    <div class="login-bg"></div>
    <div class="login-card">
      <div class="login-header">
        <img [src]="logoSrc" alt="Cartagena Tailored Travel" class="logo-img" />
        <p class="tagline">Tu agencia de viajes de confianza en Cartagena de Indias</p>
      </div>
      <form (ngSubmit)="handleLogin()" class="login-form">
        <div class="field">
          <label for="email">Correo electrónico</label>
          <input id="email" type="email" [(ngModel)]="email" name="email"
            placeholder="admin@cartagenatailoredtravel.com" required autocomplete="email" />
        </div>
        <div class="field">
          <label for="password">Contraseña</label>
          <input id="password" type="password" [(ngModel)]="password" name="password"
            placeholder="Ingresa tu contraseña" required autocomplete="current-password" />
        </div>
        @if (error) { <div class="error-message">{{ error }}</div> }
        <button type="submit" class="login-btn" [disabled]="loading">
          @if (loading) { <span class="spinner"></span> }
          {{ loading ? 'Ingresando…' : 'Ingresar al panel' }}
        </button>
      </form>
    </div>
  </div>
  `,
  styles: `
    :host { display: block; min-height: 100vh; font-family: 'Inter', sans-serif; }
    .login-container { display: flex; min-height: 100vh; position: relative; }
    .login-bg { flex: 1; background: url('/images/fondocartagena.jpg') center/cover no-repeat; }
    .login-card { width: 440px; display: flex; flex-direction: column; justify-content: center; padding: 3rem; background: #FFF; }
    .login-header { text-align: center; margin-bottom: 2.5rem; }
    .logo-img { height: 48px; margin-bottom: 1rem; }
    .tagline { color: #8e8e93; font-size: .85rem; font-weight: 400; }
    .login-form { display: flex; flex-direction: column; gap: 1.25rem; }
    .field { display: flex; flex-direction: column; gap: .4rem; }
    label { font-size: .85rem; font-weight: 600; color: #0F1B3D; }
    input { padding: .8rem 1rem; border: 1.5px solid #e5e5ea; border-radius: 10px; font-size: .95rem; transition: border-color .2s,box-shadow .2s; outline: none; font-family: inherit; }
    input:focus { border-color: #C9A84C; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }
    input::placeholder { color: #c7c7cc; }
    .error-message { background: #fef2f2; color: #dc2626; padding: .7rem 1rem; border-radius: 10px; font-size: .85rem; font-weight: 500; }
    .login-btn { background: #C9A84C; color: #fff; border: none; border-radius: 10px; padding: .9rem; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background .2s,transform .1s; display: flex; align-items: center; justify-content: center; gap: .5rem; font-family: inherit; }
    .login-btn:hover:not(:disabled) { background: #b8973a; }
    .login-btn:active:not(:disabled) { transform: scale(.98); }
    .login-btn:disabled { opacity: .7; cursor: not-allowed; }
    .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin .6s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `,
})
export class LoginComponent {
  logoSrc = environment.logoUrl;
  email = 'admin@cartagenatailoredtravel.com';
  password = '';
  loading = false;
  error = '';
  constructor(private auth: AuthService, private router: Router) {}

  async handleLogin() {
    if (!this.email || !this.password) { this.error = 'Por favor completa todos los campos.'; return; }
    this.loading = true; this.error = '';
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.error = err.message === 'Invalid login credentials'
        ? 'Correo o contraseña incorrectos.' : err.message || 'Error al iniciar sesión.';
    } finally { this.loading = false; }
  }
}
