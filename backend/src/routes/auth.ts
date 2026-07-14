import { oauth2Client } from "../services/googleAuth";
import { Router } from 'express';
import fs from 'fs'


const router = Router();

router.get('/google', async(req, res)=>{
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/calendar'
    });
    res.redirect(authUrl)
});


router.get('/google/callback', async(req, res)=>{
    const code = req.query.code as string;
    const {tokens} = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    fs.writeFileSync('tokens.json', JSON.stringify(tokens))
    res.redirect('http://localhost:5173')
});

export default router