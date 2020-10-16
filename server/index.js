const Axios = require('axios')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const FormData = require('form-data')
const circularJson = require('circular-json')

const app = require('express')()

app.use(cors())
app.use(bodyParser.json({ limit: '100mb' }))

app.post('/y', async (req, res) => {
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

  const config = { ...req.body }
  if (config.headers && config.headers.contentType === 'multipart/form-data') {
    const formData = new FormData()
    for (const key of Object.keys(config.data)) {
      if (config.data[key].file) {
        fs.writeFileSync(`${__dirname}/tmp/${config.data[key].file.name}`, config.data[key].base64.split(';base64,')[1], { encoding: 'base64' })
        formData.append(key, fs.createReadStream(`${__dirname}/tmp/${config.data[key].file.name}`))
        fs.unlinkSync(`${__dirname}/tmp/${config.data[key].file.name}`)
      } else {
        formData.append(key, config.data[key])
      }
    }
    config.data = formData
    config.headers = { ...config.headers, ...formData.getHeaders() }
  }
  try {
    const resp = await Axios(config)
    return res.status(resp.status).send(JSON.parse(circularJson.stringify(resp)))
  } catch (error) {
    return res.send({ response: JSON.parse(circularJson.stringify(error.response)), error })
  }
})

app.listen(4002, () => console.log('started...'))