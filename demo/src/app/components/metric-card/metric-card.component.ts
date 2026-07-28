import { Component, input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  template: `
  <div class="metric-card">
    <div class="metric-content">
      <span class="metric-label">{{ label() }}</span>
      <span class="metric-value">{{ value() }}</span>
      @if (description(); as desc) { <span class="metric-desc">{{ desc }}</span> }
    </div>
    <div class="metric-icon">{{ icon() }}</div>
  </div>
  `,
  styles: `
    .metric-card { background: #FFF; border-radius: 14px; padding: 1.5rem; border: 1px solid #edf2f7; display: flex; justify-content: space-between; align-items: flex-start; transition: box-shadow .2s,transform .2s; cursor: default; font-family: 'Inter', sans-serif; }
    .metric-card:hover { box-shadow: 0 4px 16px rgba(15,27,61,0.06); transform: translateY(-2px); }
    .metric-content { display: flex; flex-direction: column; gap: .3rem; }
    .metric-label { font-size: .8rem; font-weight: 500; color: #64748b; text-transform: uppercase; letter-spacing: .03em; }
    .metric-value { font-size: 1.75rem; font-weight: 800; color: #0F1B3D; letter-spacing: -0.02em; }
    .metric-desc { font-size: .78rem; color: #C9A84C; font-weight: 600; }
    .metric-icon { font-size: 1.8rem; opacity: .7; }
  `,
})
export class MetricCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly description = input<string>();
  readonly icon = input('📊');
}
