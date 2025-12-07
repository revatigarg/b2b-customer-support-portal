export type Urgency = 'critical' | 'high' | 'normal' | 'low';

export type CaseStatus = 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed';

export type RequestCategory = 
  | 'ticketing-presale'
  | 'event-day'
  | 'settlement-payments'
  | 'inventory-pricing'
  | 'technical-integration'
  | 'other';

export type SubCategory = string;

export interface Case {
  id: string;
  caseNumber: string;
  category: RequestCategory;
  subCategory: SubCategory;
  eventId?: string;
  venuePartnerId: string;
  market: string;
  urgency: Urgency;
  description: string;
  triedSolutions: string[];
  attachments: Attachment[];
  status: CaseStatus;
  assignedQueue: string;
  createdAt: Date;
  updatedAt: Date;
  slaDeadline: Date;
  comments: CaseComment[];
  contactName: string;
  contactEmail: string;
  partnerId: string;
  role: string;
  company: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface CaseComment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  isInternal: boolean;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'training' | 'external';
  url: string;
  source: string;
  relevanceScore: number;
}

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  type: 'knowledge' | 'case' | 'training' | 'video' | 'external';
  source: string;
  url: string;
  date?: Date;
}

export const CATEGORY_OPTIONS = [
  { value: 'ticketing-presale', label: 'Ticketing & Presale' },
  { value: 'event-day', label: 'Event-Day / Access Control / Scanning' },
  { value: 'settlement-payments', label: 'Settlement & Payments' },
  { value: 'inventory-pricing', label: 'Inventory / Pricing / Offers' },
  { value: 'technical-integration', label: 'Technical / Integration / API' },
  { value: 'other', label: 'Other' },
] as const;

export const SUBCATEGORY_OPTIONS: Record<RequestCategory, { value: string; label: string }[]> = {
  'ticketing-presale': [
    { value: 'presale-setup', label: 'Presale Setup' },
    { value: 'ticket-types', label: 'Ticket Types Configuration' },
    { value: 'pricing-tiers', label: 'Pricing Tiers' },
    { value: 'seat-map', label: 'Seat Map Issues' },
    { value: 'other', label: 'Other' },
  ],
  'event-day': [
    { value: 'scanner-sync', label: 'Scanner not syncing' },
    { value: 'barcode-error', label: 'Barcode scanning error' },
    { value: 'gate-throughput', label: 'Gate throughput issue' },
    { value: 'device-malfunction', label: 'Device malfunction' },
    { value: 'other', label: 'Other' },
  ],
  'settlement-payments': [
    { value: 'payment-delay', label: 'Payment Delay' },
    { value: 'settlement-discrepancy', label: 'Settlement Discrepancy' },
    { value: 'report-access', label: 'Report Access' },
    { value: 'other', label: 'Other' },
  ],
  'inventory-pricing': [
    { value: 'inventory-hold', label: 'Inventory Hold Issues' },
    { value: 'dynamic-pricing', label: 'Dynamic Pricing' },
    { value: 'offer-codes', label: 'Offer Codes' },
    { value: 'other', label: 'Other' },
  ],
  'technical-integration': [
    { value: 'api-error', label: 'API Error' },
    { value: 'webhook-issues', label: 'Webhook Issues' },
    { value: 'sdk-integration', label: 'SDK Integration' },
    { value: 'authentication', label: 'Authentication Problems' },
    { value: 'other', label: 'Other' },
  ],
  'other': [
    { value: 'general-inquiry', label: 'General Inquiry' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'other', label: 'Other' },
  ],
};

export const URGENCY_OPTIONS = [
  { value: 'critical', label: 'Critical – event within 24h' },
  { value: 'high', label: 'High – event within 3 days' },
  { value: 'normal', label: 'Normal' },
  { value: 'low', label: 'Low' },
] as const;

export const TRIED_SOLUTIONS_OPTIONS = [
  { value: 'visited-help-center', label: 'Visited Help Center / Knowledge Base' },
  { value: 'reviewed-checklist', label: 'Reviewed Event-Day Checklist' },
  { value: 'device-diagnostics', label: 'Performed scanner/device diagnostics' },
  { value: 'sample-scan', label: 'Tried sample ticket scan' },
  { value: 'other', label: 'Other' },
] as const;

export const MARKET_OPTIONS = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' },
  { value: 'au', label: 'Australia' },
  { value: 'mx', label: 'Mexico' },
  { value: 'br', label: 'Brazil' },
] as const;
