"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../App.css");
var NavBar_1 = require("../components/NavBar");
var Tab_1 = require("react-bootstrap/Tab");
var Tabs_1 = require("react-bootstrap/Tabs");
var FileUpload_1 = require("../components/FileUpload");
var WriteTemplate_1 = require("../components/WriteTemplate");
var ViewOutput_1 = require("../components/ViewOutput");
function App() {
    var _a = react_1.useState('file-upload'), key = _a[0], setKey = _a[1]; // maintains state for the UI tabs
    var _b = react_1.useState(null), parsedData = _b[0], setParsedData = _b[1]; // output of the CSV parser function
    var _c = react_1.useState(""), template = _c[0], setTemplate = _c[1]; // mail merge template
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(NavBar_1["default"], null),
        react_1["default"].createElement("div", { className: "App" },
            react_1["default"].createElement(Tabs_1["default"], { activeKey: key, onSelect: function (k) { return k && setKey(k); }, className: "mb-3" },
                react_1["default"].createElement(Tab_1["default"], { eventKey: "file-upload", title: "Upload CSV" },
                    react_1["default"].createElement(FileUpload_1["default"], { setParsedData: setParsedData })),
                react_1["default"].createElement(Tab_1["default"], { eventKey: "template", title: "Compose Template" },
                    react_1["default"].createElement(WriteTemplate_1["default"], { parsedData: parsedData, template: template, setTemplate: setTemplate })),
                react_1["default"].createElement(Tab_1["default"], { eventKey: "output", title: "View Output" },
                    react_1["default"].createElement(ViewOutput_1["default"], { parsedData: parsedData, template: template }))))));
}
exports["default"] = App;
