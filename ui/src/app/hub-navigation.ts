export interface HubCategory {
  readonly id: string;
  readonly title: string;
  readonly eyebrow: string;
  readonly summary: string;
  readonly route: string;
  readonly tone: 'green' | 'blue' | 'violet' | 'amber';
  readonly highlights: readonly string[];
  readonly nextSteps: readonly string[];
}

export const hubCategories: readonly HubCategory[] = [
  {
    id: 'ai',
    title: 'AI Prototypes',
    eyebrow: 'AI lab',
    summary:
      'Experiments that turn AI-assisted planning, coding, review, and workflow automation into repeatable application patterns.',
    route: '/apps/ai',
    tone: 'green',
    highlights: ['Agent playbooks', 'App creation workflows', 'Review and QA assists'],
    nextSteps: ['Shape the next AI prototype brief', 'Connect story intake to implementation playbooks'],
  },
  {
    id: 'blockchain',
    title: 'Blockchain Prototypes',
    eyebrow: 'Blockchain lab',
    summary:
      'Focused prototypes for learning wallet, contract, token, and verification patterns without mixing them into the hub core.',
    route: '/apps/blockchain',
    tone: 'blue',
    highlights: ['Wallet concepts', 'Smart contract notes', 'Verification flows'],
    nextSteps: ['Define the first blockchain learning slice', 'Keep provider and network choices isolated'],
  },
  {
    id: 'security',
    title: 'Security Prototypes',
    eyebrow: 'Security lab',
    summary:
      'Authentication, authorization, provider comparisons, and security learning paths that support the hub and future apps.',
    route: '/apps/security',
    tone: 'violet',
    highlights: ['Auth0/OIDC foundation', 'Provider lab', 'Security review notes'],
    nextSteps: ['Run Auth0 smoke checks', 'Compare provider tradeoffs in the lab area'],
  },
  {
    id: 'misc',
    title: 'Misc Apps',
    eyebrow: 'App incubator',
    summary:
      'A place for small app ideas, work-order style experiments, and future independent app candidates before they earn their own boundary.',
    route: '/apps/misc',
    tone: 'amber',
    highlights: ['Work-order ideas', 'Small utility apps', 'Independent app candidates'],
    nextSteps: ['Prioritize the next app candidate', 'Document when an idea should move out of the hub'],
  },
];

export const hubNavItems = [
  { label: 'Dashboard', route: '/dashboard' },
  ...hubCategories.map((category) => ({ label: category.title.replace(' Prototypes', ''), route: category.route })),
] as const;
