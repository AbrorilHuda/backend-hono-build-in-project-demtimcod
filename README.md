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

membuat file controller folder jika tidak ada akan di buatkan folder dengan nama `src/controllers` dengan perintah:

```sh
bun dc make:controller <namefile>
```

membuat file route sama seperti controller namun file nya di simpan di routes jika tidak ada folder routes akan di buatkan `src/routes`:

```sh
bun dc make:route <namefile>
```

open di port 3000
