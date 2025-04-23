"use client";
import { useAuth } from "@/hooks/auth";

const socialProviders = [
	{ name: "Google", provider: "google" },
	{ name: "Facebook", provider: "facebook" },
	{ name: "Twitter", provider: "twitter" },
	{ name: "GitHub", provider: "github" },
	{ name: "Microsoft", provider: "microsoft" },
	{ name: "Apple", provider: "apple" },
	{ name: "LinkedIn", provider: "linkedin" },
	{ name: "Discord", provider: "discord" },
];

export default function Home() {
	const { user, loading, error, login, logout } = useAuth();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<main>
			{user ? (
				<div className="flex justify-center items-center h-screen flex-col gap-3">
					<h1>Welcome, {user.name}!</h1>
					<p>Email: {user.email}</p>
					<p>Provider: {user.providerType}</p>
					{user.avatar && (
						<img
							src={user.avatar}
							alt="User profile"
							className="w-20 h-20 rounded-full"
						/>
					)}
					<button
						onClick={logout}
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
								onClick={() => login(provider)}
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
