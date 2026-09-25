const fs = require('fs');
const envPath = '/root/web/.env';
let env = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const idx = trimmed.indexOf('=');
    if (idx === -1) return;
    env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx+1).trim();
  });
}
module.exports = {
  apps: [
    {
      name: 'dso-cms',
      cwd: '/root/web/apps/cms/.next/standalone',
      script: 'apps/cms/server.js',
      env: { NODE_ENV: 'production', PORT: '3001', HOSTNAME: '0.0.0.0', ...env },
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '500M'
    },
    {
      name: 'dso-web',
      cwd: '/root/web/apps/web/.next/standalone',
      script: 'apps/web/server.js',
      env: { NODE_ENV: 'production', PORT: '3002', HOSTNAME: '0.0.0.0', ...env },
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '500M'
    }
  ]
};
