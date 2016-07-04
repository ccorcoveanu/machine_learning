import LiniarRegression from './components/LiniarRegression'

const regression = new LiniarRegression();

regression.compute().then(function(response) {

  var _test = response.hypotesis(4)
  console.log(_test)

}).catch(function(error) {
  console.warn(error)
})