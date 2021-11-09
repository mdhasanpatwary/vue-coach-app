<template>
    <section>
        <BaseCard>
            <h2>Register as a Coach Now!</h2>
            <CoachForm @save-data="saveData"></CoachForm>
        </BaseCard>
    </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue'

export default {
    components: {
        CoachForm
    },
    methods: {
        saveData(formData) {
            this.$store.dispatch('coachesModule/registerCoach', formData);
            this.$router.replace('/coaches');
        }
    }
}
</script>
