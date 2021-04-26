const canvas = document.querySelector('canvas');
let ctx;
let img;
let str = ``;
let map = new Map();
map.set('saturate', '100%')

function drawImage(url = "assets/img/img.jpg") {
    img = new Image();
    img.setAttribute('crossOrigin', 'anonymous'); 

    img.src = url;

    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx = canvas.getContext("2d");
      str = ``;
      for (let enter of map) {
        str += `${enter[0]}(${enter[1]}) `;
      }      
      console.log(str);
      ctx.filter = str;
      ctx.drawImage(img, 0, 0);
    };  
  }
  drawImage();

  const nextImgButton = document.querySelector('.btn-next');

let count = 1;

  nextImgButton.addEventListener('click', function() {
    if (count > 20) {
      count = 1;
    }
    if (count < 10) {
      let addZero = '0' + count;
      generateUrl(addZero);
    }
    else {
      generateUrl(count);
    }
    count++;
  })

  function generateUrl (number) {
    let partOfDay = CheckTime();
    let url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${partOfDay}/${number}.jpg`
    drawImage(url);
  }

  function CheckTime() {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 0 && hour < 6 ) {
      return 'night';
    }
    else if (hour >= 6 && hour < 12) {
      return 'morning';
    }
    else if (hour >= 12 && hour < 18) {
      return 'day';
    }
    else {
      return 'evening';
    }
  }

  const filters = document.querySelector('.filters');

  function applyFilters() {
  filters.addEventListener("mousemove", (event) => {
    let elementTarget = event.target;    
    if (event.target.matches('input')) {
      changeOutputValue(elementTarget);
      const suffix = elementTarget.dataset.sizing;
      const name = elementTarget.name;
      str = ``
      let filterValue = `${elementTarget.value}${suffix}`;
      map.set(name, filterValue);
      for (let enter of map) {
        str += `${enter[0]}(${enter[1]}) `;
    }
    ctx.filter = str;
    console.log(str);
    ctx.drawImage(img, 0, 0)
    }
  })
}

applyFilters();

function changeOutputValue (input) {
  input.nextElementSibling.innerHTML = input.value;
}

const resetButton = document.querySelector('.btn-reset');

function resetFilters () {
  let InputElemnts = filters.querySelectorAll('input');
  for (let element of InputElemnts) {
    element.value = '0';
    if (element.name === 'saturate') {
      element.value = '100';
    }
    changeOutputValue(element);
    str = `saturate(100%)`;
    ctx.filter = str;
    ctx.drawImage(img, 0, 0);
  }
}

resetButton.addEventListener('click', resetFilters);


const loadBtn = document.querySelector('.btn-load--input');

loadBtn.addEventListener('change', () => {
  const file = loadBtn.files[0];
  console.log(file);
  const reader = new FileReader();
  console.log(reader)
  reader.onload = () => {
    
  let url = reader.result;
  console.log(url)
  drawImage(url);
    
  }
  reader.readAsDataURL(file);
  console.log(reader.readAsDataURL(file))
})

const download = document.querySelector(".btn-save");

download.addEventListener('click', function(e) {
  var link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL()
  link.click();
  link.delete;
});

const btnFullScreen = document.querySelector('.fullscreen');

btnFullScreen.addEventListener("click", () => {
  btnFullScreen.classList.toggle("openfullscreen");
  activeFullScreen();
  deactivateFullscreen();
});

function activeFullScreen() {
  if(!document.fullscreenElement) {
      document.documentElement.requestFullscreen();   
      
  }     // W3C spec
}

function deactivateFullscreen() {
  if(document.fullscreenElement) {
    document.exitFullscreen();
  }
};

