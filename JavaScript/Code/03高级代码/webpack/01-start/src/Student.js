function test(target) {
  console.log(target.name);
}

@test
class StudentList {
  constructor (studentList) {
    this.studentList = studentList;
  }

  getStudentsName () {
    return this.studentList.map(student => {
      return student.name;
    })
  }
}

export default StudentList
