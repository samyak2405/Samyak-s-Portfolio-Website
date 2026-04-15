// Clean structured resume data — parsed from Resume/
export const skills = [
  'Java', 'Python', 'SQL',
  'Spring Boot', 'REST APIs', 'Microservices', 'Multi-Tenancy',
  'MySQL', 'PostgreSQL', 'Redis', 'Elasticsearch',
  'AWS', 'Jenkins', 'CI/CD',
  'Kafka', 'RabbitMQ',
  'ELK Stack', 'Grafana',
  'Cursor AI', 'Generative AI',
];

export const experience = [
  {
    role:    'Software Engineer',
    company: 'PayU Digital Labs',
    period:  'Apr 2025 – Present',
    bullets: [
      'Designed and owned the Card Order Workflow end-to-end with maker–checker approval and Quartz-based async scheduling for Visa and RuPay across multiple clients — reduced card generation time for 10K+ cards by 85%. Received Extra Mile Award.',
      'Built SecureAuthPro, a multi-tenant Auth/AuthZ service using Spring Boot, Redis, and RSA-256 JWT with RBAC and OTP-based login serving 10+ enterprise clients.',
      'Designed Wallet-to-Account Transfer (W2A) API with idempotency guarantees, concurrency control, and a Quartz-based async refund job ensuring financial reconciliation at scale.',
      'Enhanced Authorization Settlement flows for Visa and RuPay across e-commerce, POS, and ATM channels; integrated External Authentication for real-time Approve/Reject.',
      'Integrated Atalla Payment HSM for PIN management, key lifecycle, and PCI-DSS compliant cryptographic operations — achieved 60% faster transaction processing.',
      'Implemented Two-Factor Authentication (MPIN + OTP) with Redis TTL-based OTP management aligned with RBI and PCI-DSS security standards.',
    ],
  },
  {
    role:    'Associate Software Engineer',
    company: 'PayU Digital Labs',
    period:  'Jul 2023 – Apr 2025',
    bullets: [
      'Built Card Adjustment and Card Replacement features using maker–checker workflows with idempotency; improved operational efficiency by 70% and reduced customer turnaround time.',
      'Designed Customer Segmentation feature for dynamic customer groups with tier-based transactional fee rules, improving revenue configuration flexibility.',
      'Led security hardening initiatives resolving CSP, CSRF, CORS, HSTS, and TLS vulnerabilities; reduced audit-reported vulnerabilities by 80% in collaboration with InfoSec and DevOps.',
    ],
  },
];

export const education = [
  {
    degree:  'M.Tech in Computer Science',
    school:  'National Institute of Technology Surathkal, Karnataka',
    period:  '2021 – 2023',
    details: ['Relevant Coursework: Distributed Computing, Computer Networks, Deep Learning'],
  },
  {
    degree:  'B.Tech in Computer Science',
    school:  'Government College of Engineering Amravati',
    period:  '2016 – 2020',
    details: ['Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks'],
  },
];

export default { skills, experience, education };
