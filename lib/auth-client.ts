import {
    adminClient,
    genericOAuthClient,
    multiSessionClient,
    oidcClient,
    organizationClient,
    passkeyClient,
    twoFactorClient
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";


export const client = createAuthClient({
    baseURL : "http://localhost:3000",
	plugins: [
		organizationClient(),
		twoFactorClient({
			onTwoFactorRedirect() {
				window.location.href = "/two-factor";
			},
		}),
		passkeyClient(),
		adminClient(),
		multiSessionClient(),
		// oneTapClient({
		// 	clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
		// }),
		oidcClient(),
		genericOAuthClient(),
	],
	fetchOptions: {
		onError(e) {
			if (e.error.status === 429) {
				alert("Too many requests, try again later");
			}
		},
	},
});

export const {
	signUp,
	signIn,
	signOut,
	useSession,
	organization,
	useListOrganizations,
	useActiveOrganization,
} = client;