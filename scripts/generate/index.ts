import { writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, join } from "path";
import chalk from "chalk";
import { commad } from "./commentData";
import { commandType } from "./types";
import { labelInfo, labelError } from "./labels";

const args = process.argv;

if (args[2] == "help") {
  console.log(chalk.bold("Command yang sekarang bisa di gunakan:\n"));
  commad.forEach(({ command, description }: commandType) => {
    const formattedCommand = chalk.green(command.padEnd(20));
    console.log(`${formattedCommand} ${description}`);
  });
  process.exit(0);
}

// Validasi argumen
if (args.length < 4) {
  console.log(`${labelError} Format: bun run dc <perintah> <filename>`);
  process.exit(0);
}

const command = args[2];
const fileName = args[3];

// Pastikan command sesuai
if (command !== "make:controller") {
  console.log("Command tidak dikenal. Gunakan: make:controller");
  console.log(chalk.blue("fitur ini yang masih ada tunggu update selanjutnya"));
  process.exit(0);
}

// Tentukan folder target
const targetFolder = resolve("./src/controllers");
// Buat folder jika belum ada
if (!existsSync(targetFolder)) {
  mkdirSync(targetFolder, { recursive: true });
  console.log(`${labelInfo} Folder '${targetFolder}' berhasil dibuat.`);
}
// Gabungkan folder dengan nama file
const filePath = join(targetFolder, `${fileName}Controller.ts`);
// Tulis file di folder target
try {
  writeFileSync(
    filePath,
    "// file " + fileName.toLowerCase() + "Controller by dc asistents"
  );
  console.log(
    `${labelInfo} File Controller '${filePath}' ${chalk.green(
      "berhasil dibuat."
    )}`
  );
} catch (err) {
  console.error("Gagal membuat file:", err);
  process.exit(1);
}
