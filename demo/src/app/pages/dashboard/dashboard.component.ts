import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MetricCardComponent } from '../../components/metric-card/metric-card.component';
import { CalendarWidgetComponent } from '../../components/calendar-widget/calendar-widget.component';
import { AssistantChatComponent } from '../../components/assistant-chat/assistant-chat.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, MetricCardComponent, CalendarWidgetComponent, AssistantChatComponent],
  template: `
  <div class="dashboard-layout">
    <app-sidebar (logout)="logout()" />
    <div class="dashboard-main">
      <app-header title="Inicio" date="Resumen del día" userName="María" userRole="Dueña" />
      <div class="dashboard-content">
        <div class="subscription-badge"><span class="badge-dot"></span>Plan Esencial activo</div>
        <div class="metrics-grid">
          <app-metric-card label="Citas hoy" value="6" />
          <app-metric-card label="Citas esta semana" value="27" />
          <app-metric-card label="Tasa de no-show" value="2.2%" description="Dentro del objetivo" />
          <app-metric-card label="Clientes activos" value="37" />
        </div>
        <div class="content-grid"><div class="calendar-section"><app-calendar-widget /></div></div>
      </div>
    </div>
    <app-assistant-chat />
  </div>
  `,
  styles: `
    .dashboard-layout { display: flex; min-height: 100vh; background: #FAFAFA; font-family: 'Inter', sans-serif; }
    .dashboard-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .dashboard-content { flex: 1; overflow-y: auto; padding: 1.5rem 2rem; }
    .subscription-badge { display: inline-flex; align-items: center; gap: .5rem; background: #f0fdf4; color: #15803d; font-size: .8rem; font-weight: 600; padding: .4rem 1rem; border-radius: 20px; margin-bottom: 1.5rem; }
    .badge-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; }
    .metrics-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
    .content-grid { display: grid; gap: 1.5rem; }
    .calendar-section { max-width: 600px; }
  `,
})
export class DashboardComponent {
  constructor(private auth: AuthService) {}
  logout() { this.auth.logout(); }
}
