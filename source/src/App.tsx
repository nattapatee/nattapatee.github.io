import * as React from "react";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Home } from './components/Home';

export class Index extends React.Component<any, any> {
  public render() {

  return (
    <div className="App">
      <Home/>
    </div>
  );
  }
}

