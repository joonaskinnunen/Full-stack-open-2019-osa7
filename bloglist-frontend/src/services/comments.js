import axios from 'axios'
const baseUrl = '/api/blogs/'

const getAll = () => {
  const request = axios.get(baseUrl + 'comments/')
  return request.then(response => response.data)
}

const create = async newObject => {
  const url = `${baseUrl}${newObject.blogId}/comments/`
  console.log(url)
  const response = await axios.post(url, newObject)
  console.log(response.data)
  return response.data
}

export default { getAll, create }