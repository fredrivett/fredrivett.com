// src: https://stackoverflow.com/a/53981706/827129
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOGGL_EMAIL: string;
      TOGGL_PASSWORD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
