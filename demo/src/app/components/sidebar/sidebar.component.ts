import { Component, output } from '@angular/core';
import { environment } from '../../../environments/environment';

interface NavItem { label: string; icon: string; active?: boolean; }

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="logo">
        <img [src]="logoUrl" alt="Cartagena Tailored Travel" class="logo-img" />
      </div>
    </div>
    <nav class="sidebar-nav">
      @for (item of navItems; track item.label) {
        <a class="nav-item" [class.active]="item.active" (click)="selectNav(item)">
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </a>
      }
    </nav>
    <div class="sidebar-footer">
      <div class="agent-card">
        <div class="agent-icon">🧭</div>
        <div class="agent-info">
          <strong>Asistente de Viajes</strong>
          <p>Consultas y recomendaciones IA</p>
        </div>
      </div>
      <button class="logout-btn" (click)="logout.emit()"><span>🚪</span> Cerrar sesión</button>
    </div>
  </aside>
  `,
  styles: `
    .sidebar { width: 260px; min-height: 100vh; background: #0F1B3D; display: flex; flex-direction: column; padding: 1.5rem 1rem; font-family: 'Inter', sans-serif; }
    .sidebar-header { margin-bottom: 2rem; padding: 0 .5rem; }
    .logo-img { height: 40px; }
    .sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: .15rem; }
    .nav-item { display: flex; align-items: center; gap: .75rem; padding: .7rem .9rem; border-radius: 10px; color: rgba(255,255,255,0.6); text-decoration: none; font-size: .9rem; font-weight: 500; cursor: pointer; transition: background .15s,color .15s; }
    .nav-item:hover { background: rgba(255,255,255,0.08); color: #fff; }
    .nav-item.active { background: rgba(201,168,76,0.2); color: #C9A84C; font-weight: 600; }
    .nav-icon { font-size: 1.1rem; width: 22px; text-align: center; }
    .sidebar-footer { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); }
    .agent-card { background: rgba(255,255,255,0.06); border-radius: 12px; padding: 1rem; display: flex; gap: .75rem; }
    .agent-icon { font-size: 1.3rem; }
    .agent-info strong { font-size: .85rem; color: #fff; display: block; }
    .agent-info p { font-size: .75rem; color: rgba(255,255,255,0.5); margin: .2rem 0 0; line-height: 1.4; }
    .logout-btn { display: flex; align-items: center; gap: .6rem; padding: .7rem .9rem; border: none; background: transparent; color: rgba(255,255,255,0.5); font-size: .9rem; font-weight: 500; border-radius: 10px; cursor: pointer; transition: background .15s,color .15s; font-family: inherit; }
    .logout-btn:hover { background: rgba(239,68,68,0.1); color: #ef4444; }
  `,
})
export class SidebarComponent {
  readonly logout = output<void>();
  logoUrl = environment.logoUrl;
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: '📊', active: true },
    { label: 'Reservas', icon: '📋' },
    { label: 'Catálogo', icon: '🏝️' },
    { label: 'Hospedaje', icon: '🏠' },
    { label: 'Clientes', icon: '👥' },
    { label: 'Pagos', icon: '💰' },
    { label: 'WhatsApp', icon: '💬' },
    { label: 'Reportes', icon: '📈' },
    { label: 'Configuración', icon: '⚙️' },
  ];
  selectNav(selected: NavItem) { this.navItems.forEach(n => n.active = false); selected.active = true; }
}
