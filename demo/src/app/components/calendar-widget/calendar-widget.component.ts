import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-widget',
  standalone: true,
  template: `
  <div class="calendar-widget">
    <div class="calendar-header">
      <h3>Calendario mensual</h3>
      <div class="calendar-controls">
        <button class="ctrl-btn">Anterior</button>
        <span class="current-month">Junio 2026</span>
        <button class="ctrl-btn">Siguiente</button>
      </div>
      <button class="today-btn">Hoy</button>
    </div>
    <div class="calendar-grid">
      @for (day of dayHeaders; track day) { <div class="day-header">{{ day }}</div> }
      @for (cell of calendarDays; track cell.day) {
        <div class="day-cell" [class.selected]="cell.selected" [class.other-month]="cell.otherMonth">
          <span class="day-num">{{ cell.day }}</span>
          @if (cell.events) {
            <div class="event-dots"> @for (dot of cell.events; track dot) { <span class="dot" [style.background]="dot"></span> } </div>
          }
        </div>
      }
    </div>
    <div class="calendar-legend"><span class="legend-text">Cada color representa una cita o categoría</span></div>
  </div>
  `,
  styles: `
    .calendar-widget { background: #FFF; border-radius: 16px; padding: 1.5rem; box-shadow: 0 2px 12px rgba(0,0,0,0.04); font-family: 'Inter', sans-serif; }
    .calendar-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; flex-wrap: wrap; gap: .5rem; }
    h3 { font-size: 1rem; font-weight: 700; color: #1a1a2e; margin: 0; }
    .calendar-controls { display: flex; align-items: center; gap: .75rem; }
    .current-month { font-size: .9rem; font-weight: 600; color: #3a3a3a; min-width: 100px; text-align: center; }
    .ctrl-btn, .today-btn { background: #f5f5f7; border: none; border-radius: 8px; padding: .4rem .8rem; font-size: .8rem; font-weight: 500; color: #5a5a5a; cursor: pointer; transition: background .15s; font-family: inherit; }
    .ctrl-btn:hover, .today-btn:hover { background: #e8e8ed; }
    .today-btn { background: #FCEAF1; color: #F8A8C9; }
    .today-btn:hover { background: #F8A8C9; color: #fff; }
    .calendar-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 4px; }
    .day-header { text-align: center; font-size: .75rem; font-weight: 600; color: #8e8e93; padding: .5rem 0; }
    .day-cell { aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 10px; cursor: pointer; transition: background .15s; gap: 2px; font-size: .85rem; font-weight: 500; color: #1a1a2e; }
    .day-cell:hover { background: #f5f5f7; }
    .day-cell.selected { background: #FCEAF1; border: 1.5px solid #F8A8C9; }
    .day-cell.other-month { color: #c7c7cc; }
    .day-num { font-size: .85rem; }
    .event-dots { display: flex; gap: 2px; }
    .dot { width: 5px; height: 5px; border-radius: 50%; }
    .calendar-legend { margin-top: 1rem; padding-top: .75rem; border-top: 1px solid #f0f0f0; }
    .legend-text { font-size: .75rem; color: #8e8e93; }
  `,
})
export class CalendarWidgetComponent {
  dayHeaders = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  calendarDays = this.generateCalendar();

  private generateCalendar() {
    const days: any[] = [];
    const startOffset = new Date(2026, 5, 1).getDay();
    for (let i = 0; i < startOffset; i++) days.push({ day: 30 - startOffset + i + 1, otherMonth: true, selected: false });
    for (let d = 1; d <= 30; d++) {
      const events: string[] = [];
      if (d === 6) events.push('#F8A8C9','#B9F5D0');
      if (d === 12) events.push('#A8D8F8');
      if (d === 15) events.push('#F8A8C9');
      if (d === 22) events.push('#B9F5D0');
      if (d === 25) events.push('#F8A8C9','#A8D8F8');
      days.push({ day: d, otherMonth: false, selected: d === 15, events: events.length ? events : undefined });
    }
    for (let i = 1; days.length < 42; i++) days.push({ day: i, otherMonth: true, selected: false });
    return days;
  }
}
