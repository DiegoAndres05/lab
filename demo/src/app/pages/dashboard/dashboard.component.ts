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
      <app-header title="Dashboard" date="Panel de administración — Cartagena Tailored Travel" userName="Admin" userRole="Agencia de Viajes" />
      <div class="dashboard-content">
        <div class="metrics-grid">
          <app-metric-card label="Reservas del mes" value="124" description="+18% vs mes pasado" icon="📋" />
          <app-metric-card label="Huéspedes activos" value="89" description="Check-in esta semana" icon="👥" />
          <app-metric-card label="Ingresos mensuales" value="$48.2M" description="COP — +12% vs junio" icon="💰" />
          <app-metric-card label="Experiencias vendidas" value="312" description="+24 tours esta semana" icon="🏝️" />
        </div>
        <div class="content-grid">
          <div class="calendar-section"><app-calendar-widget /></div>
          <div class="recent-section">
            <div class="card">
              <div class="card-header"><h3>Reservas Recientes</h3><a class="card-link">Ver todas</a></div>
              <div class="recent-list">
                @for (r of recentBookings; track r.name) {
                  <div class="recent-item">
                    <div class="recent-avatar">{{ r.name.charAt(0) }}</div>
                    <div class="recent-info">
                      <strong>{{ r.name }}</strong>
                      <span>{{ r.experience }}</span>
                    </div>
                    <span class="recent-status" [class.confirmed]="r.status === 'Confirmada'" [class.pending]="r.status === 'Pendiente'">{{ r.status }}</span>
                    <span class="recent-amount">{{ r.amount }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-assistant-chat />
  </div>
  `,
  styles: `
    .dashboard-layout { display: flex; min-height: 100vh; background: #f8fafc; font-family: 'Inter', sans-serif; }
    .dashboard-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .dashboard-content { flex: 1; overflow-y: auto; padding: 1.5rem 2rem; }
    .metrics-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
    .content-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 1.5rem; }
    .calendar-section { }
    .card { background: #FFF; border-radius: 14px; padding: 1.5rem; border: 1px solid #edf2f7; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .card-header h3 { font-size: 1rem; font-weight: 700; color: #0F1B3D; margin: 0; }
    .card-link { font-size: .8rem; color: #C9A84C; font-weight: 600; cursor: pointer; }
    .card-link:hover { text-decoration: underline; }
    .recent-list { display: flex; flex-direction: column; gap: .75rem; }
    .recent-item { display: flex; align-items: center; gap: .75rem; padding: .6rem 0; border-bottom: 1px solid #f1f5f9; }
    .recent-item:last-child { border-bottom: none; }
    .recent-avatar { width: 36px; height: 36px; border-radius: 50%; background: #0F1B3D; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: .85rem; }
    .recent-info { flex: 1; display: flex; flex-direction: column; }
    .recent-info strong { font-size: .85rem; color: #0F1B3D; }
    .recent-info span { font-size: .75rem; color: #64748b; }
    .recent-status { font-size: .75rem; font-weight: 600; padding: .2rem .6rem; border-radius: 6px; }
    .recent-status.confirmed { background: #f0fdf4; color: #166534; }
    .recent-status.pending { background: #fffbeb; color: #92400e; }
    .recent-amount { font-size: .85rem; font-weight: 700; color: #0F1B3D; }
  `,
})
export class DashboardComponent {
  constructor(private auth: AuthService) {}
  logout() { this.auth.logout(); }

  recentBookings = [
    { name: 'Sofía Martínez', experience: 'Capri Premium Day Pass', status: 'Confirmada', amount: '$501K' },
    { name: 'Carlos López', experience: 'Bora Bora VIP', status: 'Confirmada', amount: '$446K' },
    { name: 'Ana García', experience: 'Tour 5 Clásicos', status: 'Pendiente', amount: '$273K' },
    { name: 'Pedro Ramírez', experience: 'City Tour Van Premium', status: 'Confirmada', amount: '$87K' },
    { name: 'María Torres', experience: 'Sibarita Atardecer', status: 'Pendiente', amount: '$151K' },
  ];
}
