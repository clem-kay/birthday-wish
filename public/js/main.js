document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const wishesBox = document.querySelector('.wishes-box');
    const toggleButton = document.querySelector('.toggle-button');
  
    // Function to fetch and update images in the carousel
    function fetchAndUpdateImages() {
      fetch('/images')
        .then(response => response.json())
        .then(images => {
          const carouselInner = document.querySelector('.carousel-inner');
          const carouselIndicators = document.querySelector('.carousel-indicators');
          carouselInner.innerHTML = '';
          carouselIndicators.innerHTML = '';
          images.forEach((image, index) => {
            const isActive = index === 0 ? 'active' : '';
            const carouselItem = `
              <div class="carousel-item ${isActive}">
                <img class="d-block w-100" src="${image}" alt="Slide ${index + 1}">
              </div>
            `;
            carouselInner.innerHTML += carouselItem;
            const indicator = `
              <li data-target="#carouselExampleIndicators" data-slide-to="${index}" class="${isActive}"></li>
            `;
            carouselIndicators.innerHTML += indicator;
          });
        });
    }
  
    fetchAndUpdateImages();
  
    setInterval(fetchAndUpdateImages, 5000);
  
    // Handle form submission
    const form = document.getElementById('wish-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const response = await fetch('/wishes', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      socket.emit('new-wish', result);
      document.getElementById('wish').value = '';
      document.getElementById('photo').value = '';
    });
  
    // Handle new wishes received from socket
    socket.on('new-wish', (data) => {
      const wishesContainer = document.getElementById('wishes');
      const newWish = document.createElement('li');
      newWish.classList.add('wish');
      newWish.textContent = data.message;
      if (data.imageUrl) {
        const img = document.createElement('img');
        img.src = data.imageUrl;
        img.classList.add('img-fluid');
        newWish.appendChild(img);
      }
      wishesContainer.appendChild(newWish);
  
      // Update the .wishes-content div
      const wishesBoxContent = document.querySelector('.wishes-content');
      const wishDiv = document.createElement('div');
      wishDiv.classList.add('wish-text');
      wishDiv.textContent = data.message;
  
      if (data.imageUrl) {
        const img = document.createElement('img');
        img.src = data.imageUrl;
        img.classList.add('img-fluid');
        wishDiv.appendChild(img);
      }
  
      wishesBoxContent.appendChild(wishDiv);
    });
  
    // Toggle wishes box visibility
    toggleButton.addEventListener('click', () => {
      wishesBox.classList.toggle('hidden');
      toggleButton.textContent = wishesBox.classList.contains('hidden') ? 'Show' : 'Hide';
    });
  
    function fetchAndUpdateWishes() {
      fetch('/wishes/all-wishes')
        .then(response => response.json())
        .then(wishes => {
          const wishesBoxContent = document.querySelector('.wishes-content');
          wishesBoxContent.innerHTML = ''; // Clear current content
  
          wishes.forEach(wish => {
            const wishDiv = document.createElement('div');
            wishDiv.classList.add('wish-text');
            wishDiv.textContent = wish.message;
            wishesBoxContent.appendChild(wishDiv);
          });
        });
    }
  
    // Initial fetch to load wishes when the page loads
    fetchAndUpdateWishes();
  });
  