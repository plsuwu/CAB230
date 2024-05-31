export interface User {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    dateOfBirth?: string | null;
    address?: string | null;
}

export interface FullUser extends User {
    password?: string;
    id?: number;
}

export interface RequiredData {
    firstName: string | null;
    lastName: string | null;
    dob: string | null;
    address: string | null;
}

export interface VolcanoBasic {
    id: number;
    name: string;
    country: string;
    region: string;
    subregion: string;
}

export interface VolcanoDetails extends VolcanoBasic {
    last_eruption: string;
    summit: number;
    elevation: number;
    population_5km?: number;
    population_10km?: number;
    population_30km?: number;
    population_100km?: number;
}
