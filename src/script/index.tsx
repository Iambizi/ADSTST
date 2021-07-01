import * as React from 'react';
import * as ReactDom from 'react-dom';
import coverageData from "../data/coverage.json";
import { App } from './components/App';

ReactDom.render(<App data={coverageData} />, document.querySelector('#app'));
