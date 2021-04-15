import Swal from 'sweetalert2'
const baseURL = 'https://forum-express-api.herokuapp.com/api'

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  width: 260,
})