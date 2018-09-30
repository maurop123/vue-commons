// General purpose mutations
const mutations = {
  setState(state, { key, val }) {
    const parts = attr.split('.')
    parts.reduce((v,k,i) => {
      if (i === parts.length - 1) v[k] = value
      return v[k]
    }, state)
  }
}

export default {
  mutations
}
