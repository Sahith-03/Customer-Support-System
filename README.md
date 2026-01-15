# 🤖 AI Customer Support System

A modern, intelligent customer support system built with TypeScript, featuring specialized AI agents for different support domains. The system provides automated assistance for orders, billing, and general customer inquiries through a beautiful chat interface.

## ✨ Features

### 🎯 **Specialized AI Agents**
- **Order Agent** 📦 - Handles order tracking, status updates, and delivery information
- **Billing Agent** 💳 - Manages payment inquiries, invoices, and refund requests  
- **Support Agent** 🎧 - Provides general customer support and assistance
- **Router Agent** 🔀 - Intelligently routes conversations to the appropriate specialist

### 🎨 **Modern Chat Interface**
- Beautiful gradient UI with smooth animations
- Real-time message streaming
- Agent type indicators with emojis
- Responsive design for all devices
- Auto-resizing input with keyboard shortcuts
- Typing indicators and loading states

### 🗄️ **Robust Database Schema**
- **Conversations** - Chat session management
- **Messages** - Message history with agent attribution
- **Orders** - Order tracking and status management
- **Payments** - Payment processing and refund handling

## 🏗️ Architecture

```
ai-support-system/
├── apps/
│   ├── api/                    # Backend API (Hono + Node.js)
│   │   └── src/
│   │       ├── agents/         # AI agents for different domains
│   │       │   ├── tools/      # Database tools for each agent
│   │       │   ├── order.agent.ts
│   │       │   ├── billing.agent.ts
│   │       │   ├── support.agent.ts
│   │       │   └── router.agent.ts
│   │       ├── controllers/    # API controllers
│   │       ├── services/       # Business logic
│   │       └── routes/         # API routes
│   └── web/                    # Frontend (React + Vite)
│       └── src/
│           ├── components/     # React components
│           ├── hooks/          # Custom React hooks
│           └── types/          # TypeScript definitions
└── packages/
    └── db/                     # Database package (Drizzle ORM)
        ├── schema/             # Database schemas
        ├── migrations/         # Database migrations
        └── seed.ts            # Sample data
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm
- PostgreSQL
- Docker (optional)

### 1. Clone & Install
```bash
git clone https://github.com/Sahith-03/Customer-Support-System.git
cd Customer-Support-System
pnpm install
```

### 2. Database Setup
```bash
# Start PostgreSQL with Docker
docker-compose up -d

# Or configure your own PostgreSQL and update .env
cp .env.example .env
# Edit DATABASE_URL in .env
```

### 3. Database Migration & Seeding
```bash
cd packages/db
pnpm db:push      # Push schema to database
pnpm db:seed      # Add sample data
```

### 4. Start Development Servers

**Terminal 1 - API Server:**
```bash
cd apps/api
pnpm dev          # Starts on http://localhost:3000
```

**Terminal 2 - Web App:**
```bash
cd apps/web
pnpm dev          # Starts on http://localhost:5173
```

## 🛠️ Development

### Database Operations
```bash
cd packages/db

# Generate migrations
pnpm db:generate

# Push schema changes
pnpm db:push

# Open Drizzle Studio
pnpm db:studio

# Run seed data
pnpm db:seed

# Test database connection
pnpm tsx test-db.ts
```

### API Development
```bash
cd apps/api

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Frontend Development
```bash
cd apps/web

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgres://postgres:postgres@localhost:5432/ai_support

# API
PORT=3000

# Optional: Add your AI service API keys here
# OPENAI_API_KEY=your_key_here
```

### Docker Setup
The project includes a `docker-compose.yml` for PostgreSQL:

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# Reset database (removes all data)
docker-compose down -v
```

## 📡 API Endpoints

### Chat API
- `POST /api/chat` - Send message and get agent response
- `GET /api/health` - Health check endpoint

### Request Format
```json
{
  "message": "Where is my order TRK123?",
  "conversationId": "optional-conversation-id"
}
```

### Response Format
```json
{
  "message": {
    "id": "msg-id",
    "content": "Your order TRK123 is currently shipped...",
    "role": "agent",
    "agentType": "order",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "conversation": {
    "id": "conv-id",
    "userId": "user-id",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

## 🤖 Agent Capabilities

### Order Agent 📦
- Track orders by number
- Check delivery status
- Update order information
- Handle shipping inquiries

**Example queries:**
- "Where is my order TRK123?"
- "What's the status of my delivery?"
- "When will my order arrive?"

### Billing Agent 💳
- Retrieve invoices
- Process refund requests
- Check payment status
- Handle billing inquiries

**Example queries:**
- "I need my invoice for order TRK123"
- "I want to request a refund"
- "Has my payment gone through?"

### Support Agent 🎧
- General customer assistance
- Account help
- Product information
- Escalation handling

**Example queries:**
- "I need help with my account"
- "How do I return an item?"
- "I have a complaint"

## 🎨 UI Components

### Chat Interface
- **Chat.tsx** - Main chat container
- **MessageList.tsx** - Message display with agent indicators
- **MessageInput.tsx** - Auto-resizing input with shortcuts

### Styling Features
- Gradient backgrounds and modern design
- Smooth animations and transitions
- Agent-specific message styling
- Responsive layout for all screen sizes
- Custom scrollbars and hover effects

## 🧪 Testing

### Database Testing
```bash
cd packages/db
pnpm tsx test-db.ts
```

### API Testing
```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test chat endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, I need help with my order"}'
```

## 📦 Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Hono (lightweight web framework)
- **Database:** PostgreSQL with Drizzle ORM
- **Language:** TypeScript
- **Package Manager:** pnpm

### Frontend  
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** CSS with modern features
- **Language:** TypeScript
- **State Management:** React hooks

### Database
- **ORM:** Drizzle ORM
- **Database:** PostgreSQL
- **Migrations:** Drizzle Kit
- **Connection:** node-postgres (pg)

## 🚀 Deployment

### Production Build
```bash
# Build all packages
pnpm build

# Build specific app
cd apps/api && pnpm build
cd apps/web && pnpm build
```

### Environment Setup
- Set `NODE_ENV=production`
- Configure production database URL
- Set up proper CORS settings
- Configure reverse proxy (nginx/Apache)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern TypeScript and React
- Database powered by Drizzle ORM
- UI inspired by modern chat interfaces
- Agent architecture for scalable support

---