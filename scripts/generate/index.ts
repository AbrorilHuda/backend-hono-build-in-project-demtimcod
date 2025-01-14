import chalk from "chalk";
import { commad } from "./commentData";
import { commandType } from "./types";
import { labelWarn } from "./labels";
import { makeController, makeRouter, makeType, makeInterface } from "./make";

const args = process.argv;

if (args[2] == "help") {
  console.log(chalk.bold("Command yang sekarang bisa di gunakan:\n"));
  commad.forEach(({ command, description }: commandType) => {
    const formattedCommand = chalk.green(command.padEnd(20));
    console.log(`${formattedCommand} ${description}`);
  });
  console.log(chalk.yellow("\n                        by: abrordc"));
  process.exit(0);
}

// Validasi argumen
if (args.length < 4) {
  console.log(`${labelWarn} Format: bun dc <perintah> <filename>`);
  process.exit(0);
}

const command = args[2];
const fileName = args[3];
const makerCommad = args[4];

if (command == "make:route") {
  let acc = false;
  if (makerCommad == "--controller") {
    makeController(fileName);
    acc = true;
  }
  makeRouter(fileName, acc);
}

if (command == "make:controller") {
  makeController(fileName);
  process.exit(0);
}

if (command == "make:type") {
  makeType(fileName);
}

if (command == "make:interface") {
  makeInterface(fileName);
}

console.log("Command tidak dikenal. Gunakan: make:controller");
console.log(chalk.blue("fitur ini yang masih ada tunggu update selanjutnya"));
process.exit(0);
