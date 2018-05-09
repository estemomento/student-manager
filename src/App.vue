<template>
  <div id="app">
    <h1>Student Manager</h1>
    <h2>Mode: {{ mode ? 'Structural': 'Non-Structural' }}</h2>
    <el-button @click="addVisible = true" type="primary" icon="el-icon-plus">Add Student</el-button>
    <el-dialog title="New Student" :visible.sync="addVisible">
      <el-form :model="addForm">
        <el-form-item label="Name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Age">
          <el-input v-model="addForm.age"></el-input>
        </el-form-item>
        <el-form-item label="Sex">
          <el-input v-model="addForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="Grade">
          <el-input v-model="addForm.grade"></el-input>
        </el-form-item>
        <el-form-item label="Score">
          <el-input v-model="addForm.score"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">Cancel</el-button>
        <el-button type="primary" @click="add(addForm)">OK</el-button>
      </div>
    </el-dialog>
    <el-button @click="changeMode">Change Mode</el-button>
    <el-table :data="data">
      <el-table-column prop="name" label="Name" sortable></el-table-column>
      <el-table-column prop="age" label="Age" sortable></el-table-column>
      <el-table-column prop="sex" label="Sex" sortable></el-table-column>
      <el-table-column prop="grade" label="Grade" sortable></el-table-column>
      <el-table-column prop="score" label="Score" sortable></el-table-column>
      <el-table-column label="Options">
        <template slot-scope="scope">
          <el-button @click="editVisible = true; editForm = scope.row" type="text" size="small">Edit</el-button>
          <el-dialog title="Edit Student" :visible.sync="editVisible">
            <el-form :model="editForm">
              <el-form-item label="Name">
                <el-input v-model="editForm.name"></el-input>
              </el-form-item>
              <el-form-item label="Age">
                <el-input v-model="editForm.age"></el-input>
              </el-form-item>
              <el-form-item label="Sex">
                <el-input v-model="editForm.sex"></el-input>
              </el-form-item>
              <el-form-item label="Grade">
                <el-input v-model="editForm.grade"></el-input>
              </el-form-item>
              <el-form-item label="Score">
                <el-input v-model="editForm.score"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editVisible = false">Cancel</el-button>
              <el-button type="primary" @click="edit(editForm)">OK</el-button>
            </div>
          </el-dialog>
          <el-button @click="del(scope.row.id)" type="text" size="small">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import MgrStr from './lib/mgr-str'
import MgrNonStr from './lib/mgr-non-str'

export default {
  data: () => ({
    addVisible: false,
    editVisible: false,
    mode: true,
    addForm: {
      name: '',
    },
    editForm: {
      name: '',
    },
    data: null
  }),
  methods: {
    add (student) {
      this.addVisible = false
      student.id = new Date().valueOf()
      if (this.mode) MgrStr.add(student)
      else MgrNonStr.add(`&/${student.id}/${student.name}/${student.age}/${student.sex}/${student.grade}/${student.score}/^`)
      this.refresh()
    },
    edit (student) {
      this.editVisible = false
      if (this.mode) MgrStr.edit(student)
      else MgrNonStr.edit(`&/${student.id}/${student.name}/${student.age}/${student.sex}/${student.grade}/${student.score}/^`)
      this.refresh()
    },
    del (id) {
      if (this.mode) MgrStr.del(id)
      else MgrNonStr.del(id)
      this.refresh()
    },
    changeMode () {
      this.mode = !this.mode
      this.refresh()
    },
    refresh () {
      if (this.mode) this.data = MgrStr.get()
      else {
        const students = MgrNonStr.get().split('^')
        const ret = []
        for (let s of students) {
          if (s !== '') {
            s = s.split('/')
            s = { id: s[1], name: s[2], age: s[3], sex: s[4], grade: s[5], score: s[6] }
            ret.push(s)
          }
        }
        this.data = ret
      }
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>


<style>
* {
  margin: 0;
  box-sizing: border-box;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  padding: 40px;
}

h2 {
  margin: 20px 0;
}

.el-table {
  margin-top: 20px;
  width: 100%;
}
</style>
