export default {
    coaches(state) {
        return state.coaches;
    },
    hasCoaches(state) {
        return state.coaches && state.coaches.length > 0;
    },
    // isCoach(state, gatters, rootState, rootGetters) {
    isCoach(_, gatters, _2, rootGetters) {
        const coaches = gatters.coaches;
        const userId = rootGetters.userId;
        return coaches.some(coach => coach.id === userId);
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;

        if (!lastFetch) {
            return true;
        }

        const currentTimestemp = new Date().getTime();
        return (currentTimestemp - lastFetch) / 1000 > 60;
    }
};