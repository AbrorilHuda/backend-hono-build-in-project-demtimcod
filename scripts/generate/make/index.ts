import { writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, join } from "path";
import chalk from "chalk";
import { labelInfo } from "../labels";
import capitalizeFirstLetter from "../convert";
import defaultContent from "./defaultContent";

export function makeRouter(fileName: String) {
  const targetFolder = resolve("./src/routes");
  if (!existsSync(targetFolder)) {
    mkdirSync(targetFolder, { recursive: true });
    console.log(`${labelInfo} Folder '${targetFolder}' berhasil dibuat.`);
  }

  const filePath = join(targetFolder, `${capitalizeFirstLetter(fileName)}.ts`);

  try {
    writeFileSync(filePath, defaultContent(capitalizeFirstLetter(fileName)));
    console.log(
      `${labelInfo} File Controller '${filePath}' ${chalk.green(
        "berhasil dibuat."
      )}`
    );
    process.exit(0);
  } catch (err) {
    console.error("Gagal membuat file:", err);
    process.exit(1);
  }
}

export function makeController(fileName: String) {
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
      defaultContent(fileName.toLowerCase() + "Controller")
    );
    console.log(
      `${labelInfo} File Controller '${filePath}' ${chalk.green(
        "berhasil dibuat."
      )}`
    );
    process.exit(0);
  } catch (err) {
    console.error("Gagal membuat file:", err);
    process.exit(1);
  }
}
