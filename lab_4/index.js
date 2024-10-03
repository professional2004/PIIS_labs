import { shirts } from '/shirts.js';

const shirtsContainer = document.getElementById('shirts_container');

shirts.forEach((shirt, index) => {
    const shirtElement = document.createElement('div');
    shirtElement.classList.add('shirt_item'); 

    const imgElement = document.createElement('img');
    imgElement.classList.add('shirt_image');
    const defaultColor = Object.keys(shirt.colors)[0] || 'default';
    imgElement.src = shirt.colors[defaultColor]?.front || shirt.default.front; 
    shirtElement.appendChild(imgElement);

    const nameElement = document.createElement('h3');
    nameElement.textContent = shirt.name;
    shirtElement.appendChild(nameElement);

    const availabilityElement = document.createElement('p');
    availabilityElement.textContent = `Available in ${Object.keys(shirt.colors).length} colors`;
    shirtElement.appendChild(availabilityElement);

    const quickViewButton = document.createElement('button');
    quickViewButton.textContent = 'Quick View';
    quickViewButton.classList.add('button', 'quick_view_button');
    quickViewButton.addEventListener('click', () => quickView(shirt));
    shirtElement.appendChild(quickViewButton);

    const seePageButton = document.createElement('button');
    seePageButton.textContent = 'See Page';
    seePageButton.classList.add('button', 'see_page_button');
    
    seePageButton.addEventListener('click', () => {
        localStorage.setItem('selectedShirt', JSON.stringify(shirt));
        window.location.href = 'details.html';
    });
    
    shirtElement.appendChild(seePageButton);

    shirtsContainer.appendChild(shirtElement);
});

const quickViewContainer = document.createElement('div');
quickViewContainer.id = 'quick_view_container';
document.body.appendChild(quickViewContainer);

function quickView(shirt) {
    quickViewContainer.innerHTML = '';

    const quickViewContent = document.createElement('div');
    quickViewContent.classList.add('quick_view_content');

    const shirtImage = document.createElement('img');
    shirtImage.src = shirt.colors[Object.keys(shirt.colors)[0]].front || shirt.default.front;
    quickViewContent.appendChild(shirtImage);

    const shirtInfo = document.createElement('div');
    shirtInfo.classList.add('shirt_info');
    
    const nameElement = document.createElement('h3');
    nameElement.textContent = shirt.name;
    shirtInfo.appendChild(nameElement);

    const priceElement = document.createElement('p');
    priceElement.textContent = shirt.price;
    shirtInfo.appendChild(priceElement);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('button', 'close_button');
    closeButton.addEventListener('click', function() {
        quickViewContainer.style.display = 'none';
    });
    shirtInfo.appendChild(closeButton);

    quickViewContent.appendChild(shirtInfo);
    quickViewContainer.appendChild(quickViewContent);
    quickViewContainer.style.display = 'block';
}