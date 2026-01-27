const si = require('systeminformation')
const fs = require('fs')

console.log(`Starting sysinfo.js`)

const buildContent = fs.readFileSync('./build', 'utf8')
const lines = buildContent.split('\n')
  .filter(line => line !== '')
  .map(line => line.split('='))

const buildLine = lines.find(line => line[0] === 'build_id')
const buildId = buildLine[1]

console.log(`Sysinfo.js: Detected build ${buildId}`)

si.getStaticData((data) => {
  const fp = 'public/sysinfo.json'
  fs.writeFileSync(fp, JSON.stringify({
    buildId,
    sysinfo: data
  }, null, 2))
  console.log(`Sysinfo.js: Done writing ${fp}`)
})
