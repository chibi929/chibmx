import { IDFParameters } from './dialog-flow-common';

export interface IDFRequestStatus {
  errorType: string;
  code: number;
}

export interface IDFRequestFulfillment {
  messages: IDFRequestMessage[];
  speech: string;
}

export interface IDFRequestMessage {
  speech: string;
  type: number;
}

export interface IDFRequestMetadata {
  intentId: string;
  webhookForSlotFillingUsed: string;
  intentName: string;
  webhookUsed: string;
}

export interface IDFRequestResult {
  parameters: IDFParameters;
  contexts: any[];
  resolvedQuery: string;
  source: string;
  score: number;
  speech: string;
  fulfillment: IDFRequestFulfillment;
  actionIncomplete: boolean;
  action: string;
  metadata: IDFRequestMetadata;
}

export interface IDFRequestRawInput {
  query: string;
  input_type: number;
}

export interface IDFRequestArgument {
  text_value: string;
  raw_text: string;
  name: string;
}

export interface IDFRequestInput {
  raw_inputs: IDFRequestRawInput[];
  intent: string;
  arguments: IDFRequestArgument[];
}

export interface IDFRequestUser {
  user_id: string;
}

export interface IDFRequestConversation {
  conversation_id: string;
  type: number;
  conversation_token: string;
}

export interface IDFRequestData {
  inputs: IDFRequestInput[];
  user: IDFRequestUser;
  conversation: IDFRequestConversation;
}

export interface IDFOriginalRequest {
  source: string;
  data: IDFRequestData;
}

export interface IDFRequest {
  id: string;
  lang: string;
  timestamp: string;
  sessionId: string;
  status: IDFRequestStatus;
  result: IDFRequestResult;
  originalRequest: IDFOriginalRequest;
}
