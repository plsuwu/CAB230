// data body of a user
export interface User {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    dateOfBirth?: string | null;
    address?: string | null;
}

// excluded user fields
export interface FullUser extends User {
    password?: string;
    id?: number;
}

// fields required for a PUT to the `/user/:email/profile` endpoint
export interface RequiredData {
    firstName: string | null;
    lastName: string | null;
    dob: string | null;
    address: string | null;
}

// fields for a volcano object when returned at the `/volcanoes?country...` endpoint
export interface VolcanoBasic {
    id: number;
    name: string;
    country: string;
    region: string;
    subregion: string;
}

// extended fields for data returned at the `/volcano/:id` endpoint
export interface VolcanoDetails extends VolcanoBasic {
    last_eruption: string;
    summit: number;
    elevation: number;
    population_5km?: number;
    population_10km?: number;
    population_30km?: number;
    population_100km?: number;
}
