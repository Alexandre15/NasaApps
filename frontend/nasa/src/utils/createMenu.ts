import { Commet } from "../types/commet";
import show from "./showObject";
import cometImageSrc from "/icons/icon-menu.png";

function disableAllGlows(commets) {
  console.log('disabling all glows')
  commets.comets.map((c) => {
    c.meteor.children[1].visible = false;
  })
  console.log(commets)
}

export default function createMenu(commet: Commet[]) {
  const menuContainer = document.createElement("div");
  menuContainer.classList.add("menu");

  const menuButton = document.createElement("button");
  const cometImage = document.createElement("img");

  cometImage.src = cometImageSrc;
  cometImage.classList.add("comet-icon");
  cometImage.style.width = "30px";
  cometImage.style.height = "30px";

  menuButton.appendChild(cometImage);
  menuButton.classList.add("menu-button");
  menuContainer.appendChild(menuButton);

  const menuOptions = document.createElement("div");
  menuOptions.classList.add("menu-options");
  menuOptions.style.display = "none";

  const searchBox = document.createElement("input");
  searchBox.type = "text";
  searchBox.placeholder = "Search for comets...";
  searchBox.classList.add("search-box");

  searchBox.style.backgroundColor = "rgba(168, 154, 154, 0.5)";
  searchBox.style.color = "white";
  searchBox.style.border = "none";
  searchBox.style.padding = "5px";
  searchBox.style.marginBottom = "5px";
  searchBox.style.width = "100%";

  menuOptions.appendChild(searchBox);
  menuContainer.appendChild(menuOptions); // Mova esta linha para adicionar o menuOptions ao menuContainer
  document.body.appendChild(menuContainer);

  const updateMenuVisibility = (filter = "") => {
    const items = Array.from(menuOptions.getElementsByClassName("comet-item"));
    items.forEach((child) => {
      const element = child as HTMLElement;
      const matchesFilter = filter === "" || element.textContent?.toUpperCase().includes(filter.toUpperCase());
      element.style.display = matchesFilter ? 'block' : 'none';
    });
  };

  commet.comets.forEach((cometItem) => {
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("comet-item");
    optionDiv.addEventListener('click', () => {
      disableAllGlows(commet) // desabilita o contorno de selecionado
      show(cometItem)
      cometItem.meteor.children[1].visible = true
    })
    const optionElement = document.createElement("div");
    optionElement.textContent = cometItem.obj_name;
    optionElement.classList.add("menu-option");


    optionDiv.appendChild(optionElement);
    menuOptions.appendChild(optionDiv);
  });

  updateMenuVisibility();

  menuOptions.addEventListener("wheel", (event) => {
    event.preventDefault();
    menuOptions.scrollTop += event.deltaY; // Move a barra de rolagem para cima ou para baixo
  });

  searchBox.addEventListener("input", () => {
    updateMenuVisibility(searchBox.value);
  });

  menuButton.addEventListener("mouseenter", () => {
    menuOptions.style.display = "block";
    menuOptions.scrollTop = 0; // Reseta a rolagem para o topo
  });

  menuOptions.addEventListener("mouseenter", () => {
    menuOptions.style.display = "block";
  });

  menuButton.addEventListener("mouseleave", () => {
    hideOptions();
  });

  menuOptions.addEventListener("mouseleave", () => {
    hideOptions();
  });

  function hideOptions() {
    setTimeout(() => {
      if (!menuContainer.matches(':hover')) {
        menuOptions.style.display = "none";
        searchBox.value = "";
        updateMenuVisibility();
      }
    }, 100);
  }

  document.addEventListener("click", (event) => {
    if (menuOptions.style.display === "block") {
      const target = event.target as Node;
      const isClickInsideMenu = menuContainer.contains(target);
      if (!isClickInsideMenu) {
        hideOptions();
      }
    }
  });
}
