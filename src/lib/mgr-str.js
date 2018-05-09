export default {
  get () {
    return JSON.parse(localStorage.getItem('str_stdnt')).slice()
  },
  set (val) {
    localStorage.setItem('str_stdnt', JSON.stringify(val))
  },
  add (student) {
    const students = this.get() || []
    students.push(student)
    this.set(students)
  },
  edit (student) {
    const students = this.get()
    students[students.findIndex(e => e.id === student.id)] = student
    this.set(students)
  },
  del (id) {
    const students = this.get()
    students.splice(students.findIndex(e => e.id === id), 1)
    this.set(students)
  }
}
