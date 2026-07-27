import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<any>(null);

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
  ) {
    this.supabaseService.supabase.auth.onAuthStateChange((event, session) => {
      this.user.set(session?.user ?? null);
    });
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabaseService.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    this.user.set(data.user);
    return data;
  }

  async logout() {
    await this.supabaseService.supabase.auth.signOut();
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  async getSession() {
    const { data } = await this.supabaseService.supabase.auth.getSession();
    if (data.session?.user) this.user.set(data.session.user);
    return data.session;
  }
}
