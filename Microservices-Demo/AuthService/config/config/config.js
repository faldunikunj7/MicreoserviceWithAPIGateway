module.exports={
    db: {
        url: process.env.USER_SERVICE_MONGODB_URL
    },
    app: {
        port: process.env.AUTH_SERVICE_PORT,
    },
    jwtToken: {
        secretKey: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.JWT_EXPIRE_IN
    }
}