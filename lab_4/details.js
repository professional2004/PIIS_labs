const selectedShirt = JSON.parse(localStorage.getItem('selectedShirt'));

const shirtDetailsContainer = document.getElementById('shirt_details_container');

let whatColor = selectedShirt.colors[Object.keys(selectedShirt.colors)[0]];

if (selectedShirt) {
    const shirtElement = document.createElement('div');
    shirtElement.classList.add('shirt_detail');

    const nameElement = document.createElement('h2');
    nameElement.textContent = selectedShirt.name;
    shirtElement.appendChild(nameElement);

    const imgElement = document.createElement('img');
    imgElement.src = selectedShirt.colors[Object.keys(selectedShirt.colors)[0]].front;
    imgElement.alt = selectedShirt.name;
    shirtElement.appendChild(imgElement);

    const priceElement = document.createElement('p');
    priceElement.textContent = selectedShirt.price;
    shirtElement.appendChild(priceElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = selectedShirt.description;
    shirtElement.appendChild(descriptionElement);

    const sideButtonsContainer = document.createElement('div');
    
    const frontButton = document.createElement('button');
    frontButton.textContent = 'Front';
    frontButton.addEventListener('click', function() {
        // imgElement.src = selectedShirt.colors[Object.keys(selectedShirt.colors)[0]].front;
        imgElement.src = whatColor.front;
    });
    
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.addEventListener('click', function() {
        imgElement.src = whatColor.back;
    });
    
    sideButtonsContainer.appendChild(frontButton);
    sideButtonsContainer.appendChild(backButton);
    shirtElement.appendChild(sideButtonsContainer);

    const colorsContainer = document.createElement('div');
    Object.keys(selectedShirt.colors).forEach(color => {
        const colorButton = document.createElement('button');
        colorButton.textContent = color;
        colorButton.style.backgroundColor = color;
        colorButton.addEventListener('click', function() {
            imgElement.src = selectedShirt.colors[color].front;
            whatColor = selectedShirt.colors[color];
        });
        colorsContainer.appendChild(colorButton);
    });
    
    shirtElement.appendChild(colorsContainer);
    
    shirtDetailsContainer.appendChild(shirtElement);
} else {
    shirtDetailsContainer.textContent = 'Shirt не найдены.';
}
