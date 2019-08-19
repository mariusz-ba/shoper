export const config = {
  expressSession: {
    secret: 'SecretString123',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production'
    }
  }
}