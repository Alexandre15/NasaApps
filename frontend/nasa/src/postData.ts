import { Commet } from "./types/commet";

export default async function postData(commet: Commet): Promise<Commet | null> {
    const url: string = 'http://127.0.0.1:8000/comets_post/'; // URL da sua API

    try {
        const response = await fetch(url, {
            method: 'POST', // Método HTTP
            headers: {
                'Content-Type': 'application/json', // Tipo de conteúdo da requisição
            },
            body: JSON.stringify(commet), // Converte o objeto commet para JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Commet = await response.json(); // Converte a resposta para JSON
        console.log('Comet created:', data);
        return data; // Retorna o novo cometa criado
    } catch (error) {
        console.error('Error posting data:', error);
        return null; // Retorna null em caso de erro
    }
}
