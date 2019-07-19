export default {
    state: {
        loading: false,
        auth_error: null,
        todos: []
    },
    getters: {
        isLoading(state) {
            return state.loading;
        },
        todos(state) {
            return state.todos;
        }
    },
    mutations: {
        updateTodos(state, payload) {
            state.todos = payload;
        }
    },
    actions: {
        getTodos(context) {
            // @TODO Use the correct API endpoint here!
            axios.get('/api/todos')
            .then((response) => {
                context.commit('updateTodos', response.data.todos);
            })
        }
    }
};
