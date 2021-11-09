<template>
    <div>
        <section>
            <BaseCard>
                <h2>{{ fullName }}</h2>
                <h3>${{ rate }}</h3>
            </BaseCard>
        </section>
        <section>
            <BaseCard>
                <header>
                    <h2>Interested! Reach Out Now</h2>
                    <BaseButton link :to="contactLink">Contact</BaseButton>
                </header>
                <router-view></router-view>
            </BaseCard>
        </section>
        <section>
            <BaseCard>
                <BaseBadge v-for="area in areas" :key="area" :type="area" :title="area"></BaseBadge>
                <p>{{ description }}</p>
            </BaseCard>
        </section>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            selectedCoach: null,
        }
    },
    computed: {
        fullName() {
            return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
        },
        areas() {
            return this.selectedCoach.areas;
        },
        rate() {
            return this.selectedCoach.hourlyRate;
        },
        description() {
            return this.selectedCoach.description;
        },
        contactLink() {
            // return this.$route.path + '/' + this.id + '/contact';
            return this.$route.path + '/contact';
        }
    },
    created() {
        this.selectedCoach = this.$store.getters['coachesModule/coaches'].find(coach => coach.id === this.id);
    }
}
</script>
