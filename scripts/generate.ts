const { spawn } = Bun;
import { join } from "path";

const scriptPath = join(process.cwd(), "scripts/");
console.log(scriptPath);

const processis = spawn({
  cmd: ["sh", `${scriptPath}\generate-secret.sh`],
  stdout: "pipe",
  stderr: "pipe",
});

processis.stdout.pipeTo(
  new WritableStream({
    write(chunk) {
      console.log(new TextDecoder().decode(chunk));
    },
  })
);

processis.stderr.pipeTo(
  new WritableStream({
    write(chunk) {
      console.error(new TextDecoder().decode(chunk));
    },
  })
);
