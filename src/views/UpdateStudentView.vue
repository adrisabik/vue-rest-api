<template>
  <div class="px-4 pb-20">
    <h1 class="text-center mt-5 font-bold text-lg mb-4">Ganti Data Mahasiswa</h1>
    <div class="">
      <form @submit.prevent="updateStudent">
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
          <select id="gender" class="border border-blue rounded px-2 py-1 mt-1" v-model="formStudent.gender">
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div class="flex flex-col mb-2">
          <label for="address">Alamat</label>
          <input id="address" type="text" class="border border-blue rounded px-2 py-1 mt-1" v-model="formStudent.address">
        </div>
        <div class="flex flex-row gap-5">
          <router-link to="/" class="bg-red text-white rounded px-2 py-1 mt-3 w-full text-center">Kembali</router-link>
          <button type="submit" class="bg-blue text-white rounded px-2 py-1 mt-3 w-full">Tambah</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import router from '../router';

export default {
  setup(){
    const route = useRoute();
    const id = route.params.id;

    console.log(id);

    const formStudent = reactive({
      name: '',
      nim: '',
      gender: '',
      address: ''
    })

    onMounted(() => {
      getDetailStudent();
    })

    const getDetailStudent = async() => {
      await axios.get(`http://127.0.0.1:8000/api/students/${id}/detail`).then(response => {
        formStudent.name = response.data.data.name;
        formStudent.nim = response.data.data.nim;
        formStudent.gender = response.data.data.gender;
        formStudent.address = response.data.data.address;
        console.log(formStudent);
      })
    }

    const updateStudent = async() => {
      console.log(formStudent)
      await axios.post(`http://127.0.0.1:8000/api/students/${id}`, formStudent).then(response => {
        console.log(response)
      })
      router.push('/');
    }

    return {
      formStudent,
      updateStudent
    }
  }
}
</script>