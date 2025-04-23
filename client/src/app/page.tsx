"use client";
import { useEffect, useState } from "react";

interface User {
	name: string;
	email: string;
}

export default function Home() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
			{
				credentials: "include",
			}
		);
		const data = await res.json();
		console.log(data);
		setUser(data);
	};

	const handleLogin = () => {
		window.open(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
			"_self"
		);
	};

	const handleLogout = async () => {
		await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
			credentials: "include",
		});
		setUser(null);
	};

	return (
		<main>
			{user ? (
				<div>
					<h1>Welcome, {user.name}!</h1>
					<p>Email: {user.email}</p>
					<button onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<div className="flex flex-col gap-3">
					<h1>Login with Google</h1>
					<button onClick={handleLogin}>Sign in with Google</button>
				</div>
			)}
		</main>
	);
}
