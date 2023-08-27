# Front para Ecommerce con Next.js

Este es un proyecto de [Next.js](https://nextjs.org/) creado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Configurar variables de entorno

Renombrar el archivo [.env.example](.env.example) a `.env`

Ejemplo:

`MONGO_URL_DEV=`mongodb://localhost:27017/name-database

## Getting Started

- Conexion con base de datos mediante docker:

```bash
docker-compose up -d
```

_El -d significa **detached**_

_En el caso de que mongocompas no encuentre la base de datos debes correr el siguiente comando:_

```bash
net stop MongoDB
```

_Esto frena el servidor de mongo en el caso de que lo tengas correindo en tu pc, asi podras utilizarlo desde docker_

Luego ejecute el servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.
