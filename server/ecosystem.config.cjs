// pm2 ecosystem — keeps the Express API + ngrok tunnel alive across crashes
// and reboots. Start with:  pm2 start ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "sts-api",
      cwd: "/home/mouhammad/sts-sofitrans-service/server",
      script: "node_modules/.bin/tsx",
      args: "watch src/index.ts",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      // Inherit DATABASE_URL etc. from the shell environment (set in .env via pm2)
      max_memory_restart: "512M",
      restart_delay: 2000,
      exp_backoff_restart_delay: 1000,
    },
    {
      name: "sts-ngrok",
      // ngrok lives at /snap/bin/ngrok on Ubuntu snap installs
      script: "/snap/bin/ngrok",
      args: "http 3001 --log /home/mouhammad/sts-sofitrans-service/server/logs/ngrok.log",
      // ngrok must start AFTER the API is up
      autorestart: true,
      restart_delay: 5000,
      exp_backoff_restart_delay: 2000,
    },
  ],
};
