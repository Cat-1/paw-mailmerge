import JSZip from 'jszip'
import { saveAs } from 'file-saver';

const MAX_FILE_NAME_LEN = 30;

function generateFileName(prefix: number, text: string) {
    let fileName = text.slice(0, MAX_FILE_NAME_LEN).trim();
    fileName = fileName.replace(/[^\w\s]/gi, '');  // keep only alpha, nums, underscores, and whitespaces
    fileName = fileName.replace(/\s+/g, '_');  // replace whitespace with underscore
    fileName = `${prefix}_${fileName}.txt`;
    return fileName;
}

export function ZipAndDownload(outputTexts: string[]): void {
    const zip = new JSZip();

    for (let i = 0; i < outputTexts.length; i++) {
        let fileName = generateFileName(i + 1, outputTexts[i]);  // start the unique numeric id prefix at 1
        zip.file(fileName, outputTexts[i]);
    }

    zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, "mail_merge_output.zip");
    });
}

