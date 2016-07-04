import axios from 'axios'

const Client = () => {

  var url = '';

  async function getTrainingSet() {
    return await axios.get(url + '/data/training_set_one_variable.json')
  }

  return {
    getTrainingSet: getTrainingSet
  }
}

export default Client;