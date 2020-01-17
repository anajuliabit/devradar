const axios = require('axios');

const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

const Dev = require('../models/Dev');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiRes = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiRes.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return res.json(dev);
  }
};
