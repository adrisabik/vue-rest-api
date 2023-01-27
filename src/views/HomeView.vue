<template>
  <div class="px-4 pb-20">
    <h1 class="text-center mt-5 font-bold text-lg mb-4">Tambah Mahasiswa</h1>
    <div class="">
      <form @submit.prevent="addStudent">
        <div class="flex flex-col mb-2">
          <label for="name">Nama</label>
          <input id="name" type="text" class="border border-blue rounded px-2 py-1 mt-1" v-model="formStudent.name">
        </div>
        <div class="flex flex-col mb-2">
          <label for="nim">NIM</label>
          <input id="nim" type="text" class="border border-blue rounded px-2 py-1 mt-1" v-model="formStudent.nim">
        </div>
        <div class="flex flex-col mb-2">
          <label for="gender">Gender</label>
          <!-- <input id="gender" type="text" class="border border-blue rounded px-2 py-1 mt-1"> -->
          <select id="gender" class="border border-blue rounded px-2 py-1 mt-1" v-model="formStudent.gender">
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div class="flex flex-col mb-2">
          <label for="address">Alamat</label>
          <input id="address" type="text" class="border border-blue rounded px-2 py-1 mt-1" v-model="formStudent.address">
        </div>
        <button type="submit" class="bg-blue text-white rounded px-2 py-1 mt-3 w-full">Tambah</button>
      </form>
    </div>

    <div class="w-full bg-blue h-px my-10 opacity-50"></div>

    <div class="">
      <h1 class="text-center mt-5 font-bold text-lg mb-4">List Mahasiswa</h1>
      <div v-for="student in students" :key="student.id" class="flex border border-blue rounded p-5 mb-3">
        <div class="basis-5/6">
          <p>Nama : {{ student.name }}</p>
          <p>NIM : {{ student.nim }}</p>
          <p>Gender : {{ student.gender == 'L' ? 'Laki-laki' : 'Perempuan' }}</p>
          <p>Alamat : {{ student.address }}</p>
        </div>
        <div class="basis-1/6">
          <router-link :to="'update/' + student.id" class="bg-blue text-white px-2 py-1 rounded mb-5">Update</router-link>
          <button class="bg-red text-white px-2 py-1 rounded" @click="deleteStudent(student.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup(){
    const students = ref([]);
    const formStudent = reactive({
      name: '',
      nim: '',
      gender: '',
      address: ''
    })

    onMounted(() => {
      getStudents();
    })

    const getStudents = async() => {
      await axios.get('http://127.0.0.1:8000/api/students').then(response => {
        students.value = response.data.data;
        console.log(students);
      })
    }

    const addStudent = async() => {
      console.log(formStudent);
      await axios.post('http://127.0.0.1:8000/api/students', formStudent).then(response => {
        console.log(response)
      })
      getStudents();
    }

    const deleteStudent = async(id) => {
      await axios.get(`http://127.0.0.1:8000/api/students/${id}/delete`).then(response => {
        console.log(response)
      })
      getStudents();
    }

    return {
      students,
      formStudent,
      addStudent,
      deleteStudent
    }
  }
}
</script>
