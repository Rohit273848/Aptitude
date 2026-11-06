import foundationsRaw from './systemDesignNotes/foundations.md?raw';

export interface SystemDesignScaleMetrics {
  dau?: string;
  readWriteRatio?: string;
  writeQps?: string;
  readQps?: string;
  peakQps?: string;
  dailyStorage?: string;
  fiveYearStorage?: string;
  cacheMemory?: string;
  bandwidth?: string;
}

export interface SystemDesignTopicData {
  id: string;
  title: string;
  slug: string;
  category: 'Core Architecture & Fundamentals' | 'High-Level Design Case Studies';
  difficulty: 'Medium' | 'Hard' | 'Medium–Hard';
  estimatedTime: string;
  architecturalPatterns?: string[];
  scaleMetrics?: SystemDesignScaleMetrics;
  topicsCovered: string[];
  summary: string;
  markdownContent?: string;
}

export const systemDesignRegistry: Record<string, SystemDesignTopicData> = {
  'hld-foundations': {
    id: 'hld-foundations',
    title: 'Foundations: The 9 Core Principles & System Design Blueprint',
    slug: 'foundations',
    category: 'Core Architecture & Fundamentals',
    difficulty: 'Medium',
    estimatedTime: '45 mins',
    topicsCovered: [
      'Why System Design Matters in the AI Era',
      'High-Level Design (HLD) vs Low-Level Design (LLD)',
      'Client-Server Request-Response Lifecycle & The Restaurant Analogy',
      'The Golden Rule of Trade-offs (Delhi to Patna Matrix)',
      'The 9 Core Principles: Load, Latency, Availability, Reliability, Consistency, Durability, Security, Cost, Maintainability',
      'Case Study: Banking System (SBI) vs Social Media (Instagram)',
      'Interview Playbook: The Clarification Framework & Traps to Avoid'
    ],
    summary: 'Master the mental models of System Design from first principles: HLD vs LLD, the Delhi-to-Patna trade-off matrix, the 9 architectural pillars (Load, Latency, Availability, Reliability, Consistency, Durability, Security, Cost, Maintainability), and the SBI vs Instagram case study.',
    markdownContent: foundationsRaw
  },
  'hld-scaling-the-application': {
    id: 'hld-scaling-the-application',
    title: 'Scaling the Application',
    slug: 'scaling-the-application',
    category: 'Core Architecture & Fundamentals',
    difficulty: 'Medium',
    estimatedTime: '50 mins',
    topicsCovered: [
      'Stateless Application Tiers & Shared-Nothing Architecture',
      'Load Balancers: Layer 4 (Transport) vs Layer 7 (Application)',
      'Load Balancing Algorithms: Round Robin, Least Connections, Consistent Hashing',
      'Distributed Session Handling: Sticky Sessions vs Redis Centralized Stores',
      'Horizontal Pod Autoscaling (HPA), Cooldowns & Health Checks'
    ],
    summary: 'Master the mechanics of application horizontal scaling: intelligent traffic routing, session decoupling, consistent hashing, and zero-downtime rolling deployments.'
  },
  'hld-storing-data': {
    id: 'hld-storing-data',
    title: 'Storing Data',
    slug: 'storing-data',
    category: 'Core Architecture & Fundamentals',
    difficulty: 'Hard',
    estimatedTime: '60 mins',
    topicsCovered: [
      'Relational (RDBMS) vs NoSQL (Document, Key-Value, Columnar, Graph)',
      'Database Replication: Master-Replica (Read Replicas) & Multi-Leader',
      'Sharding & Horizontal Partitioning: Range, Hash, Directory-Based',
      'ACID Guarantees vs BASE Consistency Models',
      'Data Warehousing, OLAP vs OLTP, and CDC (Change Data Capture)'
    ],
    summary: 'In-depth storage architectures: choosing SQL vs NoSQL, master-replica replication lag mitigation, horizontal database sharding keys, and eventual consistency.'
  },
  'hld-making-it-fast': {
    id: 'hld-making-it-fast',
    title: 'Making It Fast',
    slug: 'making-it-fast',
    category: 'Core Architecture & Fundamentals',
    difficulty: 'Medium',
    estimatedTime: '45 mins',
    topicsCovered: [
      'Caching Tiers: Client, CDN, Reverse Proxy, In-Memory App Cache, Database Query Cache',
      'Caching Strategies: Cache-Aside, Read-Through, Write-Through, Write-Behind (Write-Back)',
      'Eviction Policies: LRU (Least Recently Used), LFU, FIFO, TTL Expirations',
      'Content Delivery Networks (CDNs), Edge Computing & PoPs',
      'Database Connection Pooling & Asynchronous Non-Blocking I/O'
    ],
    summary: 'High-performance latency reduction techniques: multi-tiered caching, cache stampede prevention, cache invalidation strategies, and global edge delivery.'
  },
  'hld-how-systems-communicate': {
    id: 'hld-how-systems-communicate',
    title: 'How Systems Communicate',
    slug: 'how-systems-communicate',
    category: 'Core Architecture & Fundamentals',
    difficulty: 'Medium',
    estimatedTime: '50 mins',
    topicsCovered: [
      'Synchronous vs Asynchronous Communication Patterns',
      'Protocol Wars: REST vs gRPC (Protocol Buffers) vs GraphQL',
      'Real-Time Duplex Protocols: WebSockets vs Server-Sent Events (SSE) vs Long Polling',
      'Message Queues & Event Streaming: RabbitMQ (AMQP) vs Apache Kafka (Log-based)',
      'Publish-Subscribe (Pub/Sub) Architecture & Backpressure Handling'
    ],
    summary: 'Inter-service communication paradigms: REST vs gRPC binary serialization, persistent WebSockets, pub-sub architectures, and message queues for asynchronous decoupling.'
  },
  'hld-distributed-systems': {
    id: 'hld-distributed-systems',
    title: 'Distributed Systems',
    slug: 'distributed-systems',
    category: 'Core Architecture & Fundamentals',
    difficulty: 'Hard',
    estimatedTime: '60 mins',
    topicsCovered: [
      'CAP Theorem & PACELC Trade-Off Matrix',
      'Distributed Consensus: Raft vs Paxos Protocols',
      'Clock Drift, NTP Synchronization & Lamport Logical Clocks',
      'Distributed Locking: Redis Redlock vs Apache ZooKeeper Ensembles',
      'Leader Election & Split-Brain Syndrome Mitigation',
      'Idempotency Keys & Exactly-Once vs At-Least-Once Delivery Semantics'
    ],
    summary: 'Fundamental distributed systems theory: consensus algorithms, CAP and PACELC trade-offs, logical clocks, distributed transactions, and two-phase commit.'
  },
  'hld-running-systems-in-production': {
    id: 'hld-running-systems-in-production',
    title: 'Running Systems in Production',
    slug: 'running-systems-in-production',
    category: 'Core Architecture & Fundamentals',
    difficulty: 'Medium',
    estimatedTime: '45 mins',
    topicsCovered: [
      'The Three Pillars of Observability: Metrics, Structured Logs & Distributed Tracing',
      'Reliability Patterns: Circuit Breaker, Exponential Backoff, Jitter, Retry Budgets',
      'API Rate Limiting & Throttling at Edge / API Gateway',
      'Graceful Degradation & Shedding Load Under Peak Traffic',
      'Service Level Agreements (SLA), Objectives (SLO), and Indicators (SLI)',
      'Disaster Recovery: Active-Active vs Active-Passive Multi-Region Deployments'
    ],
    summary: 'Production-grade system resilience: circuit breakers, distributed tracing with OpenTelemetry, multi-region failover, and strict SLO/SLA engineering.'
  },
  'hld-interview-playbook': {
    id: 'hld-interview-playbook',
    title: 'Interview Playbook',
    slug: 'interview-playbook',
    category: 'Core Architecture & Fundamentals',
    difficulty: 'Medium',
    estimatedTime: '40 mins',
    topicsCovered: [
      'The 45-Minute System Design Interview Blueprint: Time Breakdown',
      'Step 1: Clarifying Requirements & Scoping (Functional vs Non-Functional)',
      'Step 2: Back-of-the-Envelope Capacity Calculations (QPS, Storage, RAM, Bandwidth)',
      'Step 3: High-Level Architecture & End-to-End Request Flow',
      'Step 4: Deep Dive into Bottlenecks, Trade-Offs, and Failure Modes',
      'Examiner Red Flags & How to Steer Ambiguous Questions'
    ],
    summary: 'The battle-tested playbook for cracking 45-minute architectural interviews at FAANG and top-tier product firms: structured cadence, time allocation, and avoiding fatal pitfalls.'
  },
  'hld-url-shortener': {
    id: 'hld-url-shortener',
    title: 'Case Studies: Design a URL Shortener',
    slug: 'design-a-url-shortener',
    category: 'High-Level Design Case Studies',
    difficulty: 'Medium',
    estimatedTime: '55 mins',
    scaleMetrics: {
      dau: '100 Million',
      readWriteRatio: '100:1 (Read Heavy)',
      writeQps: '1,160 QPS',
      readQps: '116,000 QPS',
      peakQps: '232,000 QPS',
      fiveYearStorage: '15 TB'
    },
    topicsCovered: [
      'Requirements & Capacity Estimations for 100M DAU',
      'Base62 Encoding vs MD5/SHA-256 Hash Truncation Collisions',
      'Distributed Key Generation Service (KGS) & Range Allocators',
      'HTTP Redirections: 301 Permanent vs 302 Temporary',
      'Redis LRU Caching for 80/20 Read-Heavy Workload',
      'Database Sharding using Short Code Hash Partitions'
    ],
    summary: 'Complete architectural design of TinyURL/Bitly: 100M DAU scale, Base62 encoding, pre-generated unique key rings, Redis caching, and handling viral URL hot spots.'
  },
  'hld-rate-limiter': {
    id: 'hld-rate-limiter',
    title: 'Case Studies: Design a Rate Limiter',
    slug: 'design-a-rate-limiter',
    category: 'High-Level Design Case Studies',
    difficulty: 'Medium',
    estimatedTime: '50 mins',
    scaleMetrics: {
      dau: '50 Million',
      writeQps: '50,000 QPS',
      peakQps: '100,000 QPS'
    },
    topicsCovered: [
      'Rate Limiting Algorithms: Token Bucket, Leaky Bucket, Fixed Window, Sliding Window Log, Sliding Window Counter',
      'Distributed Rate Limiting with Redis & Lua Script Atomicity',
      'Race Conditions & Distributed Locks vs Lua Scripting',
      'Handling Distributed Clock Drift Across Multi-Region Redis Nodes',
      'HTTP 429 Response Headers (X-RateLimit-Limit, Remaining, Reset)'
    ],
    summary: 'Design a distributed API rate limiter safeguarding backend microservices: algorithm trade-off matrix, atomic Redis Lua scripts, and client-side retry mitigation.'
  },
  'hld-chat-app': {
    id: 'hld-chat-app',
    title: 'Case Studies: Design a Chat App',
    slug: 'design-a-chat-app',
    category: 'High-Level Design Case Studies',
    difficulty: 'Hard',
    estimatedTime: '65 mins',
    scaleMetrics: {
      dau: '500 Million',
      writeQps: '100,000 msgs/sec',
      peakQps: '250,000 msgs/sec'
    },
    topicsCovered: [
      'Bidirectional Communication: Long Polling vs WebSockets vs SSE',
      'WebSocket Connection Server Pool & Stateful Connection Routing',
      'User Presence Server: Heartbeats & Real-time Online/Offline Status',
      'Message Synchronization Across Multiple Devices & Read Receipts',
      'Message Ordering Guarantees with Distributed Sequence Counters',
      'Wide-Column Storage (Apache Cassandra) for Chat History Access'
    ],
    summary: 'Architecture of a high-scale real-time chat platform (WhatsApp / Slack): WebSocket session management, presence heartbeats, distributed sequence IDs, and Cassandra storage.'
  },
  'hld-news-feed': {
    id: 'hld-news-feed',
    title: 'Case Studies: Design a News Feed',
    slug: 'design-a-news-feed',
    category: 'High-Level Design Case Studies',
    difficulty: 'Hard',
    estimatedTime: '65 mins',
    scaleMetrics: {
      dau: '300 Million',
      readWriteRatio: '10:1',
      writeQps: '5,000 posts/sec',
      readQps: '50,000 feeds/sec'
    },
    topicsCovered: [
      'Feed Generation Architectures: Fan-out on Write (Push) vs Fan-out on Read (Pull)',
      'The Celebrity Problem (High-Follower Hotspots) & Hybrid Fan-out Solution',
      'Feed Ranking Pipelines: Recency vs EdgeRank ML Scoring Factors',
      'Multi-Tier Caching Architecture for Timelines and Social Graphs',
      'Notification Dispatch & Real-Time Push Triggers'
    ],
    summary: 'End-to-end design of a social media feed system (Twitter / Instagram / LinkedIn): push vs pull fan-out trade-offs, handling celebrity out-degree, and feed caching.'
  },
  'hld-video-streaming': {
    id: 'hld-video-streaming',
    title: 'Case Studies: Design a Video Streaming Platform',
    slug: 'design-a-video-streaming-platform',
    category: 'High-Level Design Case Studies',
    difficulty: 'Hard',
    estimatedTime: '70 mins',
    scaleMetrics: {
      dau: '200 Million',
      fiveYearStorage: '100 PB',
      bandwidth: '10 Tbps'
    },
    topicsCovered: [
      'Video Upload Pipeline: Chunking, Parallel Uploads & Pre-signed S3 URLs',
      'Transcoding & Encoding Pipeline: DAG Workflows & Multiple Formats/Codecs',
      'Adaptive Bitrate Streaming (ABR): HLS (HTTP Live Streaming) & MPEG-DASH',
      'CDN Strategy: Edge Caching for Popular Video Segments & Origin Shielding',
      'User Video Watch Progress Bookmarking & Real-Time Analytics'
    ],
    summary: 'Design a planetary-scale video platform (YouTube / Netflix): parallel chunk uploads, transcoding pipelines, adaptive bitrate streaming (HLS), and multi-tier CDN caching.'
  },
  'hld-ticket-booking': {
    id: 'hld-ticket-booking',
    title: 'Case Studies: Design a Ticket Booking System',
    slug: 'design-a-ticket-booking-system',
    category: 'High-Level Design Case Studies',
    difficulty: 'Hard',
    estimatedTime: '60 mins',
    scaleMetrics: {
      dau: '10 Million',
      peakQps: '50,000 QPS (Flash Sale)'
    },
    topicsCovered: [
      'Preventing Double Booking: Pessimistic vs Optimistic Locking with Versioning',
      'Distributed Locking using Redis Redlock for Temporary Seat Holds (10 min TTL)',
      'Distributed Transactions: Saga Pattern vs Two-Phase Commit (2PC)',
      'Virtual Waiting Room & Queue Management (Kafka / Redis Sorted Sets) for Flash Sales',
      'Payment Webhook Callbacks & Idempotent Ticket Issuance'
    ],
    summary: 'High-concurrency ticket booking engine (BookMyShow / Ticketmaster): temporary seat reservation locks, optimistic concurrency, flash-sale queue throttling, and ACID guarantees.'
  },
  'hld-ride-sharing': {
    id: 'hld-ride-sharing',
    title: 'Case Studies: Design a Ride-Sharing App',
    slug: 'design-a-ride-sharing-app',
    category: 'High-Level Design Case Studies',
    difficulty: 'Hard',
    estimatedTime: '65 mins',
    scaleMetrics: {
      dau: '50 Million',
      writeQps: '200,000 driver pings/sec'
    },
    topicsCovered: [
      'Geospatial Indexing: QuadTrees vs Google S2 vs Geohash vs Uber H3 Hexagonal Grid',
      'Real-Time Driver Location Tracking & Efficient Batch Updates',
      'Rider-Driver Proximity Search & Matching Algorithms',
      'Dynamic Surge Pricing Engine: Real-Time Supply vs Demand Hexagonal Clustering',
      'Trip State Machine & Real-Time Route Telemetry'
    ],
    summary: 'Design a real-time ride-hailing dispatch system (Uber / Lyft): Uber H3 hexagonal spatial indexing, driver ping ingestion via WebSockets/Kafka, and surge pricing algorithms.'
  },
  'hld-payment-system': {
    id: 'hld-payment-system',
    title: 'Case Studies: Design a Payment System',
    slug: 'design-a-payment-system',
    category: 'High-Level Design Case Studies',
    difficulty: 'Hard',
    estimatedTime: '65 mins',
    scaleMetrics: {
      dau: '20 Million',
      writeQps: '5,000 payments/sec'
    },
    topicsCovered: [
      'Payment Lifecycle: Authorization, Capture, Clearing, Settlement',
      'Exactly-Once Processing with Idempotency Keys & Database Constraints',
      'Double-Entry Bookkeeping Ledger (Debit = Credit Non-Negotiable Invariant)',
      'Reconciliation Engine: Catching Mismatches with External Payment Gateways',
      'Distributed Saga Orchestrator for Multi-Step Financial Workflows'
    ],
    summary: 'Ultra-reliable financial transaction system (Stripe / PayPal): idempotency key mechanics, double-entry immutable ledgers, gateway reconciliation, and zero financial data loss.'
  }
};

export function getSystemDesignTopicById(topicId: string): SystemDesignTopicData | null {
  return systemDesignRegistry[topicId] || null;
}

