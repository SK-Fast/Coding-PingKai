import fs from 'fs'

const packageJSONData = fs.readFileSync('./package.json', 'utf-8')

fs.writeFileSync('./public/version.json', JSON.stringify({
    version: JSON.parse(packageJSONData).version
}))

console.log("version updated")