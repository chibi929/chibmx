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

const JKStartIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'JKStartIntent';
  },
  handle(handlerInput) {
    const speechText = toTextWithSSML(handlerInput, 'ジャンケンですね。ではいきますよ？<say-as interpret-as="interjection">せーの、ジャンケン、ポン</say-as>');
    const repromptText = toTextWithSSML(handlerInput, 'あれ？どうしました？いきますよ？<say-as interpret-as="interjection">せーの、ジャンケン、ポン</say-as>');
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  },
};

const JKIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'JKIntent';
  },
  handle(handlerInput) {
    const jkSlot = handlerInput.requestEnvelope.request.intent.slots.jk;
    if (!jkSlot.resolutions || jkSlot.resolutions.resolutionsPerAuthority[0].status.code !== 'ER_SUCCESS_MATCH') {
      const speechText = toTextWithSSML(handlerInput, `すみません、聞き取れませんでした。もう1回。<say-as interpret-as="interjection">せーの、ジャンケン、ポン</say-as>`);
      const repromptText = toTextWithSSML(handlerInput, `あれ？どうしました？もう1回。<say-as interpret-as="interjection">せーの、ジャンケン、ポン</say-as>`);
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }

    const userWin = 'あなたの勝ち！やりますね！';
    const userLose = '私の勝ち！残念でしたね？<say-as interpret-as="interjection">いつでも挑戦をお待ちしてますよ？</say-as>';
    const draw = '<say-as interpret-as="interjection">あーいこーでしょ！</say-as>';
    const g = 'https://s3-ap-northeast-1.amazonaws.com/chibi-hanson-vsa76/190206-alexa/g.png';
    const c = 'https://s3-ap-northeast-1.amazonaws.com/chibi-hanson-vsa76/190206-alexa/c.png';
    const p = 'https://s3-ap-northeast-1.amazonaws.com/chibi-hanson-vsa76/190206-alexa/p.png';
    const imgs = [g, c, p];
    const randomIndex = Math.floor(Math.random() * imgs.length);

    const jkSlotValueName = jkSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    let alexaHand = '';
    let judge = '';
    switch (randomIndex) {
      case 0:
        alexaHand = 'グー';
        if (jkSlotValueName === 'ぐー') {
          judge = draw;
        } else if (jkSlotValueName === 'ちょき') {
          judge = userLose;
        } else if (jkSlotValueName === 'ぱー') {
          judge = userWin;
        } else {
          throw new Error();
        }
        break;
      case 1:
        alexaHand = 'チョキ';
        if (jkSlotValueName === 'ぐー') {
          judge = userWin;
        } else if (jkSlotValueName === 'ちょき') {
          judge = draw;
        } else if (jkSlotValueName === 'ぱー') {
          judge = userLose;
        } else {
          throw new Error();
        }
        break;
      case 2:
        alexaHand = 'パー';
        if (jkSlotValueName === 'ぐー') {
          judge = userLose;
        } else if (jkSlotValueName === 'ちょき') {
          judge = userWin;
        } else if (jkSlotValueName === 'ぱー') {
          judge = draw;
        } else {
          throw new Error();
        }
        break;
      default:
        throw new Error();
    }

    const speechText = toTextWithSSML(handlerInput, `<say-as interpret-as="interjection">${alexaHand}</say-as>。${judge}`);
    return handlerInput.responseBuilder
      .addRenderTemplateDirective({
        type: 'BodyTemplate1',
        title: '',
        backgroundImage: {
          sources: [
            {
              url: imgs[randomIndex]
            }
          ]
        }
      })
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
    JKStartIntentHandler,
    JKIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
