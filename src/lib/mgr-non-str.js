export default {
  get () {
    return localStorage.getItem('non_str_stdnt') || ''
  },
  set (val) {
    localStorage.setItem('non_str_stdnt', val)
  },
  find (students, id) {
    const start = students.indexOf(`&/${id}/`)
    const end = students.slice(start).indexOf('^')
    return [start, end]
  },
  add (student) {
    const students = this.get() || ''
    this.set(students.concat(student))
  },
  edit (student) {
    const students = this.get() || ''
    const [start, end] = this.find(students, student.split('/')[1])
    this.set(students.slice(0, start) + student + students.slice(end + 1))
  },
  del (id) {
    const students = this.get()
    const [start, end] = this.find(students, id)
    this.set(students.slice(0, start) + students.slice(end + 1))
  }
}

// &/1/Alex/19/M/A/123^