import {
    AzureCommunicationTokenCredential,
    CommunicationUserIdentifier,
  } from '@azure/communication-common';
  import * as React from 'react';
  import { Features, CallKind, CaptionsCallFeature, CallAgent, Call, TeamsCaptions, TeamsCaptionsHandler } from '@azure/communication-calling';
  import {
    CallComposite,
    CaptionsInfo,
    ChatComposite,
    StatefulCallClient,
    createStatefulCallClient,
    fromFlatCommunicationIdentifier,
    useAzureCommunicationCallAdapter,
    useAzureCommunicationChatAdapter,
  } from '@azure/communication-react';
  import  {
    CSSProperties,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from 'react';
  import { v4 as uuidv4 } from 'uuid';
  import { ChatClient } from '@azure/communication-chat';
  import { initializeIcons } from 'office-ui-fabric-react';
  
  
  /**
   * Authentication information needed for your client application to use
   * Azure Communication Services.
   *
   * For this quickstart, you can obtain these from the Azure portal as described here:
   * https://docs.microsoft.com/en-us/azure/communication-services/quickstarts/identity/quick-create-identity
   *
   * In a real application, your backend service would provide these to the client
   * application after the user goes through your authentication flow.
   */
  const ENDPOINT_URL = 'https://iba-azurecommunicationservices.india.communication.azure.com';
  const USER_ID = '8:acs:07871b7d-0dba-4fd9-a6e9-3a77b29610a9_00000021-0f14-9686-c126-63bd45607979';
  const TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwNUVCMzFEMzBBMjBEQkRBNTMxODU2MkM4QTM2RDFCMzIyMkE2MTkiLCJ4NXQiOiJZRjZ6SFRDaURiMmxNWVZpeUtOdEd6SWlwaGsiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOjA3ODcxYjdkLTBkYmEtNGZkOS1hNmU5LTNhNzdiMjk2MTBhOV8wMDAwMDAyMS0wZjE0LTk2ODYtYzEyNi02M2JkNDU2MDc5NzkiLCJzY3AiOjE3OTIsImNzaSI6IjE3MTk4NTI1MjgiLCJleHAiOjE3MTk5Mzg5MjgsInJnbiI6ImluIiwiYWNzU2NvcGUiOiJjaGF0LHZvaXAiLCJyZXNvdXJjZUlkIjoiMDc4NzFiN2QtMGRiYS00ZmQ5LWE2ZTktM2E3N2IyOTYxMGE5IiwicmVzb3VyY2VMb2NhdGlvbiI6ImluZGlhIiwiaWF0IjoxNzE5ODUyNTI4fQ.ehxqGf0mAGBebAe6qaALSsYOM5cWYAcTlpI-raanePuf_KXxlN3VmQnrzn1gqAlS-A2XM5koFXpPq7OkUYT_IqCrkXy7pLuREfLi6N8_0yWg-_Arse2IrlkqQqLKya2-WyH05wIg3VFI9lj9g3LrToj5UIu65F8ZEcqzBi5_lVqkwFg-eor9k6g4bnqoO75riXfogAbqPNuFi7m9pb-wIrFMMIJVnIXrc10GfLeods1xqxGtSq81km0j9y2QNX1JwuDsE0xDErtyo5WOjVb3pEDPJNUvvfibOjhn8GmnVobjiU7zE0BH9CdbhHltnNJFuGEUhJ0VBBlic8cQHCWR7w';
  const DISPLAY_NAME = 'Danny';
  const THREAD_ID = '19:c10c5588b03446a4b19aae4959d7f9ae@thread.v2';
  const TOPIC = 'Get together!'

  /**
   * Display name for the local participant.
   * In a real application, this would be part of the user data that your
   * backend services provides to the client application after the user
   * goes through your authentication flow.
   */
  


  initializeIcons();
  
  /**
   * Entry point of your application.
   */
  function App(props: { endpointX?: any; userIdX?: any; tokenX?: any; displayNameX?: any; threadIdX?: any; nameX?:any; modeX?:any  } ): JSX.Element {
    // Arguments that would usually be provided by your backend service or
    // (indirectly) by the user.
    //const { endpointUrl, userId, token, displayName, groupId, threadId } =
    const { endpointUrl, userId, token, displayName, groupId, threadId,name, mode } =
      //useAzureCommunicationServiceArgs();
      useAzureCommunicationServiceArgs(props.tokenX, props.userIdX, props.threadIdX,props.endpointX,props.displayNameX,props.nameX, props.modeX);
      // New Code
      /*
      const groupId = useRef(uuidv4());
      const endpointUrl =  props.endpoint;
      const userId = props.userId;
      const token = props.token;
      const displayName = props.displayName;
      const threadId = props.threadId;
      useAzureCommunicationServiceArgs(endpointUrl, userId, token, displayName, groupId, threadId);
      */
         // New Code
    // A well-formed token is required to initialize the chat and calling adapters.
    const credential = useMemo(() => {
      try {
        return new AzureCommunicationTokenCredential(token);
      } catch {
        console.error('Failed to construct token credential');
        return undefined;
      }
    }, [token]);
  

    // Memoize arguments to `useAzureCommunicationCallAdapter` so that
    // a new adapter is only created when an argument changes.
   
    const callAdapterArgs = useMemo(
      () => ({
        userId: fromFlatCommunicationIdentifier(
          userId
        ) as CommunicationUserIdentifier,
        displayName,
        credential,
        locator: {
          groupId,
          
        },
      }),
      //[userId, credential, displayName, groupId]
      [userId, credential, displayName, groupId]
    );
   
    const callAdapter = useAzureCommunicationCallAdapter(callAdapterArgs);

  
  //Here
   
    //let captionsCallFeature: CaptionsCallFeature = callAdapter..feature(Features.Captions);
    //let captionsCallFeature: CaptionsCallFeature = callAdapter.startCaptions
    // Memoize arguments to `useAzureCommunicationChatAdapter` so that
    // a new adapter is only created when an argument changes.
    
    const chatAdapterArgs = useMemo(
      () => ({
        endpoint: endpointUrl,
        userId: fromFlatCommunicationIdentifier(
          userId
        ) as CommunicationUserIdentifier,
        displayName,
        credential,
        threadId,
      }),
      [endpointUrl, userId, displayName, credential, threadId]
    );
    const chatAdapter = useAzureCommunicationChatAdapter(chatAdapterArgs);
   
  
    if (!!callAdapter && !!chatAdapter && mode == "chat" ) {
      return (
        <div style={{ height: '100%', display: 'flex', width: '100%' }}>
          <div style={containerStyle}>
        
            <ChatComposite  adapter={chatAdapter} />
           
          
          </div>
        
        </div>
      );
    }
    else if(!!callAdapter && !!chatAdapter && mode == "call" ){
      return (
        <div style={{ height: '100%', display: 'flex', width: '100%' }}>
          <div style={containerStyle}>
        
          <CallComposite formFactor="mobile" adapter={callAdapter} options={{ callControls: { displayType: 'compact' } }} />
           
          
          </div>
        
        </div>
      );
    }
    if (credential === undefined) {
      return (
        <h3>Failed to construct credential. Provided token is malformed.</h3>
      );
    }
    return <h3>Connecting...</h3>;
  }
  
  const containerStyle: CSSProperties = {
    border: 'solid 0.125rem olive',
    margin: '0.5rem',
    width: '50vw',
  };
  /**
   * This hook returns all the arguments required to use the Azure Communication services
   * that would be provided by your backend service after user authentication
   * depending on the user-flow (e.g. which chat thread to use).
   */
  function useAzureCommunicationServiceArgs( _token?:any, _userId?:any,_threadId?:any,_endpointUrl?:any, _displayName?:any, _name?:any, _mode?:any): {
    endpointUrl: string;
    userId: string;
    token: string;
    displayName: string;
    groupId: string;
    threadId: string;
    name:string;
    mode:string;
  } {
    //const [threadId, setThreadId] = useState('');
    // For the quickstart, create a new thread with just the local participant in it.
    /*useEffect(() => {
      (async () => {
        const client = new ChatClient(
          ENDPOINT_URL,
          new AzureCommunicationTokenCredential(TOKEN)
        );
        const { chatThread } = await client.createChatThread(
          {
            topic: TOPIC,
          },
          {
            participants: [
              {
                id: fromFlatCommunicationIdentifier(USER_ID),
                displayName: DISPLAY_NAME,
              },
            ],
          }
        );
        setThreadId(chatThread?.id ?? '');
      })();
    }, []);
    */
  
    // For the quickstart, generate a random group ID.
    // The group Id must be a UUID.
    //const groupId = useRef(uuidv4());
 
  //New 
  //Here
 
    return {
      endpointUrl: _endpointUrl,
      userId: _userId,
      token: _token,
      displayName: _displayName,
      //groupId: groupId.current,
      groupId: _name,
      threadId:_threadId,
      name:_name,
      mode : _mode
    };
    
    // New
    /*
    return {
        endpointUrl: ENDPOINT_URL,
        userId: USER_ID,
        token: TOKEN,
        displayName: DISPLAY_NAME,
        groupId: groupId.current,
        threadId:THREAD_ID,
      };
      */
  }
  
  export default App;