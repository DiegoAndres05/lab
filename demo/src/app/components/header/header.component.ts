import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
  <header class="header">
    <div class="header-left">
      <h1 class="page-title">{{ title() }}</h1>
      <span class="date">{{ date() }}</span>
    </div>
    <div class="header-right">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Buscar reservas, clientes..." class="search-input" />
      </div>
      <button class="icon-btn">🔔</button>
      <div class="user-profile">
        <div class="avatar">{{ userName().charAt(0) }}</div>
        <div class="user-info">
          <span class="user-name">{{ userName() }}</span>
          <span class="user-role">{{ userRole() }}</span>
        </div>
      </div>
    </div>
  </header>
  `,
  styles: `
    .header { height: 72px; background: #FFF; border-bottom: 1px solid #edf2f7; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; position: sticky; top: 0; z-index: 10; font-family: 'Inter', sans-serif; }
    .header-left { display: flex; flex-direction: column; }
    .page-title { font-size: 1.5rem; font-weight: 700; color: #0F1B3D; margin: 0; }
    .date { font-size: .85rem; color: #8e8e93; margin-top: .15rem; }
    .header-right { display: flex; align-items: center; gap: 1.25rem; }
    .search-box { display: flex; align-items: center; gap: .5rem; background: #f8fafc; border-radius: 10px; padding: .5rem 1rem; width: 260px; border: 1px solid #e2e8f0; }
    .search-icon { font-size: .9rem; }
    .search-input { border: none; background: transparent; outline: none; font-size: .85rem; width: 100%; font-family: inherit; }
    .search-input::placeholder { color: #94a3b8; }
    .icon-btn { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; width: 40px; height: 40px; font-size: 1.1rem; cursor: pointer; transition: background .15s; display: flex; align-items: center; justify-content: center; }
    .icon-btn:hover { background: #e2e8f0; }
    .user-profile { display: flex; align-items: center; gap: .75rem; }
    .avatar { width: 40px; height: 40px; border-radius: 50%; background: #C9A84C; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; }
    .user-info { display: flex; flex-direction: column; }
    .user-name { font-size: .9rem; font-weight: 600; color: #0F1B3D; }
    .user-role { font-size: .75rem; color: #8e8e93; }
  `,
})
export class HeaderComponent {
  readonly title = input('Dashboard');
  readonly date = input('');
  readonly userName = input('Admin');
  readonly userRole = input('Agencia de Viajes');
}
