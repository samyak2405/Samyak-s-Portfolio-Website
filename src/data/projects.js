const projects = [
  {
    id: 'splitmoney',
    type: 'personal',
    title: 'Splitmoney',
    subtitle: 'Real-Time Expense Splitting',
    description:
      'Full-stack expense splitting app with UPI/Card payments via Hyperswitch, gRPC inter-service communication, multi-strategy splits (equal, exact, percentage), and reliable event-driven notifications using Transactional Outbox + RabbitMQ.',
    tags: ['Java', 'Spring Boot', 'gRPC', 'RabbitMQ', 'Redis', 'PostgreSQL'],
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop',
    demoUrl: null,
    sourceUrl: 'https://github.com/yourusername/splitmoney',
    impact: null,
  },
  {
    id: 'secureauthpro',
    type: 'work',
    title: 'SecureAuthPro',
    subtitle: 'Multi-Tenant Auth Service',
    description:
      'Multi-tenant Authentication & Authorization platform serving 10+ enterprise clients with RBAC, RSA-256 JWT, OTP-based login, and strict tenant isolation — aligned with enterprise and regulatory security standards.',
    tags: ['Java', 'Spring Boot', 'Redis', 'JWT', 'RBAC', 'Multi-Tenancy'],
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop',
    demoUrl: null,
    sourceUrl: null,
    impact: '10+ enterprise clients',
    badge: 'PayU Digital Labs',
  },
  {
    id: 'card-order-workflow',
    type: 'work',
    title: 'Card Order Workflow',
    subtitle: 'High-Volume Card Issuance',
    description:
      'End-to-end card generation pipeline with maker–checker approval and Quartz-based async scheduling for Visa and RuPay issuance across multiple enterprise clients. Received Extra Mile Award.',
    tags: ['Java', 'Spring Boot', 'Quartz', 'MySQL', 'Visa', 'RuPay'],
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop',
    demoUrl: null,
    sourceUrl: null,
    impact: '85% faster · 10K+ cards/batch',
    badge: 'PayU Digital Labs',
  },
];

export default projects;
