module.exports = {
  apps : [{
    name   : "bfban-kook-bot",
    script : "./index.ts",
    instances: 1,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    kill_timeout: 10000,
    wait_ready: true,
    watch: false,
    ignore_watch: ['node_modules'],
    error_file: "/dev/stderr",
    out_file: "/dev/stdout",
  }]
}
