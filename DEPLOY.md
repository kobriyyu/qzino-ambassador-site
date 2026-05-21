## Qzino Landing Deployment Notes

### Stack
- Framework: `Next.js 16`
- Package manager: `bun`
- Build command: `bun run build`
- Start command: `bun run start`

### Environment Variables
Create production environment variables before deployment:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_group_or_chat_id
```

Use `.env.example` as the reference template.

### Telegram Form Delivery
The landing includes a server route:

- `POST /api/ambassador-application`

This route sends submitted form data to Telegram using the env vars above.

### Recommended Deployment Target
Vercel is the easiest target for this project.

Recommended settings:
- Framework preset: `Next.js`
- Install command: `bun install`
- Build command: `bun run build`
- Output: default Next.js output

### Custom Domain Setup
After deploying:

1. Add the main domain in the hosting dashboard.
2. Point DNS records to the hosting provider.
3. Wait for SSL to be issued.
4. Verify the form works in production and Telegram notifications are delivered.

### Pre-Launch Checklist
- Add both Telegram env vars in production.
- Confirm the Telegram bot is added to the target group/chat.
- Submit a real test form on the production domain.
- Confirm SSL is active on the main domain.
