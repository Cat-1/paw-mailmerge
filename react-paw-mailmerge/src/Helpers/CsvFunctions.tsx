import { parse, ParseLocalConfig, ParseResult } from 'papaparse';

export class CsvOptions {
    dataHasHeader: boolean;

    constructor(){
        this.dataHasHeader = false;
    }
}

export function ParseCsv(myFile:File, options:CsvOptions, resolve: (s: Array<object>) => any, reject:(s:string, o: object) => any)
{
    const config = 
    {
        dynamicTyping: true, // dynamically type, so that numbers are numbers and bool are bools and not strings
        keepEmptyRows: false, 
        complete: function(results:ParseResult<object>, file:File) { // This is what is called when we successfully parse
            resolve(NormalizeJsonObjectResult(results, options.dataHasHeader));
        },
        error:  function(results:object, file:File) { // This is what is called when we fail to parse
            console.error("Errors:", results, file);
            reject("There was an error", results);
        },
        header: options.dataHasHeader,
        skipEmptyLines: true
    } as ParseLocalConfig<unknown, File>;

    parse(myFile, config);
  }

function NormalizeJsonObjectResult(results:ParseResult<object>, hasHeader:boolean) : Array<object>
{
    if(hasHeader){
        return results["data"];
    }
    else{ // we need to convert an array of arrays into an array of objects
        let objectArray = results["data"].map( (row) => {
            const rowArray = row as Array<any>; // we don't want to lose dynamic typing
            const rowObj = new Map(); // Have to use a map in order to dynamically add properties to the same object
            rowArray.map((val, index) => {
                const propName = "Col " + (index + 1).toString(); // go from 0-index to 1-index
                rowObj.set(propName, val);
            })
            return Object.fromEntries(rowObj);
        })
        return objectArray; 
    }
}

  export default ParseCsv;
