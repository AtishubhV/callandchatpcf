import * as React from 'react';
import App from './App';
export interface IHelloWorldProps {
  name?: string;
  userId? : string;
  token? : string;
  threadId ? : string;
  endpoint ? : string;
  displayName ? : string;
  mode ? : string;
}

export class HelloWorld extends React.Component<IHelloWorldProps> {

  public render(): React.ReactNode {
   
    return (
     /*<CallWithChatExperience userId={userId} 
     token={token} 
     displayName={displayName} 
     endpointUrl={endpoint} 
     locator={this.state.createThread.callLocator}/> */
     <>
      <App tokenX={this.props.token} 
userIdX = {this.props.userId}
       threadIdX = {this.props.threadId} 
       endpointX= {this.props.endpoint}
        displayNameX = {this.props.displayName}
        nameX = {this.props.name}
        modeX = {this.props.mode}
        />
  
    

     </>

    )
  }
}
