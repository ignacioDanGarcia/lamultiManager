<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import { ref, onMounted } from 'vue';
import { getFirestore, collection, addDoc, deleteDoc, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

const profes = ref([]);


onMounted(async () => {
  const db = getFirestore();

  

  try {
    
    const profesQuery = query(
      collection(db, 'profes'),
      
    );

    const profedEventsSnapshot = await getDocs(profesQuery);
    const profesData = [];

    for (const profesDoc of profedEventsSnapshot.docs) {
        const profeNombre = profesDoc.data().nombre;
        console.log(profeNombre)

        profesData.push({
          nombre: profeNombre
        });
      
    }

    profes.value = profesData;
  } catch (error) {
    console.error('Error loading user events:', error);
  }
});


</script>
<template>
  <div >
    <Navbar />
    <Sidebar />>
    <main class="mt-5 pt-3">
      <div class="container-fluid">
        <div class="row" style="color: black;">
              <div class="col-md-12 mb-3">
                <div class="card">
                  <div class="card-header">
                    <span><i class="bi bi-table me-2"></i></span> Users Data Table
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table
                        id="example"
                        class="table table-striped data-table"
                        style="width: 100%"
                      >
                        <thead> <!--ACA PONETE LOS DATOS DEL FORM QUE QUIERE SASHI-->
                          <!--LA IDEA ES HACER UN VFOR ACA CON FIREBASE-->
                          <tr>
                            <th>Profe</th>
                            <th>Modificar</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(row, index) in profes" :key="index">
                            <td>{{ row.nombre }}</td>
                          <td>
                            <button class="btn btn-danger btn-sm" @click="eliminarFila(index)">Eliminar</button></td>
                          </tr>
                          <tr>
                            <td><input></td>
                            <td><button class="btn btn-success btn-sm" onclick="agregarFila(this)">Agregar</button></td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th>Profe</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
  </div>
</template>

<style>
</style>
