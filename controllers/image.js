const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '2ce4805be9c84909bd3560718ef8c51d' 
   });

const handleApiCall = (req, res) => {
    app.models.predict('face-detection', req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}
// const returnClarifaiRequestOptions = (imageUrl) => {
//     const PAT = 'e440847d64324e8795c896895d997099';
//     const USER_ID = 'jasonjamesmoore';       
//     const APP_ID = 'final-project';
//     const MODEL_ID = 'face-detection'; 
//     const IMAGE_URL = imageUrl;

//     const raw = JSON.stringify({
//         "user_app_id": { "user_id": USER_ID, "app_id": APP_ID },
//         "inputs": [ { "data": { "image": { "url": IMAGE_URL }}} ]
//     });

//     const requestOptions = {
//     method: 'POST',
//     headers: { 'Accept': 'application/json', 'Authorization': 'Key ' + PAT },
//     body: raw
//     };
//     return requestOptions
// }
// const handleApiCall = (req, res) => {
//     fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input), req.body.input)
//     .then(data => {
//         res.json(data);
//     })
//     .catch(err => res.status(400).json('unable to work with API'))
// }


const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
};
