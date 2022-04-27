
# 🌌Bitsong Faucet
This application enables the users to receiver coins on the Bitsong Testnet. It can be called  through simple HTTP GET requests,
whose  single query parameter is the address of the wallet who wants to receive the coins.

It is empowered by an anti-bruteforce attack system and a jobs queue built on Redis.

It is also possible to see a documentation for the available APIs at ```/api```.
## 🚀 Tech Stack

**Server:** NestJS, Node.js, Redis and Swagger

**Benchmark:** Python
## 🌎 Environment Variables

To run this project you need to create a ```.env``` file. You can copy the example file by typing:

```
cp .env.example .env
```

Then, you should edit the variables. Their explaination follows:

`FAUCET_MNEMONIC`
Faucet mnemonic used for transaction signing

`FAUCET_ADDRESS`
Faucet address used for transaction

`ADDRESS_PREFIX`
Address prefix used for receiver address validation

`RPC_URL`
Link to Bitsong RPC API

`NODE_PORT`
Node port used by server instance

`QUEUE_MAX_JOBS`
The maximum number of items in the queue

`QUEUE_DURATION`
The maximum duration of a queued job

`THROTTLER_TTL`
The maximum duration of each throttle

`THROTTLER_LIMIT`
The number of times an endpoint can be called from the same ip address in a TTL

`REDIS_HOST`
Redis server hostname

`REDIS_PORT`
Redis server port
## ⚙️ Run Locally

Clone the project

```bash
  git clone https://github.com/bitsongofficial/bitsong-faucet.git
```

Go to the project directory

```bash
  cd bitsong-faucet
```

Install dependencies

```bash
  pnpm i
```

Or you can use:

```bash
  npm i
```

Start docker container (Redis):

```bash
  docker-compose up -d
```

Start the server on dev mode:

```bash
  pnpm start:dev
```

Start the server on debug mode:

```bash
  pnpm start:debug
```

Start the server on prod mode:

```bash
  pnpm start:prod
```

Moreover if you want to start docker service and Node.js server on debug mode, you can use:

```bash
  start:debug-docker
```

Build the server for production:
```bash
  pnpm build
```
## 💥 Benchmark

Create a virtual enviroment on python:

```bash
  python3 -m venv benchmark/env
```

Active the virtual enviroment:

```bash
  source benchmark/env/bin/activate
```
Install dependencies:

```bash
  pip3 install -r benchmark/requirements.txt
```
Run the benchmark:

```bash
  python3 benchmark/main.py
```
## 👤 Authors
- `Angelo Recca` [@angelorc](https://github.com/angelorc)

- `Giorgio Nocera` [@Giorgionocera](https://github.com/Giorgionocera)

- `Davide Segullo` [@DavideSegullo](https://github.com/DavideSegullo)
## 🆘 Support

For support, email g.nocera@bitsong.io or join our [Discord](https://discord.gg/5VT5fJmF).
## 🔏 License
Copyright © 2022 [BitSong](https://github.com/bitsongofficial).

This project is licensed by [MIT License](https://api.github.com/licenses/mit).
