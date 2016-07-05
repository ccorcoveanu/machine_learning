import Client from './Client'
var math =  require('mathjs')

/**
 * Computes Liniar regression using training sets with one variable
 * TODO: make it general with dynamic number of variables
 *
 * compute() uses gradient descendet to minimize the cost function
 * computeWithNormalEq uses the notmal equation ti find t0 and t1 .. tn(when generalized)
 */
class LiniarRegression {

  constructor () {
    this.client = new Client()
    this.t0     = 1
    this.t1     = 1
    this.set    = []
    this.step   = 0.3
    this.m      = 0 // training set length
  }

  hypotesis(x) {
    return this.t0 + this.t1 * x;
  }

  // TODO: normalize variables
  async compute() {
    this.set = await this.setTrainingSet()
    this.set = this.set.data
    this.m   = this.set.length

    while(true) {
      let _t0 = this.t0
      let _t1 = this.t1
      let _sum = this.calculateDerivedError(this.set)
      this.t0 = _t0 - this.step * _sum.sum0
      this.t1 = _t1 - this.step * _sum.sum1

      if ( this.t0 === _t0 && this.t1 === _t1 ) return this; // Convergence reached
    }
  }

  async computeWithNormalEq() {

    let M, // Element Matrix
        m = [], // equivalent array
        MT, // M's transpose
        y = [], // Solutions array
        t = [] // variable array
    ;

    this.set = await this.setTrainingSet()
    this.set = this.set.data
    this.m   = this.set.length

    for ( let i = 0; i < this.m; i++ ) {
      m.push([1, this.set[i].size])
      y.push(this.set[i].val)
    }

    M = math.matrix(m)
    MT = math.transpose(M)

    t = math.multiply(
      math.inv(math.multiply(MT,M)),
      math.multiply(MT,y)
    );

    this.t0 = math.subset(t, math.index(0))
    this.t1 = math.subset(t, math.index(1))

    return this
  }

  calculateDerivedError(items) {
    let _sum0 = 0;
    let _sum1 = 0;

    for ( let i = 0; i < this.m; i++ ) {
      _sum0 += this.hypotesis(items[i].size) - items[i].val
      _sum1 += (this.hypotesis(items[i].size) - items[i].val) * items[i].size
    }

    return {
      sum0: _sum0/this.m,
      sum1: _sum1/this.m
    }
  }

  async setTrainingSet () {
    return await this.client.getTrainingSet()
  }
}

export default LiniarRegression