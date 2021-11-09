
export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
            // id: new Date().toISOString(),
            // id: context.rootGetters.userId,
            firstName: data.firstname,
            lastName: data.lastname,
            description: data.description,
            hourlyRate: data.rate,
            areas: data.areas,
        }

        const response = await fetch(`https://registercoach-69de4-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

        // const responseData = await response.json();

        if (!response.ok) {
            //error
        }

        // context.commit('registerCoach', coachData);
        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }

        const response = await fetch(`https://registercoach-69de4-default-rtdb.firebaseio.com/coaches.json`);
        const responseData = await response.json();
        
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to Fetch!');
            throw error;
        }
        
        const coaches = [];

        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstname,
                lastName: responseData[key].lastname,
                description: responseData[key].description,
                hourlyRate: responseData[key].rate,
                areas: responseData[key].areas,
            };
            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');
    }
};