/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    groupId: ComponentFramework.PropertyTypes.StringProperty;
    userId: ComponentFramework.PropertyTypes.StringProperty;
    token: ComponentFramework.PropertyTypes.StringProperty;
    threadId: ComponentFramework.PropertyTypes.StringProperty;
    endpoint: ComponentFramework.PropertyTypes.StringProperty;
    displayName: ComponentFramework.PropertyTypes.StringProperty;
    mode: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    groupId?: string;
    userId?: string;
    token?: string;
    threadId?: string;
    endpoint?: string;
    displayName?: string;
    mode?: string;
}
