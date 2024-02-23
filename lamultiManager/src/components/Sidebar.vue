<script setup>

</script>

<template>
  <!-- offcanvas -->
  <div
      class="offcanvas offcanvas-start sidebar-nav bg-dark"
      tabindex="-1"
      id="sidebar"
    >
      <div class="offcanvas-body p-0">
        <nav class="navbar-dark">
          <ul class="navbar-nav">
            <li>
              <div class="text-muted small fw-bold text-uppercase px-3">
                INICIO
              </div>
            </li>
            <li>
                <RouterLink to="/home" class="nav-link px-3 active">
                <span class="me-2"><i class="bi bi-speedometer2"></i></span>
                <span>Dashboard</span>
                </RouterLink>
            </li>
            <li class="my-4"><hr class="dropdown-divider bg-light" /></li>
            <li>
              <div class="text-muted small fw-bold text-uppercase px-3 mb-3">
                Interface
              </div>
            </li>
            <li>
              <a
                class="nav-link px-3 sidebar-link"
                data-bs-toggle="collapse"
                href="#layouts"
              >
                <span class="me-2"><i class="bi bi-layout-split"></i></span>
                <span>Layouts</span>
                <span class="ms-auto">
                  <span class="right-icon">
                    <i class="bi bi-chevron-down"></i>
                  </span>
                </span>
            </a>
              <div class="collapse" id="layouts">
                <ul class="navbar-nav ps-3">
                  <li>
                    <RouterLink to="/home" class="nav-link px-3"><!--ACA CAMBIAR EL HTML-->
                      <span class="me-2"
                        ><i class="bi bi-speedometer2"></i
                      ></span>
                      <span>Dashboard</span>
                        </RouterLink>
                        <RouterLink to="/asociar-usuario" class="nav-link px-3"><!--ACA CAMBIAR EL HTML-->
                      <span class="me-2"
                        ><i class="bi bi-person-fill"></i>
                      </span>
                      <span>Asociar Usuario</span>
                    </RouterLink>
                    <RouterLink to="/modificar-eventos" class="nav-link px-3"><!--ACA CAMBIAR EL HTML-->
                      <span class="me-2"
                        ><i class="bi bi-calendar-event"></i>
                      </span>
                      <span>Modificar Eventos</span>
                    </RouterLink>
                    <RouterLink to="/modificar-titulos" class="nav-link px-3"><!--ACA CAMBIAR EL HTML-->
                      <span class="me-2"
                        ><i class="bi bi-type"></i>
                      </span>
                      <span>Modificar Títulos</span>
                    </RouterLink>
                    <RouterLink to="/modificar-profes" class="nav-link px-3"><!--ACA CAMBIAR EL HTML-->
                      <span class="me-2"
                        ><i class="bi bi-book"></i>
                      </span>
                      <span>Modificar Profes</span>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </li>
            <li class="my-4"><hr class="dropdown-divider bg-light" /></li>
            <li>
              <div class="text-muted small fw-bold text-uppercase px-3 mb-3">
                Addons
              </div>
            </li>
            <li>
              <a href="#" class="nav-link px-3">
                <span class="me-2"><i class="bi bi-graph-up"></i></span>
                <span>Charts</span>
              </a>
            </li>
            <li>
              <a href="#" class="nav-link px-3">
                <span class="me-2"><i class="bi bi-table"></i></span>
                <span>Tables</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- offcanvas -->
</template>

<style scoped>

</style>
