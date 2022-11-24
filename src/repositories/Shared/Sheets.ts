import { NextFunction, Response } from 'express';
import fs from 'fs';
import path from 'path';
import process from 'process';
import { google } from 'googleapis';

const fsPromise = fs.promises;

export const getSertificationUseCase = async (
  res: Response,
  next: NextFunction
) => {
  try {
    // If modifying these scopes, delete token.json.
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    const TOKEN_PATH = path.join(process.cwd(), 'token.json');
    const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

    /**
     * Reads previously authorized credentials from the save file.
     *
     * @return {Promise<OAuth2Client|null>}
     */
    async function loadSavedCredentialsIfExist() {
      try {
        const content: any = await fsPromise.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
      } catch (err) {
        return null;
      }
    }

    /**
     * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
     *
     * @param {OAuth2Client} client
     * @return {Promise<void>}
     */
    async function saveCredentials(client: any) {
      const content: any = await fsPromise.readFile(CREDENTIALS_PATH);
      const keys = JSON.parse(content);
      const key = keys.installed || keys.web;
      const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
      });
      await fsPromise.writeFile(TOKEN_PATH, payload);
    }

    /**
     * Load or request or authorization to call APIs.
     *
     */
    async function authorize() {
      let client: any = await loadSavedCredentialsIfExist();
      if (client) {
        return client;
      }
      client = await new google.auth.GoogleAuth({
        scopes: SCOPES,
        keyFile: CREDENTIALS_PATH,
      });
      if (client.credentials) {
        await saveCredentials(client);
      }
      return client;
    }

    /**
     * Prints the names and majors of students in a sample spreadsheet:
     * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
     * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
     */
    async function listMajors(auth: any) {
      const sheets = google.sheets({ version: 'v4', auth });
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1lpb6KwewWylcChhoWphEOeMStvmDWk4DmWmPxJzuyuU',
        range: 'Peserta_dan_Pemakalah!A2:F',
      });
      return res.data.values;
    }
    const auth = await authorize();
    const result = await listMajors(auth);
    let data: any[] = [];
    result.forEach((res) => {
      data.push({
        nama: res[1],
        email: res[2],
        type: res[3],
        linkSertification: res[5],
      });
    });
    return res.send({
      success: true,
      data: data,
      message: 'ok',
    });
  } catch (e) {
    next(e);
  }
};
