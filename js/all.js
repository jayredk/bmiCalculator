const height = document.getElementById('height');
const weight = document.getElementById('weight');
const result = document.getElementById('result');
const list = document.getElementById('list');
const resetBox = document.querySelector('.resetBox');
let bmiRecords = [];

result.addEventListener('click', init);


function bmiCalculator() {
  let userHeight = height.value;
  let userWeight = weight.value;
  let bmi = (userWeight / ((userHeight / 100) * (userHeight / 100))).toFixed(2);
  let userData = {
      height: userHeight,
      weight: userWeight,
      BMI: bmi,
  };

  if (userHeight > 0 && userWeight > 0) {
    if (bmi < 18.5) {
      userData.status = '過輕';
      userData.style = 'underWeight';
    } else if (18.5 <= bmi && bmi < 24) {
      userData.status = '理想';
      userData.style = 'normalWeight';
    } else if (24 <= bmi && bmi < 27) {
      userData.status = '過重';
      userData.style = 'overWeight';
    } else if (27 <= bmi && bmi < 30) {
      userData.status = '輕度肥胖';
      userData.style = 'mildObesity';
    } else if (30 <= bmi && bmi < 35) {
      userData.status = '中度肥胖';
      userData.style = 'obesity';
    } else if (35 <= bmi) {
      userData.status = '重度肥胖';
      userData.style = 'severeObesity';
    }

    bmiRecords.push(userData);
    localStorage.setItem('bmiRecords', JSON.stringify(bmiRecords));
    resetInput(userData);
  } else if (userHeight === '' || userWeight === '') {
    alert('輸入欄位不可爲空');
  } else {
    alert('請輸入正確身高體重');
  }


  
}

function resetInput(userData) {
  resetBox.innerHTML = `<div class="custom-reset flex-shrink-0 border-${userData.style} text-${userData.style} mr-3 px-4 py-4">
            <p class="text-3l my-0">${userData.BMI}</p>
            <span>BMI</span>
            <button id="reset" class="btn text-primary bg-${userData.style} border-primary rounded-circle p-0"><i class="fas fa-sync-alt text-lg p-2"></i></button>
          </div>
          <p class="flex-shrink-0 text-${userData.style} text-3l">${userData.status}</p>`
  resetBox.style.display = 'flex';
  let reset = document.getElementById('reset');
  reset.addEventListener('click', () => {
    resetBox.style.display = 'none';
    height.value = '';
    weight.value = '';
  })
}

function deleteList() {
  let deleteButton = document.querySelectorAll('.fa-trash-alt');
  for(let i = 0; i < bmiRecords.length; i++) {
    deleteButton[i].addEventListener('click', () => {
    bmiRecords.splice(i, 1);
    JSON.stringify(localStorage.setItem('bmiRecords', bmiRecords));
    render(bmiRecords);
    })
  }
}
function deleteAll() {
  let deleteAll = document.getElementById('deleteAll');
  deleteAll.addEventListener('click', () => {
    list.innerHTML = "";
    bmiRecords = [];
    localStorage.clear();
    list.innerHTML = `<li class="pb-5 mb-5">這裡還沒有資料，快來計算你的 BMI 吧！</li>`;
  })
}

function render(bmiRecords) {
  let today = new Date;
  let recordsLength = bmiRecords.length;
  let str = '';
  let i = 0;
  for (i; i < recordsLength; i++){
    str += `<li class="d-flex justify-content-around align-items-center position-relative bg-white ${bmiRecords[i].style} mb-4">
          <h2 class="text-control font-weight-normal py-3 mb-0">${bmiRecords[i].status}</h3>
          <p class="text-2l py-3 mb-0"><span class="align-middle mr-2 text-base">BMI</span>${bmiRecords[i].BMI}</p>
          <p class="text-2l py-3 mb-0"><span class="align-middle mr-2 text-base">weight</span>${bmiRecords[i].weight}kg</p>
          <p class="text-2l py-3 mb-0"><span class="align-middle mr-2 text-base">height</span>${bmiRecords[i].height}cm</p>
          <p class="py-3 mb-0">0${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}</p><i class="btn fas fa-trash-alt"></i>
        </li>`;
  }
  if (recordsLength != 0) {
    str += `<button id="deleteAll" class="btn btn-grayExLight text-lg"><i class="far fa-times-circle text-xl align-text-bottom mr-2"></i>清除全部</button>`
  }
  list.innerHTML = str;
  if (recordsLength != 0) {deleteAll();}
  deleteList();
}

function init() {
  bmiCalculator();
  render(bmiRecords);
}
