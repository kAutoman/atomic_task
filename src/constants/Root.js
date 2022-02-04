/**
 * api list
 */
const ApiList = {
  Socket: null,
  SignIn: 'users/signin',
  GetClientSecret: "api/stripCardCreateSetupIntent",
}

const dev = {
  BACKEND_URL: "http://192.168.114.37:3333/",
  IMAGE_URL: "http://192.168.114.37:3333/",
  ...ApiList
}

const production = {
  PAYMENT_URL: "https://vast-mesa-92603.herokuapp.com/",
  // PAYMENT_URL: "http://192.168.114.48:5000/",
  IMAGE_URL: "http://47.242.202.135/",
  ...ApiList
}

export const ROOT = production