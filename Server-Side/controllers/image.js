//require('dotenv').config()

const Clarifai = require('clarifai');

//You data api initialisation
const app = new Clarifai.App({
 apiKey:process.env.SERVER_APP_CLARIFAI_API_KEY
});

// Call api when adding image url
const handleApiCall = (req, res) => {
  console.log(process.env.SERVER_APP_CLARIFAI_API_KEY)
  app.models.predict('face-detection', req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1) // Increment entries
  .returning('entries')
  .then(entries => {
    // Get entries from dataset
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}