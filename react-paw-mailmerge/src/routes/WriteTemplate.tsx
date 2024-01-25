import React, { useState } from "react"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";


const WriteTemplate: React.FC = () => {
    const [templateValue, setTemplateValue] = useState<string>('');

    const handleTemplateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTemplateValue(event.target.value);
    }

    const handleTemplateSubmit = () => {
        console.log("Submitting template:", templateValue)
    }

    return (
        <div>
            <Form onSubmit={handleTemplateSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Compose Template</Form.Label>
                    <Form.Control 
                        value={templateValue}
                        onChange={handleTemplateChange}
                        placeholder="Hello {{name}}, ..."
                        as="textarea" 
                        rows={6}
                    />
                </Form.Group>
                <Button type="button" onClick={handleTemplateSubmit}>Mail Merge</Button>
            </Form>
        </div>
    )
}

export default WriteTemplate