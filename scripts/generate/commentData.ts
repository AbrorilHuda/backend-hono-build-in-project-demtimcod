const commands = [
  {
    command: "help",
    description: "untuk menampilkan daftar perintah",
  },
  { command: "make:controller", description: "membuat file controller" },
  { command: "make:route", description: "membuat file route" },
  {
    command: "make:route --controller",
    description: "membuat sekaligus route dan controllernya",
  },
  { command: "make:type", description: "membuat file type untuk typescript" },
  {
    command: "make:interface",
    description: "membuat file interface untuk typescript",
  },
  {
    command: "make:service",
    description: "membuat file service",
  },
  {
    command: "make:validation",
    description: "membuat file validation",
  },
];

export const commad = commands;
