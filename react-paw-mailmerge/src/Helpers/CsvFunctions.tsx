import { parse, ParseLocalConfig, ParseResult } from 'papaparse';

const NULL_VAL_REPLACEMENT = "NA";

export enum NullFieldOptionEnum{
    Ignore,
    ReplaceWithNa
}

export interface CsvOptions {
    header: boolean;
    nullFieldOption: NullFieldOptionEnum;
}

export function ParseCsv(myFile:File, options:CsvOptions, resolve: (s: Array<object>) => any, reject:(s:string, o: object) => any)
{
    const config = 
    {
        dynamicTyping: true, // dynamically type, so that numbers are numbers and bool are bools and not strings
        keepEmptyRows: false, 
        complete: function(results:ParseResult<object>, file:File) { // This is what is called when we successfully parse
            resolve(NormalizeJsonObjectResult(results, options));
        },
        error:  function(results:object, file:File) { // This is what is called when we fail to parse
            console.error("Errors:", results, file);
            reject("There was an error", results);
        },
        header: options.header,
        skipEmptyLines: true
    } as ParseLocalConfig<unknown, File>;

    parse(myFile, config);
  }

function HandleNullValues(val: any, nullFieldOption : NullFieldOptionEnum) : any
{
    if(val === null){
        if(nullFieldOption === NullFieldOptionEnum.Ignore){
            return "";
        }
        else if(nullFieldOption === NullFieldOptionEnum.ReplaceWithNa){
            return NULL_VAL_REPLACEMENT;
        }
    }
    else{
        return val;
    }
}

function NormalizeJsonObjectResult(results:ParseResult<object>, options:CsvOptions) : Array<object>
{
    let result = [] as Array<object>;
    if(options.header){
        // results["data"] is an array of objects 
        results["data"].forEach( (rowObj) => {
            let rowMap = new Map<string, any>();
            Object.entries(rowObj).forEach(([key, val]) => {
                rowMap.set(key, HandleNullValues(val, options.nullFieldOption)); // we need to turn this into a Map so we can modify properties in a dynamic object
            });
            result.push(Object.fromEntries(rowMap)); // convert from map to object for faster indexing in
        });
        return result;
    }
    else{ // we need to convert an array of arrays into an array of objects
        result = results["data"].map( (row) => {
            const rowArray = row as Array<any>; // we don't want to lose dynamic typing
            const rowObj = new Map(); // Have to use a map in order to dynamically add properties to the same object
            rowArray.forEach((val, index) => {
                const propName = "Col " + (index + 1).toString(); // go from 0-index to 1-index
                rowObj.set(propName, HandleNullValues(val, options.nullFieldOption));
            })
            return Object.fromEntries(rowObj);
        })
        return result; 
    }
}

  export default ParseCsv;
