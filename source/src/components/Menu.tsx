import * as React from 'react'
import { Component } from 'react'
import { render } from 'react-dom'
import { Menu, Button } from 'antd';
import { Image } from 'semantic-ui-react'

import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
declare let require: any;

const { SubMenu } = Menu;

type State = {
    collapsed: false,

};

export class HeaderSide extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }

    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };


    render() {


        return (
            <div style={{backgroundImage: "coding.png"}} className="profile-banner">
                <Image src={require("./Image/Profile.jpeg")} className="profile-img" size='medium' circular />
          </div>
        )
    }


}