import React, { useState } from 'react';
import '../App.css';
import NavBar from '../components/NavBar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FileUpload from '../components/FileUpload';
import WriteTemplate from '../components/WriteTemplate';
import ViewOutput from '../components/ViewOutput';
import { CsvResult } from '../Helpers/CsvFunctions';
import { CurrentPage } from '../Helpers/CurrentPage';

function App() {
  const [key, setKey] = useState<string>('file-upload');  // maintains state for the UI tabs
  const [parsedData, setParsedData] = useState<CsvResult | null>(null);  // output of the CSV parser function
  const [template, setTemplate] = useState<string>("");  // mail merge template
  const [reloadKey, setReloadKey] = useState<number>(0); // trigger WriteTemplate component reload
  const tabs = ["file-upload", "template", "output"]
  const resetTemplate = () => {
    setTemplate('');
    // toggle reloadKey to reload the entire WriteTemplate component
    setReloadKey(reloadKey === 0 ? 1 : 0);
  }

  const changeTabs = (k:number) =>{
    if(k > -1 && k < tabs.length){
      handleTabSelect(tabs[k]);
    }
  }

  const hasPrev = (k:number) => {
    return k > 0;
  }

  const hasNext = (k:number) =>{
    return k + 1 < tabs.length;
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
            <FileUpload setParsedData={setParsedData} resetTemplate={resetTemplate} currentPage={new CurrentPage(0, hasNext(0), hasPrev(0))} setTab={changeTabs}/>
          </Tab>
          <Tab eventKey="template" title="Compose Template">
            <WriteTemplate parsedData={parsedData} template={template} setTemplate={setTemplate} key={reloadKey} currentPage={new CurrentPage(1, hasNext(1), hasPrev(1))}  setTab={changeTabs} />
          </Tab>
          <Tab eventKey="output" title="View Output">
            <ViewOutput parsedData={parsedData} template={template} currentPage={new CurrentPage(2, hasNext(2), hasPrev(2))} setTab={changeTabs}/>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
