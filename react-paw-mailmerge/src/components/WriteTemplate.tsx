import React, { useState } from "react"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import DynamicButton from './DynamicButton';
import { CsvResult } from "../Helpers/CsvFunctions";

interface WriteTemplateProps {
    parsedData: CsvResult | null;
    template: string,
    setTemplate: React.Dispatch<React.SetStateAction<string>>;
}

const WriteTemplate: React.FC<WriteTemplateProps> = ({parsedData, template, setTemplate}) => {
    const [editingEnabled, setEditingEnabled] = useState<boolean>(true); // enable / disable form editing
    const [currentInput, setCurrentInput] = useState<string>('');
    const [previousInput, setPreviousInput] = useState<string>('');  // when form changes are discarded, restore to previousInput
    

    const handleTemplateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentInput(event.target.value);
    }

    const handleTemplateSubmit = () => {
        console.log("Submitting template:", currentInput);
        setPreviousInput(currentInput);
        setTemplate(currentInput);  // state lifting
        setEditingEnabled(false);
    }

    const handleTemplateDiscardChanges = () => {
        setCurrentInput(previousInput);
    }

    const addStringToTemplate = (field:string) => {
        const markedUpValue = "{{"+field+"}}";
        console.log(markedUpValue);
        setCurrentInput(currentInput + markedUpValue);
    }

    const headers = ():Array<string> => {
        let headers = [] as Array<string>;
        if(parsedData !== null && parsedData.data.length > 0){
            for(const prop in parsedData.data[0]){
                headers.push(prop.toString());
            }
        }
        return headers;
    }
    const buttons = parsedData?.header.map((x:string, i)=>{
        return <Button type="button" value={x} onClick={() => addStringToTemplate(x)} key={i}>{x}</Button>;
    });

    return (
        <div>
            <Form onSubmit={handleTemplateSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Compose Template</Form.Label>
                    <div className="mb-3">
                        <Button type="button" className="me-2" onClick={handleTemplateSubmit} hidden={!editingEnabled}>Save Template</Button>
                        <Button type="button" variant="danger" onClick={handleTemplateDiscardChanges} hidden={!editingEnabled || previousInput === currentInput}>Discard Changes</Button>
                        <Button type="button" variant="warning" onClick={() => {setEditingEnabled(true)}} hidden={editingEnabled}>Edit Template</Button>
                    </div>
                    <Form.Control 
                        value={currentInput}
                        onChange={handleTemplateChange}
                        placeholder="Hello {{name}}, ..."
                        as="textarea" 
                        rows={6}
                        disabled={!editingEnabled}
                    />
                </Form.Group>
            </Form>
           <div >{buttons}</div>
        </div>
    )
}

export default WriteTemplate;