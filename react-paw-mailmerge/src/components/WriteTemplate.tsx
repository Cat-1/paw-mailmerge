import React, { useState, useRef } from "react"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { CsvResult, EXTRA_COLUMNS } from "../Helpers/CsvFunctions";

interface WriteTemplateProps {
    parsedData: CsvResult | null;
    template: string,
    setTemplate: React.Dispatch<React.SetStateAction<string>>;
}

const WriteTemplate: React.FC<WriteTemplateProps> = ({parsedData, template, setTemplate}) => {
    const [editingEnabled, setEditingEnabled] = useState<boolean>(true); // enable / disable form editing
    const [currentInput, setCurrentInput] = useState<string>('');
    const [previousInput, setPreviousInput] = useState<string>('');  // when form changes are discarded, restore to previousInput
    const templateRef = useRef<HTMLTextAreaElement>(null);
    const cursorRef = useRef<number | null>(null); // tracks the cursor location

    const handleTemplateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentInput(event.target.value);
        cursorRef.current = event.target.selectionStart;
    }

    const handleTemplateClick = ()=>{
        const cursorPos = templateRef.current?.selectionStart ?? cursorRef.current ?? 0;
        cursorRef.current = cursorPos;
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
        if(editingEnabled){
            const markedUpValue = "{{"+field+"}} "; 
            let cursorPosition = cursorRef.current ?? templateRef.current?.selectionStart ?? 0; // we need this in case someone presses two buttons without clicking back into the textbox
            const substring1 = currentInput.substring(0, cursorPosition);
            const substring2 = currentInput.substring(cursorPosition);
            setCurrentInput(substring1 + markedUpValue + substring2);

            //update cursorRef and templateRef
            cursorRef.current = cursorPosition + markedUpValue.length;
            templateRef.current?.setSelectionRange(cursorPosition + markedUpValue.length, cursorPosition + markedUpValue.length);
            templateRef.current?.focus(); // reactivate the cursor in the text box
        }
    }

    const buttons = parsedData?.header.map((field:string, index)=>{
        if(field !== EXTRA_COLUMNS){
            return <Button type="button" value={field} onClick={() => addStringToTemplate(field)} key={index} id="{index}-button">{field}</Button>;
        }
        return "";
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
                        onClick={handleTemplateClick}
                        onChange={handleTemplateChange}
                        placeholder="Hello {{name}}, ..."
                        as="textarea" 
                        rows={6}
                        disabled={!editingEnabled}
                        ref={templateRef}
                    />
                </Form.Group>
            </Form>
           <div >{buttons}</div>
        </div>
    )
}

export default WriteTemplate;