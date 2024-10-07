import { Commet } from "../types/commet";

export default function show(commet: Commet) {
    const existingModal: HTMLElement | null = document.getElementById('detail-modal');
    if (existingModal) {
        // Remove o modal existente do body
        document.body.removeChild(existingModal);
    }
    createModal(commet);
}

function createModal(commet: Commet) {
    const modal = document.createElement("div");
    modal.id = 'detail-modal';
    
    const commetTitle = document.createElement("h2");
    commetTitle.innerText = commet.obj_name;
    commetTitle.classList.add("meteor-title")

    const meteor = document.createElement("div")
    const img = document.createElement("img")
    img.classList.add("img-responsive")
    img.src = `/meteors/image${getRandomNumber()}.png`
    meteor.classList.add("meteor-detail")
    meteor.appendChild(img)

    const solar_orbit = document.createElement("p");
    solar_orbit.innerText = `Solar orbit in: ${commet.p_ir} years`;
    solar_orbit.classList.add("detail-data")
    const earth_distance = document.createElement("p");
    earth_distance.innerText = `Distance from earth: ${commet.moid_au} U.A`;
    earth_distance.classList.add("detail-data")
    const sun_distance = document.createElement("p");
    sun_distance.innerText = `Degrees: ${commet.w_deg}`;
    sun_distance.classList.add("detail-data")
    const ref = document.createElement("p");
    ref.innerText = `Ref: ${commet.ref}`;
    ref.classList.add("detail-data")

    const close = document.createElement("button")
    close.innerText = 'Close'
    close.classList.add("close-button")
    close.addEventListener("click",()=>{
        const existingModal: HTMLElement | null = document.getElementById('detail-modal');
        if (existingModal) {
            // Remove o modal existente do body
            document.body.removeChild(existingModal);
        }
    })
    
    // Adiciona os elementos ao modal
    modal.appendChild(commetTitle);
    modal.appendChild(meteor)
    modal.appendChild(solar_orbit);
    modal.appendChild(earth_distance);
    modal.appendChild(sun_distance);
    modal.appendChild(ref);
    modal.appendChild(close)
    
    // Adiciona o modal ao body
    document.body.appendChild(modal);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1; 
}