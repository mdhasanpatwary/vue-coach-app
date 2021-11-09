<template>
    <div>
        <BaseDialog :show="!!error" title="An Error Occured!" @close="handleError">
            <p>{{ error }}</p>
        </BaseDialog>
        <section>
            <CoachFilter @change-filter="setFilters"></CoachFilter>
        </section>
        <section>
            <BaseCard>
                <div>
                    <BaseButton mode="outline" @click="loadCoaches(true)">Refresh</BaseButton>
                    <BaseButton v-if="!isCoach && !isLoading" link to="register">Register As Coach</BaseButton>
                </div>
                <div v-if="isLoading">
                    <BaseSpinner></BaseSpinner>
                </div>
                <ul v-else-if="hasCoaches">
                    <!-- <li v-for="coach of filteredCoaches" :key="coach.id">{{ coach.firstName }}</li> -->
                    <CoachItem v-for="coach of filteredCoaches" :key="coach.id" :id="coach.id" :firstName="coach.firstName" :lastName="coach.lastName" :areas="coach.areas" :rate="coach.hourlyRate"></CoachItem>
                </ul>
                <h3 v-else>No Coaches Found.</h3>
            </BaseCard>
        </section>
    </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import BaseCard from '../../components/ui/BaseCard.vue';

export default {
    components: {
        CoachItem,
        CoachFilter,
        BaseCard
    },
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                frontend: true,
                backend: true,
                career: true,
            }
        }
    },
    created() {
        this.loadCoaches();
    },
    computed: {
        isCoach() {
            return this.$store.getters['coachesModule/isCoach'];
        },
        filteredCoaches() {
            // return this.$store.getters['coachesModule/coaches'];

            const coaches = this.$store.getters['coachesModule/coaches'];

            return coaches.filter(coach => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                if (this.activeFilters.career && coach.areas.includes('career')) {
                    return true;
                }
                return false;
            });
        },
        hasCoaches() {
            return !this.isLoading && this.$store.getters['coachesModule/hasCoaches'];
        }
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        async loadCoaches(refresh = false) {
            this.isLoading = true;
            try {
                await this.$store.dispatch('coachesModule/loadCoaches', {forceRefresh: refresh});
            } catch (error) {
                this.error = error.message || 'Something Went Wrong!';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null
        }
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>