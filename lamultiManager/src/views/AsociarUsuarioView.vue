<template>
  <div>
    <Navbar />
    <Sidebar />
    <main class="mt-5 pt-3">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <h4>Asociar</h4>
          </div>
        </div>
        <div class="row" style="color: black;">
            <div class="col-md-6 mb-3">
              <div class="card h-100">
                <div class="card-body">
                  <h1 class="card-title">Asociar</h1>
                  <form @submit.prevent="asociarUsuario">
                    <div class="mb-3">
                      <label for="usuario_uid" class="form-label">Usuario UID</label>
                      <input type="text" class="form-control" v-model="usuario_uid_v" placeholder="Enter user" />
                    </div>
                    <div class="mb-3">
                      <label for="titulo" class="form-label">Título</label>
                      <select class="form-control" v-model="titulo_v" @change="onTituloChange">
                        <option value="" disabled selected>Select a title</option>
                        <option v-for="titulo in titulos" :key="titulo.id" :value="titulo.id">{{ titulo.nombre }}</option>
                      </select>
                    </div>

                    <div class="mb-3" v-if="titulo_v">
                      <label for="dia" class="form-label">Día</label>
                      <select class="form-control" v-model="dia_v">
                        <option value="" disabled selected>Select a day</option>
                        <option v-for="dia in dias" :key="dia" :value="dia">{{ dia }}</option>
                      </select>
                    </div>

                    <div class="mb-3" v-if="dia_v">
                      <label for="hora" class="form-label">Hora</label>
                      <select class="form-control" v-model="hora_v">
                        <option value="" disabled selected>Select an hour</option>
                        <option v-for="hora in horas" :key="hora" :value="hora">{{ hora }}</option>
                      </select>
                    </div>

                    <button type="submit" class="btn btn-primary" :disabled="!hora_v">Asociar</button>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="card h-100">
                <div class="card-body">
                  <h1 class="card-title">Desasociar</h1>
                  <form @submit.prevent="desasociarUsuario">
                    <div class="mb-3">
                      <label for="usuario_uid" class="form-label">Usuario UID</label>
                      <input type="text" class="form-control" v-model="usuario_uid_v_d" placeholder="Enter user" />
                    </div>
                    <div class="mb-3">
                      <label for="titulo" class="form-label">Título</label>
                      <select class="form-control" v-model="titulo_v_d" @change="onTituloChange">
                        <option value="" disabled selected>Select a title</option>
                        <option v-for="titulo in titulos" :key="titulo.id" :value="titulo.id">{{ titulo.nombre }}</option>
                      </select>
                    </div>

                    <div class="mb-3" v-if="titulo_v_d">
                      <label for="dia" class="form-label">Día</label>
                      <select class="form-control" v-model="dia_v_d">
                        <option value="" disabled selected>Select a day</option>
                        <option v-for="dia in dias" :key="dia" :value="dia">{{ dia }}</option>
                      </select>
                    </div>

                    <div class="mb-3" v-if="dia_v_d">
                      <label for="hora" class="form-label">Hora</label>
                      <select class="form-control" v-model="hora_v_d">
                        <option value="" disabled selected>Select an hour</option>
                        <option v-for="hora in horas" :key="hora" :value="hora">{{ hora }}</option>
                      </select>
                    </div>
                    <button type="submit" class="btn btn-primary" :disabled="!hora_v_d">Desasociar</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="row" style="color: black;">
          <div class="col-md-12 mb-3">
            <div class="card">
              <div class="card-header">
                <span><i class="bi bi-table me-2"></i></span> Users Event Table
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table id="example"
                                  class="table table-striped data-table"
                                  style="width: 100%">
                    <thead>
                      <tr>
                        <th>UID</th>
                        <th>Titulo Evento</th>
                        <th>Dia</th>
                        <th>Hora</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(usuario, index) in usuarios" :key="index">
                        <td>{{ usuario.usuario_uid }}</td>
                        <td>{{ usuario.evento }}</td>
                        <td>{{ usuario.dia }}</td>
                        <td>{{ usuario.hora }}</td>
                      </tr>
                    </tbody>
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

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';

import { ref, onMounted } from 'vue';
import { getFirestore, collection, addDoc, deleteDoc, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

// tabla de usuarios
const usuarios = ref([]);

// asociar/desasociar
const usuario_uid_v_d = ref('');
const usuario_uid_v = ref('');
const titulo_v = ref('');
const dia_v = ref('');
const hora_v = ref('');
const titulo_v_d = ref('');
const dia_v_d = ref('');
const hora_v_d = ref('');

const titulos = ref([]);
const dias = ref([]);
const horas = ref([]);
const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];


