import 'ts-polyfill'

import * as React from "react";
import { Component } from "react";
import { render } from "react-dom";
// import './index.css'
import {  ConfigProvider} from "antd";
import th_TH from "antd/es/locale-provider/th_TH";
import "antd/dist/antd.css";
import "moment/locale/th";
import moment from 'moment';
import { Index } from './App';

moment.locale("th");

class App extends Component {
  render() {
    return <Index />;
  }
}

render(
    <ConfigProvider locale={th_TH}>
      <App />
    </ConfigProvider>
,
  document.getElementById("root")
);
