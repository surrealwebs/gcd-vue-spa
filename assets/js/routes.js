import TodosMain from './components/todos/Main.vue';
import TodosList from './components/todos/List.vue';
import NewTodo from './components/todos/New.vue';
import Todo from './components/todos/View.vue';

export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/todos',
        component: TodosMain,
        children: [
            {
                path: '/',
                component: TodosList
            },
            {
                path: 'new',
                component: NewTodo
            },
            {
                path: ':id',
                component: Todo
            }
        ]
    }
];