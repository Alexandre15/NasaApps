import { Commet } from "./types/commet";

export default async function getData(): Promise<Commet[]> {
    const url: string = 'http://127.0.0.1:8000/comets/';
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: any = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; 
    }
}