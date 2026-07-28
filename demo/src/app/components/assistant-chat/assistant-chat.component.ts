import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Message { role: 'user' | 'assistant'; content: string; }

@Component({
  selector: 'app-assistant-chat',
  standalone: true,
  imports: [FormsModule],
  template: `
  <div class="assistant-container" [class.open]="isOpen()">
    @if (isOpen()) {
      <div class="chat-panel">
        <div class="chat-header">
          <div class="chat-header-info">
            <span class="chat-avatar">🧭</span>
            <div><strong>Asistente de Viajes</strong><span class="chat-subtitle">Consultor IA para tu agencia</span></div>
          </div>
          <button class="close-btn" (click)="toggle()">✕</button>
        </div>
        <div class="chat-messages">
          @for (msg of messages(); track $index) {
            <div class="message" [class.user]="msg.role === 'user'"><div class="bubble">{{ msg.content }}</div></div>
          }
        </div>
        <div class="chat-input">
          <input type="text" [(ngModel)]="inputText" name="chatInput" placeholder="Escribe tu consulta..." (keydown.enter)="sendMessage()" />
          <button class="send-btn" (click)="sendMessage()">➤</button>
        </div>
      </div>
      <button class="toggle-btn close" (click)="toggle()">✕</button>
    } @else {
      <button class="toggle-btn" (click)="toggle()"><span class="assist-icon">🧭</span></button>
    }
  </div>
  `,
  styles: `
    .assistant-container { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 1000; font-family: 'Inter', sans-serif; }
    .toggle-btn { width: 56px; height: 56px; border-radius: 50%; border: none; background: #C9A84C; color: #fff; font-size: 1.5rem; cursor: pointer; box-shadow: 0 4px 16px rgba(201,168,76,0.4); transition: transform .2s; display: flex; align-items: center; justify-content: center; }
    .toggle-btn:hover { transform: scale(1.05); }
    .toggle-btn.close { width: 36px; height: 36px; font-size: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.15); background: #0F1B3D; }
    .assist-icon { font-size: 1.8rem; }
    .chat-panel { position: absolute; bottom: 70px; right: 0; width: 360px; height: 500px; background: #FFF; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); display: flex; flex-direction: column; overflow: hidden; animation: slideUp .25s ease; border: 1px solid #edf2f7; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    .chat-header { padding: 1rem 1.25rem; background: #0F1B3D; display: flex; align-items: center; justify-content: space-between; }
    .chat-header-info { display: flex; align-items: center; gap: .75rem; }
    .chat-avatar { font-size: 1.4rem; }
    .chat-header-info strong { display: block; font-size: .9rem; color: #fff; }
    .chat-subtitle { font-size: .75rem; color: rgba(255,255,255,0.6); }
    .close-btn { background: none; border: none; font-size: 1rem; color: rgba(255,255,255,0.6); cursor: pointer; padding: .25rem; }
    .close-btn:hover { color: #fff; }
    .chat-messages { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: .75rem; }
    .message { display: flex; }
    .message.user { justify-content: flex-end; }
    .bubble { max-width: 80%; padding: .7rem 1rem; border-radius: 14px; font-size: .85rem; line-height: 1.4; background: #f1f5f9; color: #0F1B3D; }
    .message.user .bubble { background: #0F1B3D; color: #fff; border-bottom-right-radius: 4px; }
    .message:not(.user) .bubble { border-bottom-left-radius: 4px; }
    .chat-input { padding: .75rem 1rem; border-top: 1px solid #edf2f7; display: flex; gap: .5rem; }
    .chat-input input { flex: 1; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: .6rem 1rem; font-size: .85rem; outline: none; font-family: inherit; }
    .chat-input input:focus { border-color: #C9A84C; }
    .send-btn { background: #C9A84C; border: none; border-radius: 10px; width: 38px; height: 38px; color: #fff; font-size: 1rem; cursor: pointer; transition: background .15s; display: flex; align-items: center; justify-content: center; }
    .send-btn:hover { background: #b8973a; }
  `,
})
export class AssistantChatComponent {
  isOpen = signal(false);
  inputText = '';
  messages = signal<Message[]>([
    { role: 'assistant', content: '¡Bienvenido! Puedo ayudarte con reservas, recomendar experiencias o analizar tus estadísticas.' },
    { role: 'user', content: '¿Cuántas reservas tenemos para este fin de semana?' },
    { role: 'assistant', content: 'Tienes 8 reservas para este fin de semana: 3 en Islas del Rosario, 2 en Barú y 3 tours culturales.' },
  ]);
  toggle() { this.isOpen.update(v => !v); }
  sendMessage() {
    const text = this.inputText.trim();
    if (!text) return;
    this.messages.update(m => [...m, { role: 'user', content: text }]);
    this.inputText = '';
    setTimeout(() => this.messages.update(m => [...m, { role: 'assistant', content: 'Déjame revisar la información… Te confirmo en un momento.' }]), 800);
  }
}
