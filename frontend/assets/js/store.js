import VuexPersist from 'vuex-persist';

const vuexPersist = new VuexPersist({
    key: 'gdc-todos',
    storage: localStorage
});

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
            // @TODO Get the TODOs from the data store
            axios.get('/api/todos')
            .then((response) => {
                context.commit('updateTodos', response.data.todos);
            })
        }
    },
    plugins: [
        vuexPersist.plugin
    ]
};
