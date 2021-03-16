const BOT_ID = '1619363659:AAEYeUYFDLwLrf1J3NitSdwkgzxM5d11sfI';
const TG_API_URL = `https://api.telegram.org/bot${BOT_ID}`;

const STEPS = {
  start: 'start',
  name: 'name',
  location: 'location',
  facebook: 'facebook'
};

const YES_NO_KEYBOARD = {
  inline_keyboard: [[
    {
      text: 'YES',
      callback_data: 'yes'
    },
    {
      text: 'NO',
      callback_data: 'no'
    }
  ]]
};

const KEYBOARDS = {
  yes_no: YES_NO_KEYBOARD
}
