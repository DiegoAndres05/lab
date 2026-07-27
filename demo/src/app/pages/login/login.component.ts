import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="logo-icon">💅</div>
        <h1>BellaAgenda</h1>
        <p class="subtitle">Tu agenda de belleza</p>
      </div>
      <form (ngSubmit)="handleLogin()" class="login-form">
        <div class="field">
          <label for="email">Correo electrónico</label>
          <input id="email" type="email" [(ngModel)]="email" name="email"
            placeholder="tucorreo@ejemplo.com" required autocomplete="email" />
        </div>
        <div class="field">
          <label for="password">Contraseña</label>
          <input id="password" type="password" [(ngModel)]="password" name="password"
            placeholder="••••••••" required autocomplete="current-password" />
        </div>
        @if (error) { <div class="error-message">{{ error }}</div> }
        <button type="submit" class="login-btn" [disabled]="loading">
          @if (loading) { <span class="spinner"></span> }
          {{ loading ? 'Iniciando sesión…' : 'Iniciar sesión' }}
        </button>
      </form>
      <p class="register-link">¿No tienes cuenta? Crea una desde Supabase Dashboard</p>
    </div>
  </div>
  `,
  styles: `
    :host { display: block; min-height: 100vh; background: linear-gradient(135deg,#FCEAF1 0%,#FAFAFA 50%,#F0F4FF 100%); font-family: 'Inter', sans-serif; }
    .login-container { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 1rem; }
    .login-card { background: #FFF; border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.06); padding: 2.5rem 2rem; width: 100%; max-width: 400px; animation: fadeIn .5s ease; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    .login-header { text-align: center; margin-bottom: 2rem; }
    .logo-icon { font-size: 3rem; margin-bottom: .5rem; }
    h1 { font-size: 1.75rem; font-weight: 700; color: #1a1a2e; margin: 0; }
    .subtitle { color: #8e8e93; font-size: .9rem; margin: .25rem 0 0; }
    .login-form { display: flex; flex-direction: column; gap: 1.25rem; }
    .field { display: flex; flex-direction: column; gap: .4rem; }
    label { font-size: .85rem; font-weight: 600; color: #3a3a3a; }
    input { padding: .8rem 1rem; border: 1.5px solid #e5e5ea; border-radius: 12px; font-size: .95rem; transition: border-color .2s,box-shadow .2s; outline: none; font-family: inherit; }
    input:focus { border-color: #F8A8C9; box-shadow: 0 0 0 3px rgba(248,168,201,0.15); }
    input::placeholder { color: #c7c7cc; }
    .error-message { background: #fff0f0; color: #e74c3c; padding: .7rem 1rem; border-radius: 10px; font-size: .85rem; font-weight: 500; }
    .login-btn { background: #F8A8C9; color: #fff; border: none; border-radius: 12px; padding: .9rem; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background .2s,transform .1s; display: flex; align-items: center; justify-content: center; gap: .5rem; font-family: inherit; }
    .login-btn:hover:not(:disabled) { background: #f08cb5; }
    .login-btn:active:not(:disabled) { transform: scale(.98); }
    .login-btn:disabled { opacity: .7; cursor: not-allowed; }
    .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin .6s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .register-link { text-align: center; margin-top: 1.5rem; font-size: .85rem; color: #8e8e93; }
  `,
})
export class LoginComponent {
  email = '';
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
