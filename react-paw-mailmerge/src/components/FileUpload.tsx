import React, { useState, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import InfoCard from './InfoCard';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dataHasHeader, setDataHasHeader] = useState<boolean>(true);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      // parse the CSV and store the parser output as some kind of global state in the react app.
    } else {
      console.error('No file selected.');
    }
  };

  return (
    <div>
        <InfoCard/>
        <div id='file-upload'>
            <h1>Upload CSV File</h1>
            <Form>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Choose a file or drag and drop a file here</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <Form.Group controlId="formCheck" className="mb-3">
                    <Form.Check
                            type='checkbox'
                            id='header-checkbox'
                            label='Data has header'
                            checked={dataHasHeader}
                            onChange={() => {setDataHasHeader(!dataHasHeader)}}
                    />
                </Form.Group>
                <Button onClick={handleFileUpload}>Upload File</Button>
            </Form>
        </div>
    </div>
  );
};

export default FileUpload;