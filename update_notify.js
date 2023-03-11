import { Webhook } from 'discord-webhook-node'
import { config } from 'dotenv'
import getFolderSize from 'get-folder-size';
import fs from 'fs'

const packageJSONData = fs.readFileSync('./package.json', 'utf-8')

config({
    path: ".env.local"
})

async function main() {
    const hook = new Webhook(process.env.UPDATE_WEBHOOK);

    const size = await getFolderSize.loose('./dist');

    await hook.send(`🍗 New Deployment \`${JSON.parse(packageJSONData).version}\` \`${size / 1000}KB\` \`${(size / 1000 / 1000).toFixed(2)}MB\``);

    console.log("deployment notice sent.")
}

main()