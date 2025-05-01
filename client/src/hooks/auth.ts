"use client";
import { useState, useEffect } from "react";

interface User {
	providerId: string;
	provider?: string;
	email: string;
	name: string;
	avatar?: string;
	createdAt: string;
}

export function useAuth() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchUser = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
				{
					credentials: "include",
				}
			);

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			const data = await res.json();
			setUser(data);
		} catch (err) {
			console.error("Failed to fetch user:", err);
			setError("Failed to fetch user information");
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	const handleSocialLogin = (provider: string) => {
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
		} catch (err) {
			console.error("Failed to logout:", err);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return {
		user,
		loading,
		error,
		login: handleSocialLogin,
		logout: handleLogout,
		refresh: fetchUser,
	};
}
