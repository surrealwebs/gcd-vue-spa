<template>
    <div>
        <div class="btn-wrapper">
            <router-link to="/todos/new" class="btn btn-primary btn-sm">New</router-link>
        </div>
        <table class="table">
            <thead>
                <th>Status</th>
                <th>Title</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <template v-if="!todos.length">
                    <tr>
                        <td colspan="3" class="text-center">No TODO's Available</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="todo in todos" :key="todo.id">
                        <td>{{ todo.status }}</td>
                        <td>{{ todo.title }}</td>
                        <td>
                            <router-link :to="`/todos/${todo.id}`">View</router-link>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'list',
        mounted() {
            if (this.todos.length) {
                return;
            }
            
            this.$store.dispatch('getTodos');
        },
        computed: {
            todos() {
                return this.$store.getters.todos;
            }
        }
    }
</script>

<style scoped>
.btn-wrapper {
    text-align: right;
    margin-bottom: 20px;
}
</style>
