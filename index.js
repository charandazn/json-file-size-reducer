const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

const inputFileName = 'input.json'
const compressedDataFileName = 'comporessedData.zip'
const deCompressedFileName = 'decompressed.json'
const basePath = path.join(__dirname,'/')

async function main(){
    const initialFileSize = fs.statSync(inputFileName)
    console.log('InitialFileSize', initialFileSize.size/1024,'Kb')
    const input = fs.readFileSync(inputFileName, "utf8");

    //calling Compression
    const cmData = await compression(input)
    fs.writeFileSync(compressedDataFileName , cmData)
    const compressedDataFileSize = fs.statSync(compressedDataFileName)
    console.log('compressedDataFileSize : ' , compressedDataFileSize.size/1024 , 'Kb')
    console.log('Size diff b/w initialFileSize and compressedDataFileSize', (initialFileSize.size - compressedDataFileSize.size)/1024 , 'Kb')
    //calling Decompression
    const deCompressedData = await deCompression(cmData)
    fs.writeFileSync(deCompressedFileName , JSON.parse(deCompressedData))
    console.log('deCompressedFileSize : ' ,  fs.statSync(deCompressedFileName).size/1024, 'kb')
}

//Compression 
function compression(input){
    return new Promise((resolve , reject) => {
        try {
            const compressedData = zlib.deflateSync(JSON.stringify(input)) //zlib.gzipSync(JSON.stringify(input));
            resolve(compressedData)
        } catch (error) {
            reject(error)
        }
    })
}

//Decompression Code
function deCompression(cmData){
    return new Promise((resolve , reject) => {
        try {
            const deCompressedData = zlib.inflateSync(cmData)  //zlib.gunzipSync(cmData) 
            resolve(deCompressedData)
        } catch (error) {
            reject(error)
        }
    })
}


main()