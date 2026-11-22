export type PosNegImpact = 'positive' | 'negative';

export interface Location {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  street?: string;
  city?: string;
  zip?: number;
  pos_neg_impact: PosNegImpact;
  likes: number;
  image?: string;
}

export type Role = 'admin' | 'non-admin';

// Response of POST /api/login (backend/server.ts)
export interface LoginResponse {
  token: string;
  username: string;
  role: Role;
}
