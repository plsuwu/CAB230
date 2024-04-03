import { useState } from 'react';
import { useStore } from './storeContext';
import { Country, Volcano } from '../types';

const { addCountry, addVolcano } = useStore();
const [newCountry, setNewCountry] = useState<Country | undefined>(undefined);
const [newVolcano, setNewVolcano] = useState<Volcano | undefined>(undefined);

export function writeCountry() {

}
