// Volcano/Country types

export type Country = string;
export type Page = Country[];

export interface Volcano {
	id: number;
	name: string;
	country: Country;
	region: string;
	subregion: string;
}

export interface Cookie {
	expires_in: number | null;
	token: string | null;
	token_type: string | null;
};

export interface VolcanoDetail extends Volcano {
	last_eruption: string;
	summit: number;
	elevation: number;
	latitude: string;
	longitude: string;
	population_5km?: number;
	population_10km?: number;
	population_30km?: number;
	population_100km?: number;
}

// user API types

export interface RegisterRequest {
	email: string;
	password: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterResponse {
	error?: boolean;
	message: string;
}

interface LoginResponseSuccess {
	token: string;
	token_type: string;
	expires_in: number;
}

interface LoginResponseError {
	error: boolean;
	message: string;
}

export type LoginResponse = LoginResponseError | LoginResponseSuccess;
