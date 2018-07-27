import express from 'express';
import * as config from '../config.json';
import {
  YoutubeService
} from '../services/youtube';
import {
  CountriesService
} from '../services/countries';

const router = express.Router();
const youtubeService = new YoutubeService();
const countriesService = new CountriesService();

/* GET home page. */
router.get('/', async (req, res) => {
  const selectedCountry = countriesService.getCountryOrDefault(req.query.gl);
  const countryList = countriesService.getCountryList();
  const trends = await youtubeService.getTrendingVideos(selectedCountry.code);
  res.render('youtube/index', {
    title: config.title,
    videos: trends,
    countryList: countryList,
    selectedCountryCode: selectedCountry.code
  });
});

router.get('/:videoId', async (req, res) => {
  const selectedCountry = countriesService.getCountryOrDefault(req.query.gl);
  const countryList = countriesService.getCountryList();
  res.render('youtube/player', {
    title: config.title,
    countryList: countryList,
    selectedCountryCode: selectedCountry.code
  });
});

module.exports = router;