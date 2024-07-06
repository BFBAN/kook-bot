FROM keymetrics/pm2
EXPOSE 8081
WORKDIR /usr/src/app/bfban-bot-for-kook
RUN mkdir -p /usr/src/app/bfban-bot-for-kook
COPY . /usr/src/app/bfban-bot-for-kook

# 容器启动时，启动应用服务
CMD ["pm2-runtime", "ecosystem.config.js", "--only", "bfban-bot-for-kook", "--env", "development"]
