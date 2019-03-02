// import 'bootstrap/dist/css/bootstrap.min.css';

import StudentList from "./Student";

// let i2 = require('./i2');
// document.getElementById('app').innerHTML = i2;
// $('#app').css({fontSize: '30px', background: 'orange'});
require('./css/index.css');
require('./css/header.less');
require('./css/body.scss');
require('./css/footer.styl');

// let avatar = require('./assets/avatar.jpg');
// let image = document.createElement('img');
// image.src = avatar;
// document.body.appendChild(image);
const studentsInfo = [
  { name: 'mark', age: 18},
  { name: 'sherry', age: 19},
  { name: 'jack', age: 17},
];
const studentList = new StudentList(studentsInfo);
console.log(studentList.getStudentsName());
