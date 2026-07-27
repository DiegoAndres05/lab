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
        <input type="text" placeholder="Buscar" class="search-input" />
      </div>
      <button class="icon-btn">🔔</button>
      <div class="user-profile">
        <div class="avatar">👩‍💼</div>
        <div class="user-info">
          <span class="user-name">{{ userName() }}</span>
          <span class="user-role">{{ userRole() }}</span>
        </div>
      </div>
    </div>
  </header>
  `,
  styles: `
    .header { height: 72px; background: #FFF; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; position: sticky; top: 0; z-index: 10; font-family: 'Inter', sans-serif; }
    .header-left { display: flex; flex-direction: column; }
    .page-title { font-size: 1.5rem; font-weight: 700; color: #1a1a2e; margin: 0; }
    .date { font-size: .85rem; color: #8e8e93; margin-top: .15rem; }
    .header-right { display: flex; align-items: center; gap: 1.25rem; }
    .search-box { display: flex; align-items: center; gap: .5rem; background: #f5f5f7; border-radius: 12px; padding: .5rem 1rem; width: 220px; }
    .search-icon { font-size: 1rem; }
    .search-input { border: none; background: transparent; outline: none; font-size: .9rem; width: 100%; font-family: inherit; }
    .search-input::placeholder { color: #c7c7cc; }
    .icon-btn { background: #f5f5f7; border: none; border-radius: 10px; width: 40px; height: 40px; font-size: 1.2rem; cursor: pointer; transition: background .15s; display: flex; align-items: center; justify-content: center; }
    .icon-btn:hover { background: #e8e8ed; }
    .user-profile { display: flex; align-items: center; gap: .75rem; }
    .avatar { font-size: 2rem; }
    .user-info { display: flex; flex-direction: column; }
    .user-name { font-size: .9rem; font-weight: 600; color: #1a1a2e; }
    .user-role { font-size: .75rem; color: #8e8e93; }
  `,
})
export class HeaderComponent {
  readonly title = input('Inicio');
  readonly date = input('');
  readonly userName = input('María');
  readonly userRole = input('Dueña');
}
