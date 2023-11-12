const fs = require('fs')
const path = require('path')
const JsZip = require('jszip')
const zip = new JsZip()

const inputFileName = 'input.json'
const withoutSpacingFileName = 'withoutSpacing.json'
const zipFileName = 'result.zip'
const basePath = path.join(__dirname,'/')

async function main(){
    const initialFileSize = fs.statSync(inputFileName)
    console.log('InitialFileSize', initialFileSize.size/1024,'Kb')
    const input = fs.readFileSync(inputFileName, "utf8");
    fs.writeFileSync(withoutSpacingFileName,input.replace(/\s/g, ""),'utf8')
    const withoutSpacingFileSize = fs.statSync(withoutSpacingFileName)
    console.log('withoutSpacingFileSize', withoutSpacingFileSize.size/1024,'Kb')
    console.log('Size diff b/w initialFileSize and withoutSpacingFileSize', (initialFileSize.size - withoutSpacingFileSize.size)/1024 , 'Kb')
    await createZipFile(zipFileName,input.replace(/\s/g, ""))
    const zipFileSize = fs.statSync(zipFileName)
    console.log('zipFileSize', zipFileSize.size/1024 )
}
function createZipFile(fileName,data){
    return new Promise((resolve, reject) => {
        try {
            zip.file('data.json', data);
            zip.generateAsync({ type: 'nodebuffer' }).then(zipData => {
                const zipFilePath = basePath + fileName;
                fs.writeFileSync(zipFilePath, zipData);
                console.log('ZIP file created successfully:', zipFilePath);
                resolve(true)
            }).catch(err => {
                throw err
            });
        } catch (err) {
            console.log('err', err) 
            reject(err)
        }
    })
}

main()