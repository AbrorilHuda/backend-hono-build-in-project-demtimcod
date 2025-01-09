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

To run prisam studio

```sh
bun run db:studio
```

To run prisma debug

```sh
bun run db:debug
```

## TOOLS

jika anda menbutuhkan string random untuk secret

jalankan perintah ini

```sh
bun generate:secret
```

maka akan di buatkan secara otomatis file secret.txt dan didalam akan ada string random yang bisa digunakan

### memperkenalkan dc assistent

dc assistent sekarang adalah hal yang sedang saya develop untuk mempermudah kalian memanangement project ini.

untuk melihat semua command yang tersedia gunakan perintah:

```sh
bun dc help
```

fitur sekarang masih generate file controller yang lansung di simpan di controller folder jika tidak ada akan di buatkan folder dengan nama controllers dengan perintah:

```sh
bun dc make:controller <namefile>
```

open di port 3000
