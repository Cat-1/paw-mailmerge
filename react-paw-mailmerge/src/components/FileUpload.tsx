import React, { useState, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import InfoCard from './InfoCard';
import { CsvOptions, ParseCsv } from '../Helpers/CsvFunctions';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dataHasHeader, setDataHasHeader] = useState<boolean>(true);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  const validateFile = (file: File): string[] => {
    const errors: string[] = [];
    const type = file.type;
    const size_limit = 10 * 1024 * 1024;  // file.size is in bytes. 10 mb = 10 * 1024 * 1024 bytes

    if (type !== 'text/csv' && type !== 'application/vnd.ms-excel') {
       errors.push(`Expected file with MIME type text/csv or application/vnd.ms-excel, got ${type}.`);
    }
    
    if (file.size === 0) {
      errors.push("File cannot be empty.");
    }
    if (file.size > size_limit) {
      errors.push("File size cannot exceed 10 megabytes.");
    }
    return errors;
  }

  const handleFileUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);

      const errors = validateFile(selectedFile);
      if (errors.length === 0) {
        // proceed to CSV parsing.
        var options = new CsvOptions();
        options.header = dataHasHeader; // this may need to be adjusted
        //TODO: Write actual callbacks that do something with the result
        ParseCsv(selectedFile, options, (result) => console.log(result), (message, obj) => {
          console.error(message);
          console.error(obj);
        });
    
      } else {
        console.error(errors);
      }
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