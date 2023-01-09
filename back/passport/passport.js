import passport from 'passport'
import bcrypt from 'bcrypt'
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
import users from '../models/users.js'

const LocalStrategy = passportLocal.Strategy
const JWTStrategy = passportJWT.Strategy
// 預設帳密欄位是 username 和 password
// 修改成 account 和 password
passport.use('login', new LocalStrategy({
  // 預設帳密欄位是 username
  usernameField: 'account',
  passwordField: 'password'
}, async (account, password, done) => {
  // done(錯誤，傳到下一步的資料，傳到下一步info的內容)
  try {
    // 有無找到帳號
    const user = await users.findOne({ account })
    if (!user) {
      return done(null, false, { message: '帳號不存' })
    }
    // 驗證密碼是否一樣
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: '密碼錯誤' })
    }
    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
}))

passport.use('jwt', new JWTStrategy({
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true
}, async (req, payload, done) => {
  const token = req.headers.authorization.split(' ')[1]
  try {
    const user = await users.findOne({ _id: payload._id, tokens: token })
    if (user) {
      return done(null, { user, token })
    }
    return done(null, false, { message: '使用者不存在或 JWT 無效' })
  } catch (error) {
    return done(error, false)
  }
}))
