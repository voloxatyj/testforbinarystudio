import Api from '@/services/Api'

export default {
  delete (params) {
    return Api().delete(`/${params}`)
  }
}
