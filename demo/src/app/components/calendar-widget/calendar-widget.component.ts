import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-widget',
  standalone: true,
  template: `
  <div class="calendar-widget">
    <div class="calendar-header">
      <h3>Calendario de Reservas</h3>
      <div class="calendar-controls">
        <button class="ctrl-btn">←</button>
        <span class="current-month">Julio 2026</span>
        <button class="ctrl-btn">→</button>
      </div>
      <button class="today-btn">Hoy</button>
    </div>
    <div class="calendar-grid">
      @for (day of dayHeaders; track day) { <div class="day-header">{{ day }}</div> }
      @for (cell of calendarDays; track cell.day) {
        <div class="day-cell" [class.selected]="cell.selected" [class.other-month]="cell.otherMonth" [class.has-event]="cell.events">
          <span class="day-num">{{ cell.day }}</span>
          @if (cell.events) { <div class="event-bar"></div> }
        </div>
      }
    </div>
    <div class="calendar-legend">
      <div class="legend-item"><div class="legend-dot" style="background:#C9A84C"></div> Check-in</div>
      <div class="legend-item"><div class="legend-dot" style="background:#0F1B3D"></div> Check-out</div>
    </div>
  </div>
  `,
  styles: `
    .calendar-widget { background: #FFF; border-radius: 14px; padding: 1.5rem; border: 1px solid #edf2f7; font-family: 'Inter', sans-serif; }
    .calendar-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; flex-wrap: wrap; gap: .5rem; }
    h3 { font-size: 1rem; font-weight: 700; color: #0F1B3D; margin: 0; }
    .calendar-controls { display: flex; align-items: center; gap: .5rem; }
    .current-month { font-size: .9rem; font-weight: 600; color: #0F1B3D; min-width: 100px; text-align: center; }
    .ctrl-btn, .today-btn { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: .4rem .75rem; font-size: .8rem; font-weight: 500; color: #0F1B3D; cursor: pointer; transition: background .15s; font-family: inherit; }
    .ctrl-btn:hover, .today-btn:hover { background: #e2e8f0; }
    .today-btn { background: #0F1B3D; color: #fff; border-color: #0F1B3D; }
    .today-btn:hover { background: #1a2d5a; }
    .calendar-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 4px; }
    .day-header { text-align: center; font-size: .75rem; font-weight: 600; color: #94a3b8; padding: .5rem 0; }
    .day-cell { aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 10px; cursor: pointer; transition: background .15s; gap: 2px; font-size: .85rem; font-weight: 500; color: #0F1B3D; position: relative; }
    .day-cell:hover { background: #f1f5f9; }
    .day-cell.selected { background: rgba(201,168,76,0.12); border: 1.5px solid #C9A84C; }
    .day-cell.other-month { color: #cbd5e1; }
    .day-cell.has-event { font-weight: 700; }
    .event-bar { width: 16px; height: 3px; border-radius: 2px; background: #C9A84C; margin-top: 2px; }
    .calendar-legend { display: flex; gap: 1.5rem; margin-top: 1rem; padding-top: .75rem; border-top: 1px solid #f1f5f9; }
    .legend-item { display: flex; align-items: center; gap: .5rem; font-size: .75rem; color: #64748b; }
    .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
  `,
})
export class CalendarWidgetComponent {
  dayHeaders = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  calendarDays = this.generateCalendar();

  private generateCalendar() {
    const days: any[] = [];
    const startOffset = new Date(2026, 6, 1).getDay();
    for (let i = 0; i < startOffset; i++) days.push({ day: 31 - startOffset + i + 1, otherMonth: true, selected: false });
    for (let d = 1; d <= 31; d++) {
      const hasEvent = [2,5,8,12,15,19,22,26,29].includes(d);
      days.push({ day: d, otherMonth: false, selected: d === 15, events: hasEvent || undefined });
    }
    for (let i = 1; days.length < 42; i++) days.push({ day: i, otherMonth: true, selected: false });
    return days;
  }
}
