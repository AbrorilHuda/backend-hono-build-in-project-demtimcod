export function defaultController(type: String) {
  return `// di generate oleh dc assistents
import {Context} from "hono";

// return c.text bisa kalian ganti dengan logic kalian

export const get${type}s = (c: Context) => {
  return c.text("my Controller")
}
export const create${type} = (c: Context) => {
  return c.text("my Controller")
}
export const get${type}ById = (c: Context) => {
  return c.text("my Controller")
}
export const update${type}ById = (c: Context) => {
  return c.text("my Controller")
}
export const delete${type}ById = (c: Context) => {
  return c.text("my Controller")
}
`;
}

export function defaultRoute(fileName: String) {
  const nullController = "/* your function */";
  const importController = `import {get${fileName}s, create${fileName}, get${fileName}ById, update${fileName}ById, delete${fileName}ById} from "../controllers/${fileName.toLocaleLowerCase()}Controller";`;

  return `// di generate oleh dc assistents
import {Hono} from "hono";

${fileName == "" ? "" : importController}


const router = new Hono();
/*
@yourfunction itu function ubah function yang kalian buat
atau menggunakan perintah bun dc make:route --controller
*/

router.get("/", (c) => ${
    fileName == "" ? nullController : `get${fileName}s(c)`
  });
router.post("/", (c) => ${
    fileName == "" ? nullController : `create${fileName}(c)`
  });
router.get("/:id", (c) => ${
    fileName == "" ? nullController : `get${fileName}ById(c)`
  });
router.patch("/:id", (c) => ${
    fileName == "" ? nullController : `update${fileName}ById(c)`
  });
router.delete("/:id", (c) => ${
    fileName == "" ? nullController : `delete${fileName}ById(c)`
  });
`;
}

export function defaultType(nameType: String) {
  return `// di generate oleh dc assistents
export type ${nameType}Type = {
    // typeCode
}`;
}

export function defaultInterface(interfaceName: String) {
  return `// di generate oleh dc assistents
export interface ${interfaceName}Interface {
    // interfaceCode
}`;
}
