export default function getRandomCoordinate(MaxDistance: number) {
    const radius = MaxDistance * 40; // Fator de escala, se necessário
    const minDistance = 2; // Distância mínima
    const adjustedRadius = Math.max(radius, minDistance);

    // Gera coordenadas em um espaço tridimensional
    const randomUnitVector = () => {
        const theta = Math.random() * 2 * Math.PI; // Ângulo azimutal
        const phi = Math.acos(2 * Math.random() - 1); // Ângulo polar
        const x = adjustedRadius * Math.sin(phi) * Math.cos(theta);
        const y = adjustedRadius * Math.sin(phi) * Math.sin(theta);
        const z = adjustedRadius * Math.cos(phi);

        return { x, y, z };
    };

    const { x: valueX, y: valueY, z: valueZ } = randomUnitVector();

    // Ajusta para garantir a distância mínima
    return {
        x: valueX + (Math.random() < 0.5 ? -1 : 1) * minDistance,
        y: valueY + (Math.random() < 0.5 ? -1 : 1) * minDistance,
        z: valueZ + (Math.random() < 0.5 ? -1 : 1) * minDistance,
    };
}
