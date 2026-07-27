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
  </div>
  `,
  styles: `
    .metric-card { background: #FFF; border-radius: 16px; padding: 1.5rem; box-shadow: 0 2px 12px rgba(0,0,0,0.04); transition: box-shadow .2s,transform .2s; cursor: default; font-family: 'Inter', sans-serif; }
    .metric-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); transform: translateY(-2px); }
    .metric-content { display: flex; flex-direction: column; gap: .3rem; }
    .metric-label { font-size: .85rem; font-weight: 500; color: #8e8e93; }
    .metric-value { font-size: 2rem; font-weight: 800; color: #1a1a2e; letter-spacing: -0.02em; }
    .metric-desc { font-size: .8rem; color: #22c55e; font-weight: 600; }
  `,
})
export class MetricCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly description = input<string>();
}
