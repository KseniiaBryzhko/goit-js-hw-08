import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const dataFromStorage = localStorage.getItem(STORAGE_KEY);
const savedMessage = JSON.parse(dataFromStorage);

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

const onInput = event => {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const onSubmit = event => {
  if (refs.email.value === '' || refs.message.value === '') {
    alert('Please fill in all fields of the form');
  } else {
    console.log(formData);

    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
};

const onPageReset = () => {
  if (savedMessage) {
    refs.email.value = savedMessage.email || '';
    refs.message.value = savedMessage.message || '';
  }
};

onPageReset();

refs.form.addEventListener('input', throttle(onInput, 500));
refs.form.addEventListener('submit', onSubmit);
