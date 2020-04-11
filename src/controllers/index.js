
const fs = require('fs');
const path = require('path');
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
    const data = fs.readFileSync(path.join(__dirname, '../db/access.log'));
    res.type('text/plain').send(data);
  }

};
