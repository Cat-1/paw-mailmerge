import React, { useState } from 'react';
import '../App.css';
import NavBar from '../components/NavBar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FileUpload from './FileUpload';
import WriteTemplate from './WriteTemplate';

function App() {
  const [key, setKey] = useState<string>('file-upload');

  // probably need to lift parsed CSV data and the template string up to this level
  // then process the data and pass them down to the components as props

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
            <FileUpload/>
          </Tab>
          <Tab eventKey="template" title="Compose Template">
            <WriteTemplate/>
          </Tab>
          <Tab eventKey="output" title="View Output" disabled>
            Tab content for Contact
          </Tab>
        </Tabs>
      </div>
    </div>
    
  );
}

export default App;
