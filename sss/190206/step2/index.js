const Alexa = require('ask-sdk-core');

// ##################################################
// # インテントハンドラーの実装
// ##################################################

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = toTextWithSSML(handlerInput, 'ハンズオンスキルが起動しました！');
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const GreetingIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GreetingIntent';
  },
  handle(handlerInput) {
    const speechText = toTextWithSSML(handlerInput, 'こんにちは、本日も楽しく学びましょう！');
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const SpeedIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SpeedIntent';
  },
  handle(handlerInput) {
    const speedSlot = handlerInput.requestEnvelope.request.intent.slots.speed;
    let speechText = '';
    if (!speedSlot.resolutions || speedSlot.resolutions.resolutionsPerAuthority[0].status.code !== 'ER_SUCCESS_MATCH') {
      speechText = toTextWithSSML(handlerInput, `モードを認識できない、または不正な値です。モード設定をする場合はもう一度お試しください。`);
    } else {
      const speedSlotValueName = speedSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
      setSpeedAttribute(handlerInput, speedSlotValueName);
      speechText = toTextWithSSML(handlerInput, `「${speedSlotValueName}」モードに設定しました！`);
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = toTextWithSSML(handlerInput, 'このスキルは、2月6日開催のアレクサハンズオンのスキルです。');
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = toTextWithSSML(handlerInput, 'ハンズオンスキルを終了します！。');
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    const speechText = toTextWithSSML(handlerInput, 'エラーメッセージです');
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

// ##################################################
// # 自前関数
// ##################################################

const setSpeedAttribute = (handlerInput, speed) => {
  handlerInput.attributesManager.setSessionAttributes({ speed: speed });
};

const toTextWithSSML = (handlerInput, text) => {
  const attributes = handlerInput.attributesManager.getSessionAttributes();

  if (attributes.speed === 'はやい') {
    return `<prosody rate="200%" pitch="x-high">${text}</prosody>`;
  } else if (attributes.speed === 'おそい') {
    return `<prosody rate="50%" pitch="x-low">${text}</prosody>`;
  }
  return text;
};

// ##################################################
// # スキルハンドラーの設定
// ##################################################

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    GreetingIntentHandler,
    SpeedIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
