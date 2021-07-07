import * as React from 'react'
import { Component } from 'react'
import { render } from 'react-dom'
import { Menu, Button } from 'antd';
import { Header, Icon, Image } from 'semantic-ui-react'
import { DownloadOutlined, GithubOutlined, LinkedinOutlined, PrinterOutlined } from '@ant-design/icons';

declare let require: any;

const { SubMenu } = Menu;

type State = {

};

export class Info extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        }
    }


    public onPrint = () => {
        window.print();

    }

    render() {


        return (
            <div className="info">
                <div className="info-title">
                    <h1 className="typewriter" style={{ fontWeight: "bold" }}>Nattapat  Ekapobyothin</h1>
                    <br />
                    <div style={{ color: "#bcbcbc", fontSize: 18, marginTop: 10 }}>
                        <span className="text-bold">E-mail:</span> nattapat.ek@gmail.com <span className="text-bold">Line:</span> neogonn
                    </div>
                    <div style={{ color: "#bcbcbc", fontSize: 18, marginTop: 10 }}>
                        <span className="text-bold">Tel:</span> 087-5495690
                    </div>
                    <div style={{ marginTop: 10 }}>

                        <a href="https://github.com/nattapatee" target="_blank">
                            <Button type="link" shape="round" icon={<GithubOutlined />} style={{ marginRight: 5 }}>
                                Github
                            </Button>
                        </a>

                        <a href="https://www.linkedin.com/in/nattapat-ekapobyothin-4967a3200/" target="_blank">
                            <Button type="link" shape="round" icon={<LinkedinOutlined />} style={{ marginRight: 5 }}>
                                LinkedIn
                            </Button>
                        </a>

                        {/* <Button type= shape="round" icon={<DownloadOutlined />} >
                            Print
                        </Button> */}
                    </div>

                </div>
                <div className="Skill-Box" style={{ marginTop: 40 }}>
                    <Header as='h3'>
                        <Icon name='trophy' />
                        <Header.Content>
                            Objective
                        </Header.Content>
                    </Header>
                    <hr />
                    <div className="skill-text">
                        Looking for new job as Frontend Developer or Software Developer
                    </div>
                </div>

                <div className="Skill-Box" style={{ marginTop: 40 }}>
                    <Header as='h3'>
                        <Icon name='user outline' />
                        <Header.Content>
                            Persernal Details
                        </Header.Content>
                    </Header>
                    <hr />
                    <div className="skill-text">
                        <span className="text-bold">Name:</span> Nattapat  Ekapobyothin (Tee)
                    </div>
                    <div className="skill-text">
                        <span className="text-bold">Height:</span> 181cm.
                    </div>
                    <div className="skill-text">
                        <span className="text-bold">Weight:</span> 71kg.
                    </div>
                    <div className="skill-text">
                        <span className="text-bold">Date of Birth:</span> 11 October 1996
                    </div>
                    <div className="skill-text">
                        <span className="text-bold">Nationality:</span> Thai
                    </div>
                    <div className="skill-text">
                        <span className="text-bold">Language:</span> Thai (Native), English (Upper Intermediate)
                    </div>
                </div>

                <div className="Skill-Box" style={{ marginTop: 40 }}>
                    <Header as='h3'>
                        <Icon name='graduation cap' />
                        <Header.Content>
                            Education
                        </Header.Content>
                    </Header>
                    <hr />
                    <div className="skill-text">
                        <div>
                            Bachelor of Business information technology
                        </div>
                        <div>
                            Faculty of Business Administration  (2015 - 2019),
                        </div>
                        <div>
                            RAJAMANGALA UNIVERSITY OF TECHNOLOGY RATTANKOSIN.
                        </div>
                        <div>
                            <span className="text-bold">GPA:</span> 2.76
                        </div>
                    </div>
                </div>

                <div className="Skill-Box" style={{ marginTop: 40 }}>
                    <Header as='h3'>
                        <Icon name='star outline' />
                        <Header.Content>
                            Skills
                        </Header.Content>
                    </Header>
                    <hr />
                    <div className="skill-text">
                        <div>
                            <span className="text-bold">Programming Languages:</span> JavaScript, TypeScript, C#, VB.NET, SQL
                        </div>
                        <div>
                            <span className="text-bold">Technologies:</span> Docker, Alfresco, Node.js, Keycloak, SQL, PDF.js, WebTwain.
                        </div>
                        <div>
                            <span className="text-bold">Framework & Libraries:</span>  React, Vue.Js ,JQuery, ASP.NET Core, Entity Framework, SignalR, NSwag.
                        </div>
                        <div>
                            <span className="text-bold">Tools:</span> Figma, GIT Version Control,  Github Action, VSCode, Visual Studio, Sublime, Azure Devops, IIS, Cake Build, Jira, Basecamp.
                        </div>
                    </div>
                </div>

                <div className="Skill-Box" style={{ marginTop: 40 }}>
                    <Header as='h3'>
                        <Icon name='suitcase' />
                        <Header.Content>
                            Experiences
                        </Header.Content>
                    </Header>
                    <hr />
                    <div className="skill-text">
                        <div>
                            Solfware Developer at <span className="text-bold">B Circle Co., Ltd.</span> (March 2019 - Present).
                        </div>
                        <ul>
                            <li>Develop Scan service Report web application for client company such as DHL, Isuzu and TIP Insure.</li>
                            <li>Main duty is write Frontend and design ui E-Document Sarabun for client company such as Kasetsart University.</li>
                            <li>Main duty is write Frontend and design ui Document and Records management system for client company such as The Civil Aviation Authority of Thailand.</li>
                            <li>Develop KM system web application for client company such as Apollo oil.</li>
                            <li>Develop Alfresco Custom ui for client company such as Ngern Tid Lor and Kasikorn Securities.</li>
                            <li>Develop Alfresco workflow Report, Mass approve web application and Keycloak login page for client company such as PTT OR.</li>
                            <li>Design web application by Figma for custom project.</li>
                            <li>Taught interns.</li>
                        </ul>

                    </div>
                </div>
                <div style={{ width: "100%", textAlign: "center" }}>
                    <Button className="btn-print" onClick={this.onPrint} shape="round" icon={<PrinterOutlined />} >
                        Print
                    </Button>
                </div>
                <br />

            </div>
        )
    }


}