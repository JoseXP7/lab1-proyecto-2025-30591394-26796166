import 'dotenv/config'

export default {
  app: {
    port: process.env.PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
}
