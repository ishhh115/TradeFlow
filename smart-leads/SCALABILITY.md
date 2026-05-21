# Scalability Notes — TradeFlow

## Current Architecture
- Single Node.js/Express server
- MongoDB Atlas (cloud-hosted)
- JWT stateless authentication
- Deployed on Render (backend) + Vercel (frontend)

## Horizontal Scaling
- The stateless JWT approach means multiple server instances can run simultaneously without session conflicts
- Deploy behind a load balancer (e.g. AWS ALB, Nginx) to distribute traffic across instances
- MongoDB Atlas supports automatic sharding for large datasets

## Caching
- Redis can be added to cache frequently accessed leads queries, reducing DB load
- Example: cache GET /leads results for 60 seconds, invalidate on create/update/delete
- Session caching for JWT blacklisting on logout

## Microservices (future)
- Auth Service — handles registration, login, token refresh
- Leads Service — handles CRUD operations
- Export Service — handles CSV generation asynchronously
- Each service can be scaled independently based on load

## Rate Limiting
- Already implemented via express-rate-limit (100 requests per 15 minutes per IP)
- Can be moved to API Gateway level (e.g. AWS API Gateway, Kong) for distributed rate limiting

## Logging & Monitoring
- Morgan for request logging (already implemented)
- Can integrate Winston for structured logging
- Add Datadog or New Relic for production monitoring

## Docker & Container Orchestration
- Docker already configured
- Can migrate to Kubernetes for container orchestration at scale
- Use Helm charts for deployment management

## Database Optimization
- Add indexes on frequently queried fields (email, status, source)
- Use MongoDB aggregation pipelines for complex queries
- Consider read replicas for heavy read workloads