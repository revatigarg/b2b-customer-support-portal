import { KnowledgeArticle } from './types';

export interface TaskGroup {
  id: string;
  title: string;
  description: string;
  icon: string;
  persona: 'event-organizer' | 'venue-ops' | 'promoter';
  articleIds: string[];
}

export const taskGroups: TaskGroup[] = [
  // Event Organizers
  {
    id: 'prepare-onsale',
    title: 'Prepare for Onsale',
    description: 'Set up presales, pricing tiers, access codes, and inventory before your event goes live.',
    icon: 'ticket',
    persona: 'event-organizer',
    articleIds: ['kb-onsale-1', 'kb-onsale-2', 'kb-onsale-3'],
  },
  {
    id: 'build-configure',
    title: 'Build & Configure Events',
    description: 'Create events, configure seating maps, and set up ticket types and pricing.',
    icon: 'settings',
    persona: 'event-organizer',
    articleIds: ['kb-build-1', 'kb-build-2', 'kb-build-3'],
  },
  {
    id: 'event-day-ops',
    title: 'Event Day Operations',
    description: 'Everything you need for smooth event-day execution including scanning and entry.',
    icon: 'calendar',
    persona: 'event-organizer',
    articleIds: ['kb-eventday-1', 'kb-eventday-2', 'kb-eventday-3'],
  },
  {
    id: 'settlement-reporting',
    title: 'Settlement & Reporting',
    description: 'Financial reconciliation, settlement reports, and revenue analytics.',
    icon: 'dollar',
    persona: 'event-organizer',
    articleIds: ['kb-settlement-1', 'kb-settlement-2', 'kb-settlement-3'],
  },
  {
    id: 'fan-communications',
    title: 'Fan Communications',
    description: 'Manage ticket holder notifications, event updates, and customer messaging.',
    icon: 'mail',
    persona: 'event-organizer',
    articleIds: ['kb-fancomm-1', 'kb-fancomm-2'],
  },
  // Venue Operations
  {
    id: 'access-control',
    title: 'Access Control (Scanning, Entry, SafeTix)',
    description: 'Set up scanners, manage entry points, and configure SafeTix digital ticketing.',
    icon: 'scan',
    persona: 'venue-ops',
    articleIds: ['kb-access-1', 'kb-access-2', 'kb-access-3'],
  },
  {
    id: 'event-day-readiness',
    title: 'Event Day Readiness',
    description: 'Pre-event checklists, staff preparation, and gate operations setup.',
    icon: 'clipboard-check',
    persona: 'venue-ops',
    articleIds: ['kb-ready-1', 'kb-ready-2'],
  },
  {
    id: 'hardware-support',
    title: 'Hardware Support (Scanners, WiFi, POS)',
    description: 'Troubleshoot and maintain scanning devices, network connectivity, and point-of-sale systems.',
    icon: 'wrench',
    persona: 'venue-ops',
    articleIds: ['kb-hardware-1', 'kb-hardware-2', 'kb-hardware-3'],
  },
  {
    id: 'post-event-wrapup',
    title: 'Post-Event Wrap-Up',
    description: 'Post-event procedures, equipment return, and closing reports.',
    icon: 'check-circle',
    persona: 'venue-ops',
    articleIds: ['kb-wrapup-1', 'kb-wrapup-2'],
  },
  // Promoters / Agents
  {
    id: 'event-setup-checklist',
    title: 'Event Setup Checklist',
    description: 'Step-by-step guide to ensure your event is properly configured before launch.',
    icon: 'list-checks',
    persona: 'promoter',
    articleIds: ['kb-setup-1', 'kb-setup-2'],
  },
  {
    id: 'marketing-distribution',
    title: 'Marketing & Distribution',
    description: 'Promotional tools, affiliate links, and distribution channel management.',
    icon: 'megaphone',
    persona: 'promoter',
    articleIds: ['kb-marketing-1', 'kb-marketing-2'],
  },
  {
    id: 'guest-services',
    title: 'Guest Services & Support',
    description: 'Handle VIP requests, accessibility needs, and special guest accommodations.',
    icon: 'users',
    persona: 'promoter',
    articleIds: ['kb-guest-1', 'kb-guest-2'],
  },
];

