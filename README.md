The callandchatpcf component uses Azure Communication Services to establish chat and video calls. I highly recommend to go through below links before configuring in your app. You should have Azure Communication Service provisioned in your tenant before proceeding the steps.

https://learn.microsoft.com/en-us/connectors/acsidentity/

https://learn.microsoft.com/en-us/connectors/acschat/


After importing the component please 
pass below properties:

1. groupId : Any GUID, this must be common between the caller and the callee to join on the same call.

2. userId : This is the Azure Communication Service userId, this can be generated through Azure Communication Identity Service Connector in PowerApps or Power Automate.

3. token: Again use the Azure Communication Service Connector to generate a token for the user created in the earlier step.

4. threadId: Use thr Azure Communication Services Chat connector action to create a threadId. The threadId should have a scope of chat and voip.

5. endpoint: This would the endpoint of the Azure Communication Service provisioned on your tenant.

6. displayName: The display name of the user joining the chat or video call.

7. mode : Should be "chat" or "call"


The same control works for chat and video call.

Thanks for reading.
