function setWebhook() {
  const url = 'https://script.google.com/macros/s/AKfycbyZdKqpOktXgpWQu5Qna1nHky9DVBYtiUzxcA6X7_X8tNNZvr4xfO20/exec';
  const params = {
    method: 'post',
    payload: { url }
  };
  UrlFetchApp.fetch(`${TG_API_URL}/setWebhook`, params);
};

function getWebhookInfo() {
  const request = UrlFetchApp.fetch(`${TG_API_URL}/getWebhookInfo`);
  console.log(request.getContentText());
};
