import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  get supabase() { return this.client; }

  async getUser(): Promise<User | null> {
    const { data } = await this.client.auth.getUser();
    return data.user;
  }

  async getSession() { return this.client.auth.getSession(); }
}
