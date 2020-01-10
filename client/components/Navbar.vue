<template>
  <div>
    <nav>
      <div>
        <h1>Loginzicht</h1>
      </div>
      <div>
        <ul class="nav-links">
          <li>
            <nuxt-link class="nav-link" to="/">Home</nuxt-link>
          </li>
          <li>
            <nuxt-link class="nav-link" to="/profile">Profile</nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  padding: 1em;
  align-content: center;
}
.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  align-items: center;
  justify-content: center;
}
.nav-link {
}
</style>
