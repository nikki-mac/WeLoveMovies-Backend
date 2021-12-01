const service = require("./theaters.service");

async function list(req, res, next) {
    const data = await service.list(req.params.theater_id);
    res.json({ data });
}

module.exports = { list };
