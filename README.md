# wAIpify

Welcome to the repository! This is the main repository containing the entire sources for all backends and frontends of the [AIManager360](https://app.aimanager360.com/) application suite.

## Clerk

Clerk supports multiple authentication strategies so that you can implement the strategy that makes sense for your users.

## Setup

1. Install MongoDB

```bash
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server
```

2. Install Mysql8.0

   After install mysql, set up the initial tables using dump file. (ask other developer)

3. Install dependencies

```bash
npm install
```


## Development

```bash
npm run dev
```
