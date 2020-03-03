import Api from '@/services/Api'

export default {
  render (recipes) {
    return Api().get('/', recipes)
  }
}
