import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDatabase } from "../../../data/databaseFunctions";

export const authOptions = {
	session: {
		//make sure that json web token is created
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return Promise.resolve(token);
		},

		session: async ({ session, token }) => {
			// session callback is called whenever a session for that particular user is checked
			// in above function we created token.user=user
			session.user = token.user;
			// you might return this in new version
			return Promise.resolve(session);
		},
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",

			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const [client, db] = await connectDatabase();

				const user = await db
					.collection("users")
					.findOne({ username: credentials.username });
				if (!user) {
					client.close();
					throw new Error("No user found");
				}
				client.close();
				return user;
			},
		}),
	],
};

export default NextAuth(authOptions);
