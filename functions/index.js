const functions = require('firebase-functions')
const Axios = require('axios')
const circularJson = require('circular-json')
const cors = require('cors')({ origin: true })
const FormData = require('form-data')
const fs = require('fs')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.proxy = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const config = { ...req.body }
    if (config.headers && config.headers.contentType === 'multipart/form-data') {
      const formData = new FormData()
      for (const key of Object.keys(config.data)) {
        if (config.data[key].file) {
          fs.writeFileSync(`${__dirname}/tmp/${config.data[key].file.name}`, config.data[key].base64.split(';base64,')[1], { encoding: 'base64' })
          formData.append(key, fs.createReadStream(`${__dirname}/tmp/${config.data[key].file.name}`))
        } else {
          formData.append(key, config.data[key])
        }
      }
      config.data = formData
      config.headers = { ...config.headers, ...formData.getHeaders() }
    }

    Axios.interceptors.request.use(config => {
      config.metadata = { startTime: new Date() }
      return config
    }, () => {})

    Axios.interceptors.response.use(response => {
      response.config.metadata.endTime = new Date()
      response = {
        ...response,
        duration: response.config.metadata.endTime - response.config.metadata.startTime
      }
      return response
    }, error => {
      error.config.metadata.endTime = new Date()
      error.duration = error.config.metadata.endTime - error.config.metadata.startTime
      return Promise.reject(error)
    })

    try {
      const resp = await Axios(config)
      return res.status(resp.status).send(JSON.parse(circularJson.stringify(resp)))
    } catch (error) {
      return res.send({ ...error.response ? { response: JSON.parse(circularJson.stringify(error.response)) } : {}, error })
    }
  })
})
