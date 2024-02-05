import { parse, ParseLocalConfig, ParseResult } from 'papaparse';

const NULL_VAL_REPLACEMENT = "NA";

export enum NullFieldOptionEnum{
    Ignore,
    ReplaceWithNa
}

export class CsvOptions {
    header: boolean;
    nullFieldOption: NullFieldOptionEnum;

    constructor(){
        this.header = false;
        this.nullFieldOption = NullFieldOptionEnum.Ignore;
    }
}

export function ParseCsv(myFile:File, options:CsvOptions, resolve: (s: Array<object>) => any, reject:(s:string, o: object) => any)
{
    const config = 
    {
        dynamicTyping: false, // dynamically type, so that numbers are numbers and bool are bools and not strings
        keepEmptyRows: false, 
        complete: function(results:ParseResult<object>, file:File) { // This is what is called when we successfully parse
            resolve(NormalizeJsonObjectResult(results, options));
        },
        error:  function(results:object, file:File) { // This is what is called when we fail to parse
            console.error("Errors:", results, file);
            reject("There was an error", results);
        },
        header: options.header,
        skipEmptyLines: true,
        transform: createNullTransformer(options)  // applied on every value. happens before dynamicTyping. 
    } as ParseLocalConfig<unknown, File>;

    parse(myFile, config);
  }

function createNullTransformer (option: CsvOptions) {
    // pack CsvOption into a function that only accepts one argument, the value.
    return function(val: string) {
        return HandleNullValues(val, option);
    }
}

function HandleNullValues(val: any, option: CsvOptions) : string
{   
    if((val === "" || val === null) && option.nullFieldOption === NullFieldOptionEnum.ReplaceWithNa){
        return NULL_VAL_REPLACEMENT;
    }

    return val;
}

function NormalizeJsonObjectResult(results:ParseResult<object>, options:CsvOptions) : Array<object>
{
    let result = [] as Array<object>;
    if(options.header){
        // results["data"] is an array of objects 
        return results["data"];
    }
    else{ // we need to convert an array of arrays into an array of objects
        result = results["data"].map( (row) => {
            const rowArray = row as Array<any>; // we don't want to lose dynamic typing
            const rowObj = new Map(); // Have to use a map in order to dynamically add properties to the same object
            rowArray.forEach((val, index) => {
                const propName = "Col " + (index + 1).toString(); // go from 0-index to 1-index
                rowObj.set(propName, val);
            })
            return Object.fromEntries(rowObj);
        })
        return result; 
    }
}

  export default ParseCsv;
