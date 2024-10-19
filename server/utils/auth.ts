import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

export async function getAuthenticatedClient() {
  const GOOGLE_APPLICATION_CREDENTIALS = JSON.parse(
    process.env.GOOGLE_APPLICATION_CREDENTIALS as string,
  )

  const auth = new google.auth.GoogleAuth({
    credentials: GOOGLE_APPLICATION_CREDENTIALS,
    scopes: SCOPES,
  })

  return google.sheets({ version: 'v4', auth })
}
