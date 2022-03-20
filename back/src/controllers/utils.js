const murmur = require('murmur-hash-js');
const fs = require('fs');
const axios = require('axios');

const config = require('../../config.json');

function hash(string) {
  const d = new Date();
  return murmur(`${string + d.getTime()} SOMERANDOM`, config.token_secret);
}

function upload(file) {
  if (!file) {
    return null;
  }
  if (file.mimetype.split('/')[0] !== 'image') {
    return null;
  }
  const ext = file.filename.split('.');
  const hashed = `${hash(file.filename)}.${ext[ext.length - 1]}`;
  const fileLocation = `static/${hashed}`;
  const fstream = fs.createWriteStream(fileLocation);
  file.file.pipe(fstream);
  return hashed;
}



function monitor(msg) {
  if (config.env !== 'dev') {
    axios({
      method: 'post',
      url: `https://api.telegram.org/bot${config.bot_token}/sendMessage`,
      params: {
        chat_id: config.chan_monitoring_id,
        text: msg,
        parse_mode: 'Markdown',
      },
    });
  }
}

function stringify(obj, field) {
  let msg = '';
  Object.keys(obj).forEach((elem) => {
    if (field.indexOf(elem) > -1) {
      msg += `**${elem}:** ${obj[elem]}\n`;
    }
  });

  return msg;
}

module.exports = {
  upload,
  monitor,
  stringify,
};
