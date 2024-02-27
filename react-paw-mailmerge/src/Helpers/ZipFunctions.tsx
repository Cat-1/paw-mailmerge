import JSZip from 'jszip'
import { saveAs } from 'file-saver';
import { MailMergeResult } from './CsvFunctions';

const MAX_FILE_NAME_LEN = 30;

function generateFileName(prefix: number, mailMergeResult : MailMergeResult) {
    let fileName = mailMergeResult.message.slice(0, MAX_FILE_NAME_LEN).trim();

    fileName = fileName.replace(/[^\w\s]/gi, '');  // keep only alpha, nums, underscores, and whitespaces
    fileName = fileName.replace(/\s+/g, '_');  // replace whitespace with underscore
    const nullValues = mailMergeResult.errors.length > 0 ? "ContainsNullFields_" : "";
    fileName = `${nullValues}${prefix}_${fileName}.txt`;
    return fileName;
}

export function ZipAndDownload(mailMergeResults: Array<MailMergeResult>): void {
    const zip = new JSZip();

    for (let i = 0; i < mailMergeResults.length; i++) {
        let fileName = generateFileName(i + 1, mailMergeResults[i]);  // start the unique numeric id prefix at 1
        zip.file(fileName, mailMergeResults[i].message);
    }

    zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, "mail_merge_output.zip");
    });
}

