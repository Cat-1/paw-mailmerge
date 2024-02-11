import { parse, ParseLocalConfig, ParseResult } from 'papaparse';

const NULL_VAL_REPLACEMENT = "NA";

export enum NullFieldOptionEnum{
    Ignore = "Ignore",
    ReplaceWithNa = "Replace"
}

export interface CsvOptions {
    header: boolean;
    nullField: NullFieldOptionEnum;
};

export interface CsvData{
    key: string;
    value: any;
}

export class CsvResult {
    header = new Array<string>();
    data = new Array<object>();
}

export function ParseCsv(myFile:File, options:CsvOptions, resolve: (s: CsvResult) => any, reject:(s:string, o: object) => any)
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
        transform: function(value: string, field: string|number):any {
            if(!options.header){
                return { key: "Col " + field, value: value} as CsvData;
            }
            else return { key: field, value: value} as CsvData} ,
        header: options.header,
        skipEmptyLines: true
    } as ParseLocalConfig<unknown, File>;

    parse(myFile, config);
  }

function HandleNullValues(val: any, nullFieldOption : NullFieldOptionEnum) : any
{
    console.log("Handle Null Value ", val);
    if(val === null || val === ""){
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

function GetHeaders(rowObj:object) : Array<string>{
    let result = [] as Array<string>;
    for(const prop in rowObj){
        result.push(prop);
    }
    return result;
}

function HandleCsvData(obj:CsvData, options:CsvOptions):CsvData{
    obj.value = HandleNullValues(obj.value, options.nullField);
    return obj;
}

function NormalizeJsonObjectResult(parsedCsv:ParseResult<object>, options:CsvOptions) : CsvResult
{
    let result = new CsvResult();
    if(options.header){
        // results["data"] is an array of objects 
        parsedCsv["data"].forEach( (rowObj) => {
            let rowMap = new Map<string, any>();
            Object.entries(rowObj).forEach(([key, val], index) => {
                rowMap.set(key, HandleCsvData(val, options)); // we need to turn this into a Map so we can modify properties in a dynamic object
            });
            result.data.push(Object.fromEntries(rowMap)); // convert from map to object for faster indexing in
        });

    }
    else{ // we need to convert an array of arrays into an array of objects
        result.data = parsedCsv["data"].map( (row) => {
            const rowArray = row as Array<any>; // we don't want to lose dynamic typing
            const rowObj = new Map(); // Have to use a map in order to dynamically add properties to the same object
            rowArray.forEach((val, index) => {
                const propName = "Col " + (index + 1).toString(); // go from 0-index to 1-index
                rowObj.set(propName, HandleCsvData(val, options));
            })
            return Object.fromEntries(rowObj);
        })
        

    }
    result.header = GetHeaders(result.data[0]);
   return result;
}

  export default ParseCsv;
