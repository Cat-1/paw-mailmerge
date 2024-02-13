import React from "react"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

interface WriteTemplateProps {
    parsedData: object[] | null;
    template: string,
    setTemplate: React.Dispatch<React.SetStateAction<string>>;
}

const WriteTemplate: React.FC<WriteTemplateProps> = ({parsedData, template, setTemplate}) => {

    const handleTemplateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTemplate(event.target.value);
    }

    const handleTemplateSubmit = () => {
        console.log("Submitting template:", template)
    }

    return (
        <div>
            <Form onSubmit={handleTemplateSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Compose Template</Form.Label>
                    <Form.Control 
                        value={template}
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