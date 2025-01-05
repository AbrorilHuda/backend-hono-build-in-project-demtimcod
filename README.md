# Usage Instructions

To install dependencies:

```sh
bun install
```

To Migrate to prisma:

```sh
bun run db:migrate
```

To run:

```sh
bun run dev
```

To reset database prisma:

```sh
bun run db:reset
```

membuka prisam studio

```sh
bun run db:studio
```

menjalan prisma debug

```sh
bun run db:debug
```

## TOOLS

jika anda menbutuhkan string random untuk secret

jalankan perintah ini

```sh
bun run generate:secret
```

maka akan di buatkan secara otomatis file secret.txt dan didalam akan ada string random yang bisa digunakan

open di port 3000
