import Api from '@/services/Api'

export default {
  add (credentials) {
    return Api().post('/new', credentials)
  }
}
