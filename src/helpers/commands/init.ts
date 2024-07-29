import inquirer from 'inquirer';

export const init = async (args: string[]) => {
  inquirer.prompt([
    { type: 'confirm', message: 'Do you want to install package' },
  ]);
};
