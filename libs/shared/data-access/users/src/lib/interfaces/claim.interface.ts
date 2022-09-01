export interface Claim {
  claims_admin: boolean;
  provider: 'email' | 'google';
  providers: string[];
  jobs: string[];
}
