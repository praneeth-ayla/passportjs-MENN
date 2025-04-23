"use client";
import { useEffect, useState } from "react";

interface User {
	name: string;
	email: string;
}

type SocialProvider = "google" | "facebook" | "twitter" | "github" | string;

export default function Home() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
				{
					credentials: "include",
				}
			);
			const data = await res.json();
			setUser(data);
		} catch (error) {
			console.error("Failed to fetch user:", error);
		}
	};

	const handleSocialLogin = (provider: SocialProvider) => {
		window.open(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${provider}`,
			"_self"
		);
	};

	const handleLogout = async () => {
		try {
			await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
				credentials: "include",
			});
			setUser(null);
		} catch (error) {
			console.error("Failed to logout:", error);
		}
	};

	// List of social login providers
	const socialProviders = [
		{ name: "Google", provider: "google" },
		{ name: "Facebook", provider: "facebook" },
		{ name: "Twitter", provider: "twitter" },
		{ name: "GitHub", provider: "github" },
		{ name: "Microsoft", provider: "microsoft" },
		{ name: "Apple", provider: "apple" },
		{ name: "LinkedIn", provider: "linkedin" },
	];

	return (
		<main>
			{user ? (
				<div className="flex justify-center items-center h-screen flex-col gap-3">
					<h1>Welcome, {user.name}!</h1>
					<p>Email: {user.email}</p>
					<button
						onClick={handleLogout}
						className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
						Logout
					</button>
				</div>
			) : (
				<div className="flex justify-center items-center h-screen flex-col gap-3">
					<h1 className="text-3xl font-bold pb-5">Login Using:</h1>
					<div className="flex flex-col gap-2">
						{socialProviders.map(({ name, provider }) => (
							<button
								key={provider}
								onClick={() => handleSocialLogin(provider)}
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
								Sign in with {name}
							</button>
						))}
					</div>
				</div>
			)}
		</main>
	);
}
