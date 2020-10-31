// Aplication create by: "BlueDiU"

//Global
const getDogBtn = document.querySelector('#getBtn');
const dogContainer = document.querySelector('#dogs-container');
const alert = document.querySelector('#alert');
const loading = document.querySelector('.loader');

// Fetch dogs from API
const getDogs = async () => {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random');

    const data = await res.json();

    return data;
  } catch(e) {
    console.error('UPP!', e);
  }
}

// Show Loading Bar
const showLoading = () => {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');
  }, 1000);
}

// Show API in DOM
const showDogs = async () => {
  const dogs = await getDogs();
  const dogDOM = document.createElement('div');

  // Remove Alert
  alert.style.display = 'none';

  showLoading();

  dogDOM.innerHTML = `
       <img src="${dogs.message}" class="image-dog"></img>
    `;

  //dogContainer.insertAdjacentElement('afterbegin', dogDOM)  
  dogContainer.prepend(dogDOM)
}

// Event Listener
getDogBtn.addEventListener('click', showDogs);
