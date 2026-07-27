import { Component, output } from '@angular/core';

interface NavItem { label: string; icon: string; active?: boolean; }

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-icon">💅</span>
        <div class="logo-text">
          <h2>BellaAgenda</h2>
          <span class="logo-sub">Tu agenda de belleza</span>
        </div>
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
      <div class="assistant-card">
        <div class="assistant-icon">🤖</div>
        <div class="assistant-info">
          <strong>Tu Agente IA</strong>
          <p>Asistente atento a tus mensajes en WhatsApp</p>
        </div>
      </div>
      <button class="logout-btn" (click)="logout.emit()"><span>🚪</span> Cerrar sesión</button>
    </div>
  </aside>
  `,
  styles: `
    .sidebar { width: 260px; min-height: 100vh; background: #FFF; border-right: 1px solid #f0f0f0; display: flex; flex-direction: column; padding: 1.5rem 1rem; font-family: 'Inter', sans-serif; }
    .sidebar-header { margin-bottom: 2rem; }
    .logo { display: flex; align-items: center; gap: .75rem; }
    .logo-icon { font-size: 2rem; }
    .logo-text h2 { font-size: 1.25rem; font-weight: 800; color: #1a1a2e; margin: 0; line-height: 1.2; }
    .logo-sub { font-size: .75rem; color: #8e8e93; }
    .sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: .25rem; }
    .nav-item { display: flex; align-items: center; gap: .75rem; padding: .7rem .9rem; border-radius: 12px; color: #5a5a5a; text-decoration: none; font-size: .9rem; font-weight: 500; cursor: pointer; transition: background .15s,color .15s; }
    .nav-item:hover { background: #FCEAF1; color: #1a1a2e; }
    .nav-item.active { background: #F8A8C9; color: #fff; font-weight: 600; }
    .nav-icon { font-size: 1.2rem; width: 24px; text-align: center; }
    .sidebar-footer { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #f0f0f0; }
    .assistant-card { background: #FCEAF1; border-radius: 16px; padding: 1rem; display: flex; gap: .75rem; }
    .assistant-icon { font-size: 1.5rem; }
    .assistant-info strong { font-size: .85rem; color: #1a1a2e; }
    .assistant-info p { font-size: .75rem; color: #8e8e93; margin: .25rem 0 0; line-height: 1.4; }
    .logout-btn { display: flex; align-items: center; gap: .6rem; padding: .7rem .9rem; border: none; background: transparent; color: #e74c3c; font-size: .9rem; font-weight: 500; border-radius: 12px; cursor: pointer; transition: background .15s; font-family: inherit; }
    .logout-btn:hover { background: #fff0f0; }
  `,
})
export class SidebarComponent {
  readonly logout = output<void>();
  navItems: NavItem[] = [
    { label: 'Inicio', icon: '🏠', active: true },
    { label: 'Calendario', icon: '📅' },
    { label: 'Agenda del día', icon: '📋' },
    { label: 'Catálogo', icon: '📂' },
    { label: 'Colaboradores', icon: '👥' },
    { label: 'Notificaciones', icon: '🔔' },
    { label: 'WhatsApp', icon: '💬' },
    { label: 'Ajustes', icon: '⚙️' },
    { label: 'Suscripción', icon: '⭐' },
  ];
  selectNav(selected: NavItem) { this.navItems.forEach(n => n.active = false); selected.active = true; }
}
