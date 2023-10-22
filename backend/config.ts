import dotENV from 'dotenv'

dotENV.config()

export const configKey= {
    MONGODB_URL:process.env.MONGODB_URL as string,
    PORT:process.env.PORT as string,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY as string,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY as string
}    