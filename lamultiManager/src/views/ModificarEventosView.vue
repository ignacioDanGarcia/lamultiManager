<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import { ref, onMounted } from 'vue';
import { getFirestore, collection, addDoc, deleteDoc, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

const eventos = ref([]);
const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];


onMounted(async () => {
  const db = getFirestore();

  

  try {
    
    const eventosQuery = query(
      collection(db, 'eventos'),
      
    );

    const eventodEventsSnapshot = await getDocs(eventosQuery);
    const eventosData = [];

    for (const eventosDoc of eventodEventsSnapshot.docs) {
        const tituloId = eventosDoc.data().oid_titulo.id;

        const tituloDocRef = doc(db, 'titulos', tituloId);
        const tituloDoc = await getDoc(tituloDocRef);
        if (tituloDoc.exists()) {
          const nombreTitulo = tituloDoc.data().nombre;
          const fecha = eventosDoc.data().fecha;
          const dia = diasSemana[fecha];
          const hora = eventosDoc.data().hora_inicio;
          

          eventosData.push({
            nombreTitulo: nombreTitulo,
            fecha: dia,
            hora: hora
          });
        }
      
    }

    eventos.value = eventosData;
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
                            <th>Titulo</th>
                            <th>Dia</th>
                            <th>Hora</th>
                            <th>Modificar</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(row, index) in eventos" :key="index">
                            <td>{{ row.nombreTitulo }}</td>
                            <td>{{ row.fecha }}</td>
                            <td>{{ row.hora }}</td>
                          <td>
                            <button class="btn btn-danger btn-sm" @click="eliminarFila(index)">Eliminar</button></td>
                          </tr>
                          <tr>
                            <td><input></td>
                            <td><input></td>
                            <td><input></td>
                            <td><button class="btn btn-success btn-sm" onclick="agregarFila(this)">Agregar</button></td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th>Titulo</th>
                            <th>Dia</th>
                            <th>Hora</th>
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
