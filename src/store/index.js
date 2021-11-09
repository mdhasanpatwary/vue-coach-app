import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js'
import requestModule from './modules/requests/index.js'

const store = createStore({
    modules: {
        coachesModule: coachesModule,
        requestModule: requestModule
    },
    state() {
        return {
            userId: 'c3'
        }
    },
    getters: {
        userId(state) {
            return state.userId;
        }
    }
});

export default store;