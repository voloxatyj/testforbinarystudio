import Api from '@/services/Api'

export default {
  update (credentials, params) {
    return Api().put(`/edit/${params}`, credentials)
  }
}
