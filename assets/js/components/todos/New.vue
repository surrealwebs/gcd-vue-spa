<template>
    <div class="todo-new">
        <form @submit.prevent="add">
            <table class="table">
                <tr>
                    <th>Title</th>
                    <td>
                        <input type="text" class="form-control" v-model="todo.title" placeholder="Todo Title"/>
                    </td>
                </tr>
                <tr>
                    <th>Details</th>
                    <td>
                        <input type="text" class="form-control" v-model="todo.details" placeholder="Todo Details"/>
                    </td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>
                        <input type="text" class="form-control" v-model="todo.status" placeholder="Todo Status"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <router-link to="/todos" class="btn">Cancel</router-link>
                    </td>
                    <td class="text-right">
                        <input type="submit" value="Create" class="btn btn-primary">
                    </td>
                </tr>
            </table>
        </form>
        <div class="errors" v-if="errors">
            <ul>
                <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
                    <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import validate from 'validate.js';

    export default {
        name: 'new',
        data() {
            return {
                todo: {
                    title: '',
                    details: '',
                    status: 0
                },
                errors: null
            };
        },
        methods: {
            add() {
                this.errors = null;

                const constraints = this.getConstraints();

                const errors = validate(this.$data.todo, constraints);

                if(errors) {
                    this.errors = errors;
                    return;
                }

                // @TODO Store the new TODO in the data store
                axios.post('/api/todos/new', this.$data.todo)
                    .then((response) => {
                        this.$router.push('/todos');
                    });

            },
            getConstraints() {
                return {
                    title: {
                        presence: true,
                        length: {
                            minimum: 3,
                            message: 'Must be at least 3 characters long'
                        }
                    },
                    details: {
                        length: {
                            minimum: 0,
                            maximum: 1024,
                            message: 'Maximum allowed characters is 1024'
                        }
                    },
                    status: {
                        presence: true,
                        numericality: true,
                        length: {
                            minimum: 1,
                            maximum: 1,
                            message: 'Must be a 1 (complete) or a 0 (not complete)'
                        }
                    }
                };
            }
        }
    }
</script>

<style>
.errors {
    background: lightcoral;
    border-radius:5px;
    padding: 21px 0 2px 0;
}
</style>

