import childprocess from 'child_process'
import chalk from 'chalk'

const devProcess = childprocess.exec("npm run dev")
const emuProcess = childprocess.exec("npm run emu")

devProcess.stdout.on('data', function (data) {
    console.log(`[${chalk.blueBright("DEV")}] ` + data.toString());
});

emuProcess.stdout.on('data', function (data) {
    console.log(`[${chalk.yellowBright("EMU")}] ` + data.toString());
});
