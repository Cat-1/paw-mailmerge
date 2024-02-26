import React, { useState } from 'react';
import '../App.css';
import NavBar from '../components/NavBar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FileUpload from '../components/FileUpload';
import WriteTemplate from '../components/WriteTemplate';
import ViewOutput from '../components/ViewOutput';
import { CsvResult } from '../Helpers/CsvFunctions';

function App() {
  const [key, setKey] = useState<string>('file-upload');  // maintains state for the UI tabs
  const [parsedData, setParsedData] = useState<CsvResult | null>(null);  // output of the CSV parser function
  const [template, setTemplate] = useState<string>("");  // mail merge template
  const [reloadKey, setReloadKey] = useState<number>(0); // trigger WriteTemplate component reload

  const resetTemplate = () => {
    setTemplate('');
    // toggle reloadKey to reload the entire WriteTemplate component
    setReloadKey(reloadKey === 0 ? 1 : 0);
  }

  const handleTabSelect = (k:string|null) =>{
    if(k !== null){
      setKey(k);
    }
  }

  return (
    <div>
      <NavBar/>
      <div className="App">
        <Tabs
        activeKey={key}
        onSelect={(k)=>handleTabSelect(k)}
        className="mb-3"
        >
          <Tab eventKey="file-upload" title="Upload CSV">
            <FileUpload setParsedData={setParsedData} resetTemplate={resetTemplate} nextPageKey="template" setTab={handleTabSelect}/>
          </Tab>
          <Tab eventKey="template" title="Compose Template">
            <WriteTemplate parsedData={parsedData} template={template} setTemplate={setTemplate} key={reloadKey} nextPageKey="output" setTab={handleTabSelect} />
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
