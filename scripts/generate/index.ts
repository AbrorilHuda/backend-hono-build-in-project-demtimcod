import chalk from "chalk";
import { commad } from "./commentData";
import { commandType } from "./types";
import { labelWarn } from "./labels";
import { makeController, makeRouter } from "./make";

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
  console.log(`${labelWarn} Format: bun run dc <perintah> <filename>`);
  process.exit(0);
}

const command = args[2];
const fileName = args[3];

if (command == "make:route") {
  makeRouter(fileName);
}

if (command == "make:controller") {
  makeController(fileName);
}

console.log("Command tidak dikenal. Gunakan: make:controller");
console.log(chalk.blue("fitur ini yang masih ada tunggu update selanjutnya"));
process.exit(0);
