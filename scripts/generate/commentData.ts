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
];

export const commad = commands;
