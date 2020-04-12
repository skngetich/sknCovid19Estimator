const path = require('path');
const sf = require('slice-file');

const { estimateJson, estimateXml } = require('../useCases');


module.exports = {

  async getJson(req, res, next) {
    let posted;
    const data = req.body;


    try {
      posted = await estimateJson(data);
      res.status(200).json(posted);
    } catch (error) {
      next(error);
    }
  },

  async getXml(req, res, next) {
    let posted;
    const data = req.body;
    try {
      posted = await estimateXml(data);
      res.status(200).type('application/xml').send(posted);
    } catch (error) {
      next(error);
    }
  },

  async getLogs(req, res) {
    const resData = [];
    const filename = sf(path.join(__dirname, '../db/access.log'));

    filename.sliceReverse().on('data', (data) => {
      resData.push(data.toString()); // convert from buffer to human readable
    }).on('end', () => {
      res.type('text/plain').send(resData.join(''));
    });
  }

};
