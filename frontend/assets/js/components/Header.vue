<template>
    <nav class="navbar navbar-expand-md navbar-light navbar-todo">
        <div class="container">
            <router-link class="navbar-brand" to="/todos">My Vue TODO App</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li>
                        <router-link to="/todos" class="nav-link">TODOs</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'app-header'
    }
</script>
