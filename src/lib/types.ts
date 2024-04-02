export interface VolcanoData {
	id: number;
	name: string;
	country: string;
	region: string;
	subregion: string;
};

export interface VolcanoIdData {
    name: string;
    country: string;
    region: string;
    subregion: string;
    last_eruption: string;
    summit: number;
    elevation: number;
    latitude: string;
    longitude: string;
    population_5km: number;
    population_10km: number;
    population_30km: number;
    population_100km: number;
}
