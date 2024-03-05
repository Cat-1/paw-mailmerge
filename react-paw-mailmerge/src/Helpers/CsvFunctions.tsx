import { parse, ParseLocalConfig, ParseResult } from 'papaparse';

export const NULL_VAL_REPLACEMENT = "NA";
const UNDEFINED_FIELD = "{{Undefined Field}}";
export enum NullFieldOptionEnum{
    Ignore = "Ignore",
    ReplaceWithNa = "Replace"
}

export interface MailMergeResult {
    message: string,
    errors: Array<string>
};

export interface CsvOptions {
    header: boolean;
    nullField: NullFieldOptionEnum;
};

export class CsvResult {
    header = new Array<string>();
    data = new Array<object>();
}

// this is where papaparse extracts more columns than we have header rows
export const EXTRA_COLUMNS = "__parsed_extra";

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
        header: options.header,
        skipEmptyLines: true
    } as ParseLocalConfig<unknown, File>;

    parse(myFile, config);
  }

function HandleNullValues(val: any, nullFieldOption : NullFieldOptionEnum) : any
{
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

function NormalizeJsonObjectResult(parsedCsv:ParseResult<object>, options:CsvOptions) : CsvResult
{
    let result = new CsvResult();
    if(options.header){
        // results["data"] is an array of objects 
        parsedCsv["data"].forEach( (rowObj) => {
            let rowMap = new Map<string, any>();
            Object.entries(rowObj).forEach(([key, val], index) => {
                rowMap.set(key, HandleNullValues(val, options.nullField)); // we need to turn this into a Map so we can modify properties in a dynamic object
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
                rowObj.set(propName, HandleNullValues(val, options.nullField));
            })
            return Object.fromEntries(rowObj);
        })
    }
    result.header = GetHeaders(result.data[0]);
   return result;
}

// Gets the {{fields}} from within the typed template
function GetFields(template: string) : string[]{
    const regex = /{{([^}]+)}}/g; // match on everything between the braces except for a closed brace
    const found = template.match(regex) ?? new Array<string>();
    let result = new Array<string>();
    for(let i = 0; i< (found.length); i++)
    {
        if(!result.includes(found[i])){
            result.push(found[i]); // we only need to add this once
        }
    }
    return result;
}

// Check the template to ensure all braces are closed and that there are no invalid {{fields}}
export function CheckTemplate(templateMessage: string, headers:Array<string>|undefined):Array<string>{
    let errorMessages = new Array<string>();
    var fields = GetFields(templateMessage); // get all {{fields}} represented in the array
    for(const i in fields){
        if(headers === null || !headers?.includes(fields[i]?.replace("{{", "").replace("}}",""))){
            errorMessages.push(`Undefined Field - ${fields[i]}`);
        }
    }

    //Do we have any {{ or }} values that have not been identified as fields?
    const dummyObj = {}
    let mailMergeResult = DoMailMerge(dummyObj, templateMessage);
    // all fields are going to be undefined because we've passed in an empty object
    mailMergeResult.message = mailMergeResult.message.replaceAll(UNDEFINED_FIELD, ""); 
    const doubleOpen = mailMergeResult.message.match(/{{/g);
    const doubleClose = mailMergeResult.message.match(/}}/g);

    if( (doubleOpen?.length ?? 0) !== 0){
        errorMessages.push("Invalid Syntax -- Opening double braces ('{{') without appropriate closing double braces ('}}')");
    }

    if((doubleClose?.length ?? 0) !== 0){
        errorMessages.push("Invalid Syntax -- Closing double braces ('}}') without appropriate opening double braces ('{{')");
    }

    return errorMessages;
}



// Returns a merged string and an array of fields that have null values
export function DoMailMerge(rowObj: any, templateMessage: string):MailMergeResult{
    var errors = new Array<string>();
    var fields = GetFields(templateMessage);
    rowObj = rowObj ?? {};
    for(const index in fields){
        var fieldName = fields[index].replace("{{","").replace("}}","");

        // All objects should have all fields (even if they're null)
        // So if the property lookup is null, that means the field is undefined in the CSV header
        const replacementVal = rowObj[fieldName] ?? UNDEFINED_FIELD;
        if(replacementVal === "" || replacementVal === NULL_VAL_REPLACEMENT){
            errors.push(`Null Field in Merge - ${fieldName}`);
        }
        templateMessage = templateMessage.replaceAll(fields[index], replacementVal);
    }
    
    return {message: templateMessage, errors: errors} as MailMergeResult;
}


  export default ParseCsv;

