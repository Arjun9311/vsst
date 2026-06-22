module.exports = {
  apps: [
    {
      name: 'seva-next-web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'seva-directus-cms',
      script: 'npx',
      args: 'directus start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        PORT: 8055,
        NODE_ENV: 'production'
      }
    }
  ]
};
