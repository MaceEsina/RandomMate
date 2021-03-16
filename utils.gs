function getTexts() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('text');
  const values = sheet.getDataRange().getValues();
  const texts = {};

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    texts[row[0]] = row[1];
  }

  return texts;
}

function log(userId, text) {
  const logSheet = getLogSheet();
  const timeFormat = 'hh:mm:ss dd/MM/yyyy';
  const timeZone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();  
  const time = Utilities.formatDate(new Date(), timeZone, timeFormat);

  logSheet.appendRow([userId, text, time]);
}

function getLogSheet() {
  return SpreadsheetApp.getActive().getSheetByName('logs');
}

function getUserSheet() {
  return SpreadsheetApp.getActive().getSheetByName('users');
}

function getUserInfo(userId) {
  const sheet = getUserSheet();
  const values = sheet.getDataRange().getValues();

  values.forEach(row => {
    if (row[0] === userId) return row;
  });
}

function getMate(rowInx, userId) {
  const values = getUserSheet().getDataRange().getValues();
  const ids = values.slice(1).map(row => row[0]).filter(id => {
    return id.toString() !== userId
  });
  const history = values[rowInx - 1][5].split(',').map(id => id.trim());
  const mateIds = ids.filter(id => history.indexOf(id) === -1);
  const matesNum = mateIds.length;

  if (matesNum) {
    const id = mateIds[getRandomInt(matesNum)];
    const mate = values[ids.indexOf(id) + 1];
    return `${mate[1]} from ${mate[3]} with link ${mate[4]}`;
  } else return null;
}

function setLocation(rowInx, location) {
  getUserSheet().getRange(rowInx, 3, 1, 2).setValues([[STEPS.location, location]]);
}

function setFacebook(rowInx, facebook) {
  getUserSheet().getRange(rowInx, 3).setValue(STEPS.facebook);
  getUserSheet().getRange(rowInx, 5).setValue(facebook);
}

function createUser(userId) {
  getUserSheet().appendRow([userId, '', STEPS.start]);
}

function start(userId, user) {
  if (user) {
    getUserSheet().getRange(user.rowInx, 3).setValue(STEPS.start);
  } else createUser(userId);
}

function setName(rowInx, userName) {
  getUserSheet().getRange(rowInx, 2, 1, 2).setValues([[userName, STEPS.name]]);
}

function getUser(userId) {
  const values = getUserSheet().getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    const row = values[i];

    if (row[0].toString().trim() === userId) {
      return {
        id: userId,
        name: row[1],
        step: row[2],
        rowInx: i + 1
      }
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
