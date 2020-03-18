declare module '@inquirer/confirm' {
  type ConfirmArgs = {
    default?: boolean;
    message: string;
  };

  const confirm: (args: ConfirmArgs) => Promise<boolean>;
  export default confirm;
}

declare module '@inquirer/select' {
  type SelectArgs = {
    choices: Array<{ name: string; value: string | null }>;
    message: string;
  };

  const select: (args: SelectArgs) => Promise<string | null>;
  export default select;
}