// Extended article data with task assignments
export const taskArticles: KnowledgeArticle[] = [
  // Prepare for Onsale
  { id: 'kb-onsale-1', title: 'How to Create an Onsale', description: 'Complete guide to setting up your event onsale including presale windows and public onsale timing.', type: 'article', url: '/knowledge/create-onsale', source: 'TM1 Documentation', relevanceScore: 0.95 },
  { id: 'kb-onsale-2', title: 'Pricing Checklist', description: 'Step-by-step checklist to ensure all pricing tiers, fees, and discounts are properly configured.', type: 'article', url: '/knowledge/pricing-checklist', source: 'Internal Docs', relevanceScore: 0.90 },
  { id: 'kb-onsale-3', title: 'QA Checklist Before Onsale', description: 'Quality assurance steps to verify your event configuration before tickets go on sale.', type: 'article', url: '/knowledge/qa-checklist', source: 'Best Practices', relevanceScore: 0.88 },
  
  // Build & Configure
  { id: 'kb-build-1', title: 'Creating Your First Event', description: 'Walkthrough for setting up a new event from scratch in the platform.', type: 'video', url: '/training/create-event', source: 'Training Library', relevanceScore: 0.92 },
  { id: 'kb-build-2', title: 'Seating Map Configuration', description: 'How to configure seating sections, rows, and seat types for your venue.', type: 'article', url: '/knowledge/seating-maps', source: 'TM1 Documentation', relevanceScore: 0.85 },
  { id: 'kb-build-3', title: 'Ticket Type Setup Guide', description: 'Configure different ticket types including GA, reserved, VIP, and accessible seating.', type: 'article', url: '/knowledge/ticket-types', source: 'Internal Docs', relevanceScore: 0.87 },
  
  // Event Day Operations
  { id: 'kb-eventday-1', title: 'How to Set Up Scanners', description: 'Step-by-step guide to configuring and deploying handheld scanners for event entry.', type: 'article', url: '/knowledge/scanner-setup', source: 'TM1 Documentation', relevanceScore: 0.95 },
  { id: 'kb-eventday-2', title: 'Entry Performance Tips', description: 'Best practices for optimizing entry throughput and reducing wait times at gates.', type: 'article', url: '/knowledge/entry-tips', source: 'Best Practices', relevanceScore: 0.88 },
  { id: 'kb-eventday-3', title: 'Real-Time Scanning Dashboard', description: 'How to use the live dashboard to monitor entry rates and scanner performance.', type: 'video', url: '/training/scanning-dashboard', source: 'Training Library', relevanceScore: 0.90 },
  
  // Settlement & Reporting
  { id: 'kb-settlement-1', title: 'Settlement Basics', description: 'Understanding the settlement process, timelines, and how funds are distributed.', type: 'training', url: '/training/settlement-basics', source: 'Partner Academy', relevanceScore: 0.92 },
  { id: 'kb-settlement-2', title: 'Understanding Event Reports', description: 'Deep dive into the various reports available and what each metric means.', type: 'article', url: '/knowledge/event-reports', source: 'Internal Docs', relevanceScore: 0.88 },
  { id: 'kb-settlement-3', title: 'Reconciliation Guide', description: 'How to reconcile settlement statements with your internal financial systems.', type: 'article', url: '/knowledge/reconciliation', source: 'TM1 Documentation', relevanceScore: 0.85 },
  
  // Fan Communications
  { id: 'kb-fancomm-1', title: 'Sending Event Updates to Ticket Holders', description: 'How to send notifications about event changes, parking, and important info.', type: 'article', url: '/knowledge/fan-notifications', source: 'TM1 Documentation', relevanceScore: 0.90 },
  { id: 'kb-fancomm-2', title: 'Managing Customer Inquiries', description: 'Best practices for handling ticket holder questions and issues.', type: 'article', url: '/knowledge/customer-inquiries', source: 'Best Practices', relevanceScore: 0.85 },
  
  // Access Control
  { id: 'kb-access-1', title: 'Scanner Troubleshooting Guide', description: 'Step-by-step guide to diagnose and resolve common scanner issues on event day.', type: 'article', url: '/knowledge/scanner-troubleshooting', source: 'TM1 Documentation', relevanceScore: 0.95 },
  { id: 'kb-access-2', title: 'SafeTix Configuration', description: 'Setting up and managing SafeTix digital ticket delivery and refresh settings.', type: 'article', url: '/knowledge/safetix-config', source: 'Internal Docs', relevanceScore: 0.90 },
  { id: 'kb-access-3', title: 'Entry Point Management', description: 'Configure entry gates, access levels, and credential scanning requirements.', type: 'article', url: '/knowledge/entry-points', source: 'TM1 Documentation', relevanceScore: 0.88 },
  
  // Event Day Readiness
  { id: 'kb-ready-1', title: 'Event-Day Operations Checklist', description: 'Comprehensive checklist for venue staff to ensure smooth event-day operations.', type: 'article', url: '/knowledge/event-day-checklist', source: 'Internal Docs', relevanceScore: 0.92 },
  { id: 'kb-ready-2', title: 'Staff Training Materials', description: 'Training resources for event staff on ticketing and entry procedures.', type: 'training', url: '/training/staff-materials', source: 'Training Library', relevanceScore: 0.85 },
  
  // Hardware Support
  { id: 'kb-hardware-1', title: 'Scanner Sync: Video Tutorial', description: 'Watch how to properly sync scanners with the central system before an event.', type: 'video', url: '/training/scanner-sync-video', source: 'Training Library', relevanceScore: 0.92 },
  { id: 'kb-hardware-2', title: 'WiFi Network Requirements', description: 'Network specifications and best practices for reliable scanner connectivity.', type: 'article', url: '/knowledge/wifi-requirements', source: 'Technical Docs', relevanceScore: 0.88 },
  { id: 'kb-hardware-3', title: 'POS System Integration', description: 'Setting up and troubleshooting point-of-sale system connections.', type: 'article', url: '/knowledge/pos-integration', source: 'Technical Docs', relevanceScore: 0.85 },
  
  // Post-Event Wrap-Up
  { id: 'kb-wrapup-1', title: 'Post-Event Procedures', description: 'Steps to complete after an event including equipment shutdown and reporting.', type: 'article', url: '/knowledge/post-event', source: 'Internal Docs', relevanceScore: 0.88 },
  { id: 'kb-wrapup-2', title: 'Equipment Return Process', description: 'How to properly return rented or loaned equipment after your event.', type: 'article', url: '/knowledge/equipment-return', source: 'Internal Docs', relevanceScore: 0.80 },
  
  // Event Setup Checklist
  { id: 'kb-setup-1', title: 'Pre-Launch Event Checklist', description: 'Everything promoters need to verify before their event goes live.', type: 'article', url: '/knowledge/pre-launch', source: 'Best Practices', relevanceScore: 0.92 },
  { id: 'kb-setup-2', title: 'Event Configuration Review', description: 'How to review and approve your event setup before public announcement.', type: 'article', url: '/knowledge/config-review', source: 'Internal Docs', relevanceScore: 0.88 },
  
  // Marketing & Distribution
  { id: 'kb-marketing-1', title: 'Promotional Tools Overview', description: 'Available marketing tools including social sharing, affiliate links, and widgets.', type: 'article', url: '/knowledge/promo-tools', source: 'Marketing Docs', relevanceScore: 0.90 },
  { id: 'kb-marketing-2', title: 'Distribution Channel Setup', description: 'Configure ticket distribution across multiple sales channels and partners.', type: 'article', url: '/knowledge/distribution', source: 'TM1 Documentation', relevanceScore: 0.85 },
  
  // Guest Services
  { id: 'kb-guest-1', title: 'VIP & Guest List Management', description: 'Managing comp tickets, VIP packages, and guest list entries.', type: 'article', url: '/knowledge/vip-management', source: 'Internal Docs', relevanceScore: 0.88 },
  { id: 'kb-guest-2', title: 'Accessibility Services', description: 'How to configure and manage accessible seating and special accommodations.', type: 'article', url: '/knowledge/accessibility', source: 'TM1 Documentation', relevanceScore: 0.90 },
];

export const getTaskGroupById = (id: string): TaskGroup | undefined => {
  return taskGroups.find(group => group.id === id);
};

export const getArticlesForTaskGroup = (taskGroupId: string): KnowledgeArticle[] => {
  const group = getTaskGroupById(taskGroupId);
  if (!group) return [];
  return taskArticles.filter(article => group.articleIds.includes(article.id));
};

export const getTaskGroupsByPersona = (persona: TaskGroup['persona']): TaskGroup[] => {
  return taskGroups.filter(group => group.persona === persona);
};

export const getAllArticles = (): KnowledgeArticle[] => {
  return taskArticles;
};
