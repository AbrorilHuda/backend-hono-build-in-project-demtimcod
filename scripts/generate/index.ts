import { writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, join } from "path";
import chalk from "chalk";
const labelErr = chalk.bgRed.white.bold(" ERROR ");
// Ambil argumen terminal
const args = process.argv;

// Validasi argumen
if (args.length < 4) {
  console.log(`${labelErr} Format: bun run dc make:controller <filename>`);
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
  console.log(
    `${chalk.bgBlue.white.bold(
      " INFO "
    )} Folder '${targetFolder}' berhasil dibuat.`
  );
}

// Gabungkan folder dengan nama file
const filePath = join(targetFolder, `${fileName}Controller.ts`);

// Tulis file di folder target
try {
  writeFileSync(
    filePath,
    "// file " + fileName.toLowerCase() + "Controller by dc asistents"
  );
  // Membuat label INFO
  const label = chalk.bgBlue.white.bold(" INFO ");

  // Pesan teks utama
  //   const message = `Server running on ${chalk.blue.underline(
  //     "http://127.0.0.1:8000"
  //   )}.`;

  //   // Pesan tambahan
  //   const instruction = chalk.yellow("Press Ctrl+C to stop the server");

  // Tampilkan pesan
  console.log(`${label} File '${filePath}' ${chalk.green("berhasil dibuat.")}`);
} catch (err) {
  console.error("Gagal membuat file:", err);
  process.exit(1);
}
