import { google } from 'googleapis'
import fs from 'fs'

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/auth/google/callback'
)

if (fs.existsSync('tokens.json')) {
    const tokens = JSON.parse(fs.readFileSync('tokens.json', 'utf-8'))
    oauth2Client.setCredentials(tokens)
}
