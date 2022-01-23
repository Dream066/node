const {error} = require('console')
let crypto = require('crypto')
const fs = require('fs')
console.log(process.argv[2])

function checkPath(path) {
  console.log(__dirname)
}

function checkFiles(path) {

  const PathHashfile = `${path}.sha256`

  let firstFile
  let twentyFile
  if (path.includes('.txt')) {
    console.log('file is txt')
    firstFile = fs.readFileSync(path,'utf-8', (err, data) => {
      if (err) process.exit(100)
      return data.trim()
    })
  } else {
    console.log('file is not txt')
    firstFile = fs.readFileSync(path,(err, data) => {
      if (err) process.exit(100)
      return data
    })
  }

  fs.stat(PathHashfile, function(err, stats) {
    if (err) {
        console.log("Файл не найден");
        // process.exit(101)
    } else {
        console.log("Файл найден");
    }
});

  twentyFile = fs.readFileSync(PathHashfile, 'utf-8', (err, data) => {
    if (err) {
      console.error('error')
      process.exit(101)
    }
    return data
  })

  const hashOne = crypto.createHash('sha256').update(firstFile).digest('hex')

  // console.log(hashOne)
  // console.log(twentyFile)

  if (hashOne.trim() === twentyFile.trim()) {
    console.log('OK')
    process.exit(0)
  } else {
    console.error('Файлы не совпадают')
    process.exit(102)
  }
}
checkPath()
checkFiles(process.argv[2])

