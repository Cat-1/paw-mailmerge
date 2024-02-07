import React, { useState } from 'react';
import '../App.css';
import NavBar from '../components/NavBar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FileUpload from '../components/FileUpload';
import WriteTemplate from '../components/WriteTemplate';
import ViewOutput from '../components/ViewOutput';

function App() {
  const [key, setKey] = useState<string>('file-upload');  // maintains state for the UI tabs
  const [parsedData, setParsedData] = useState<object[] | null>(null);  // output of the CSV parser function
  const [template, setTemplate] = useState<string>("");  // mail merge template

  return (
    <div>
      <NavBar/>
      <div className="App">
        <Tabs
        activeKey={key}
        onSelect={(k: string | null) => k && setKey(k)}
        className="mb-3"
        >
          <Tab eventKey="file-upload" title="Upload CSV">
            <FileUpload setParsedData={setParsedData}/>
          </Tab>
          <Tab eventKey="template" title="Compose Template">
            <WriteTemplate parsedData={parsedData} template={template} setTemplate={setTemplate}/>
          </Tab>
          <Tab eventKey="output" title="View Output">
            <ViewOutput parsedData={parsedData} template={template}/>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
