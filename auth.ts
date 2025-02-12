import { db } from './lib/db/db';

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
 
export const auth = betterAuth({
    database: drizzleAdapter(db,{
        provider : "sqlite"  
    }),
        socialProviders :{
            spotify :{
                clientId: process.env.SPOTIFY_CLIENT_ID as string,
                clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string, 
                scope: [
                    'user-read-email',
                    'user-read-private',
                    'playlist-read-private',
                    'playlist-read-collaborative'
                ],
                
            }
        },
        
})