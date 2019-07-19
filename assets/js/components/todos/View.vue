<template>
    <div class="todo-view" v-if="todo">
        <div class="todo-info">
            <table class="table">
                <tr>
                    <th>ID</th>
                    <td>{{ todo.id }}</td>
                </tr>
                <tr>
                    <th>Title</th>
                    <td>{{ todo.title }}</td>
                </tr>
                <tr>
                    <th>Details</th>
                    <td>{{ todo.details }}</td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{{ todo.status }}</td>
                </tr>
            </table>
            <router-link to="/todos">Back to TODO list</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'view',
        created() {
            if (this.todos.length) {
                this.todo = this.todos.find((todo) => todo.id == this.$route.params.id);
            } else {
                // @TODO Get the specified TODO from the data store
            }
        },
        data() {
            return {
                todo: null
            };
        },
        computed: {
            todos() {
                return this.$store.getters.todos;
            }
        }
    }
</script>

<style scoped>
.todo-view {
    display: flex;
    align-items: center;
}
.todo-info {
    flex: 3;
    overflow-x: scroll;
}
</style>
