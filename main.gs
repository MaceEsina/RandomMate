function doPost(e) {
  const data = JSON.parse(e.postData.contents, (prop, value) => {
    if (prop === 'id') return value.toString();
    return value;
  });
  let text, userId;

  if (data.callback_query) {
    const { callback_query } = data;
    text = callback_query.data;
    userId = callback_query.from.id;
  } else {
    const { message } = data;
    text = message.text;
    userId = message.from.id;
  }

  const user = getUser(userId);
  const texts = getTexts();

  log(userId, text);

  if (text === '/start') {
    sendMessage(userId, texts.start);
    start(userId, user);
  } else if (user) {
    const { rowInx, step } = user;

    if (step === STEPS.start) {
      setName(rowInx, text);
      sendMessage(userId, texts.location);
    } else if (step === STEPS.name) {
      setLocation(rowInx, text);
      sendMessage(userId, texts.facebook);
    } else if (step === STEPS.location) {
      setFacebook(rowInx, text);
      sendMessage(userId, texts.instruction);
      sendMessageWithReply(userId, texts.question, KEYBOARDS.yes_no);
    } else if (step === STEPS.facebook) {
      if (text === 'yes') {
        const mate = getMate(rowInx, userId);
        log('mate',mate)
        sendMessage(userId, `${texts.mate} ${mate}`);
      } else {
        sendMessage(userId, texts.cancel);
      }
    }
  }
}

function test() {
  sendMessageWithReply('48861923', 'text', KEYBOARDS.yes_no)
}

function sendMessageWithReply(userId, text, keyboard) {  
  const params = {
    method: 'post',
    payload: {
      chat_id: userId,
      text,
      reply_markup: JSON.stringify(keyboard)
    }
  };

  UrlFetchApp.fetch(`${TG_API_URL}/sendMessage`, params);
}

function sendMessage(userId, text) {
  const params = {
    method: 'post',
    payload: {
      chat_id: userId,
      text
    }
  };
  UrlFetchApp.fetch(`${TG_API_URL}/sendMessage`, params);
}
