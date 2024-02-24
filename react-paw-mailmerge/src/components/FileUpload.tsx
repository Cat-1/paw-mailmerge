import React, { useState, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import InfoCard from './InfoCard';
import { CsvOptions, CsvResult, ParseCsv } from '../Helpers/CsvFunctions';
import PopUpAlert from './PopUpAlert';
import { AlertVariant } from './PopUpAlert';
import PopUpModal from './PopUpModal';

interface FileUploadProps {
  setParsedData: React.Dispatch<React.SetStateAction<CsvResult | null>>;
  resetTemplate: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({setParsedData, resetTemplate}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dataHasHeader, setDataHasHeader] = useState<boolean>(true);
  const [nullFieldOption, setNullFieldOption] = useState<string>('Ignore');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const dismissSuccessAlert = () => {
    setSuccessMessage(null);
  }

  const dismissErrorModal = () => {
    setErrorMessages([]);
  }

  const addErrorMessage = (newItem: string | string[]) => {
    if (Array.isArray(newItem)) {
      setErrorMessages([...errorMessages, ...newItem]);
    } else {
      setErrorMessages([...errorMessages, newItem]);
    }
  }

  const getParserOpts = (): CsvOptions => {
    const opts = {
      header: dataHasHeader,
      nullField: nullFieldOption,
    };
    return opts as CsvOptions;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  const validateFile = (file: File): string[] => {
    const errors: string[] = [];
    const type = file.type;
    const size_limit = 10 * 1024 * 1024;  // file.size is in bytes. 10 mb = 10 * 1024 * 1024 bytes

    if (!(type === 'text/csv' || type === 'application/vnd.ms-excel' || type === 'text/plain')) {
      errors.push(`Unexpected MIME type, got ${type}.`);
    }
    
    if (file.size === 0) {
      errors.push("File cannot be empty.");
    }
    if (file.size > size_limit) {
      errors.push("File size cannot exceed 10 megabytes.");
    }
    return errors;
  }

  // ParseCsv callback
  const onParsingSuccess = (result: CsvResult) => {
    setParsedData(result);
    resetTemplate();
    console.log(result);
  }

  const onParsingFailure = (message: string, obj: object) => {
    console.error(message);
    console.error(obj);
    addErrorMessage([message, JSON.stringify(obj)]);
  }

  const handleFileUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);

      const errors = validateFile(selectedFile);
      if (errors.length === 0) {
        // proceed to CSV parsing.
        setSuccessMessage(`Successfully loaded ${selectedFile.name}.`)
        var options = getParserOpts(); // this may need to be adjusted
        ParseCsv(selectedFile, options, onParsingSuccess, onParsingFailure);
      } else {
        addErrorMessage(errors);
        console.error(errors);
      }
    } else {
      addErrorMessage('No file selected');
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
                <Form.Group>
                  <Form.Label>Empty field parsing option: </Form.Label>
                  <div className='mb-3'>
                    <Form.Check
                      inline
                      type='radio'
                      value='Ignore'
                      label='Parse as empty string'
                      checked={nullFieldOption === 'Ignore'}
                      onChange={(event) => {setNullFieldOption(event.target.value)}}
                      />
                    <Form.Check
                      inline
                      type='radio'
                      value='Replace'
                      label='Replace with N/A'
                      checked={nullFieldOption === 'Replace'}
                      onChange={(event) => {setNullFieldOption(event.target.value)}}
                      />
                  </div>
                </Form.Group>
                {successMessage && <PopUpAlert variant={AlertVariant.success} messages={[successMessage]} onClose={dismissSuccessAlert}/>}
                {errorMessages.length > 0 && <PopUpModal messages={errorMessages} onClose={dismissErrorModal}/>}
                <Button onClick={handleFileUpload}>Upload File</Button>
            </Form>
        </div>
    </div>
  );
};

export default FileUpload;