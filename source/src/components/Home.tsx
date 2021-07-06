import * as React from 'react'
import { Component } from 'react'
import { render } from 'react-dom'
import { Info } from './Info';
import { HeaderSide } from './Menu';


type State = {

};

export class Home extends Component<any, any> {
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
            <div style={{
              width: "100vw",
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#eeeeee",
              height: "200%"}}>
                    <HeaderSide/>
                    <Info />
          </div>
        )
    }


}