onMounted(async () => {
  const db = getFirestore();

  

  try {
    
    const userEventsQuery = query(
      collection(db, 'usuario_evento_rel'),
      
    );

    const userEventsSnapshot = await getDocs(userEventsQuery);
    const usuariosData = [];

    for (const userEventDoc of userEventsSnapshot.docs) {
      const usuario_uid = userEventDoc.data().usuario_uid;
      const eventoId = userEventDoc.data().oid_evento.id;

      const eventoDocRef = doc(db, 'eventos', eventoId);
      const eventoDoc = await getDoc(eventoDocRef);

      if (eventoDoc.exists()) {
        const tituloId = eventoDoc.data().oid_titulo.id;

        const tituloDocRef = doc(db, 'titulos', tituloId);
        const tituloDoc = await getDoc(tituloDocRef);

        if (tituloDoc.exists()) {
          const nombreTitulo = tituloDoc.data().nombre;

          const fecha = eventoDoc.data().fecha;
          const dia = diasSemana[fecha];
          const hora = eventoDoc.data().hora_inicio;
          
          usuariosData.push({
            usuario_uid: usuario_uid,
            evento: nombreTitulo,
            dia: dia,
            hora: hora,
          });
        }
      }
    }

    

    usuarios.value = usuariosData;
  } catch (error) {
    console.error('Error loading user events:', error);
  }
});

const onTituloChange = async () => {
  const db = getFirestore();
  
  const titulosQuery = await getDocs(collection(db, 'titulos'));
  titulos.value = titulosQuery.docs.map(doc => ({ id: doc.id, nombre: doc.data().nombre }));
  
  const eventosQuery = query(
    collection(db, 'eventos')
  );
  
  const eventosSnapshot = await getDocs(eventosQuery);

  if (!eventosSnapshot.empty ) {
    const eventos = eventosSnapshot.docs
    .filter(doc => doc.data().oid_titulo.id === (titulo_v.value ? titulo_v.value : titulo_v_d.value))
    .map(doc => doc.data());
    
    
    
    const diasEventos = eventos.map(evento => evento.fecha);
    dias.value = Array.from(new Set(diasEventos));
    
    if (!dias.empty){
      const horasEventos = eventos.map(evento => evento.hora_inicio);
      horas.value = Array.from(new Set(horasEventos));
    }horas
  }
};
const asociarUsuario = async () => {
  try {
    const db = getFirestore();
    
    
    const eventoQuery = query(
      collection(db, 'eventos')
    );

    const eventoSnapshot = await getDocs(eventoQuery);

    if (!eventoSnapshot.empty) {
      const evento = eventoSnapshot.docs
        .filter(doc => doc.data().oid_titulo.id === titulo_v.value)
        .filter(doc => doc.data().fecha === dia_v.value)
        .filter(doc => doc.data().hora_inicio === hora_v.value)
        .map(doc => ({ id: doc.id, ...doc.data() }));
        
        const usuario_uid = usuario_uid_v.value;
        const eventoRef = doc(db, 'eventos', evento[0].id);
        await addDoc(collection(db, 'usuario_evento_rel'), {
          usuario_uid: usuario_uid,
          oid_evento: eventoRef
        });

      onTituloChange('asociar');
      
    } else {
      console.error('No se encontró el evento correspondiente.');
    }
  } catch (error) {
    console.error('Error al asociar usuario:', error);
  }
};

const desasociarUsuario = async () => {
  try {
    const db = getFirestore();
    
    const eventoQuery = query(
      collection(db, 'eventos')
    );

    const eventoSnapshot = await getDocs(eventoQuery);
    
    if (!eventoSnapshot.empty) {
      const evento = eventoSnapshot.docs
        .filter(doc => doc.data().oid_titulo.id === titulo_v_d.value)
        .filter(doc => doc.data().fecha === dia_v_d.value)
        .filter(doc => doc.data().hora_inicio === hora_v_d.value)
        .map(doc => ({ id: doc.id, ...doc.data() }));
      
      const usuario_uid = usuario_uid_v_d.value;
      const eventoRef = doc(db, 'eventos', evento[0].id);
      
      const relQuery = query(
        collection(db, 'usuario_evento_rel'),
        where('usuario_uid', '==', usuario_uid),
        where('oid_evento', '==', eventoRef)
      );

      const relSnapshot = await getDocs(relQuery);

      if (!relSnapshot.empty) {
        const relDoc = relSnapshot.docs[0];
        await deleteDoc(relDoc.ref);


        onTituloChange('desasociar');
      } else {
        console.error('No se encontró la relación de usuario y evento.');
      }
    } else {
      console.error('No se encontró el evento correspondiente.');
    }
  } catch (error) {
    console.error('Error al desasociar usuario:', error);
  }
  
};


onTituloChange();
</script>

<style>

</style>


