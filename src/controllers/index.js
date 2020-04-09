
const { estimateJson, estimateXml } = require('../useCases');

module.exports = {
  async getEstimate(req, res, next) {
    let posted;
    const { data } = req.body;
    const { dataFormat } = req.params;

    try {
      switch (dataFormat) {
        case 'xml':
          posted = await estimateXml(data);
          res.status(200).type('application/xml').send(posted);
          break;

        default:
          posted = await estimateJson(data);
          res.status(200).json(posted);
          break;
      }
    } catch (error) {
      next(error);
    }
  }


};
