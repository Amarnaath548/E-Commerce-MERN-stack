import jwt from "jsonwebtoken"

export const acessTokenGenerator=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{
        expiresIn:"15m"
    })
}

export const refreshTokenGenerator=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_REFRESH_SECRET,{
        expiresIn:"7d"
    })
}