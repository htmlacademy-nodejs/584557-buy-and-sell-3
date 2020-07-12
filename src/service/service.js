"use strict";

const {Cli} = require(`./cli/`);

const {DEFAULT_COMMAND, USER_ARGV_INDEX, MAX_ADS_NUMBER, ExitCode} = require(`../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand, count] = userArguments;

if (count > MAX_ADS_NUMBER) {
  console.log(`Не больше ${MAX_ADS_NUMBER} объявлений`);
  process.exit();
}

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();

  process.exit(ExitCode.success);
}

Cli[userCommand].run(count);
