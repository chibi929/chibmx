import { IDFParameters } from './dialog-flow-common';

export interface IDFResponseContext {
  name: string;
  lifespan: 2
  parameters: IDFParameters;
}

export interface IDFResponseFollowupEvent {
  name: string;
  data: {
    parameter_name: string;
  };
}

export interface IDFResponse {
  speech: string;
  displayText: string;
  data?: any;
  contextOut?: any;
  source?: string;
  followupEvent?: IDFResponseFollowupEvent;
}
