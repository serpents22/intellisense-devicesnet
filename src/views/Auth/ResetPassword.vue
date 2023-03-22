<template>
  <!-- <loading :loading="isLoading" /> -->
  <alert 
    :message ="status.message"
    :modalActive="modalActive"
    :isError="isError"
     @close="closeNotification" />
  <div class="login-container">
    <intellisenseTitle title="Inserisci l'e-mail per recuperare la password" />
    <div class="menu">
      <Modal>
        <VeeForm :validation-schema="schema" v-slot="{ handleSubmit }" as="div" >
          <form  @submit="handleSubmit($event, onSubmit)" class="form-wrapper" >
            <div class="field-wrapper">
              <BaseInput name="email" type="email" label="Email" placeholder="Xavier@mail.com" class="text-field" />
            </div>
            <div class="button-wrapper">
              <MyButton type="submit" class="filled" label="Send" :loading="isLoading" />
            </div>
          </form>
        </VeeForm>
      </Modal>
    </div>
  </div>
</template>

<script setup>
  import popupContent from '@/components/popups/popupContent.vue'
  import BaseInput from '@/components/input/BaseInput.vue'
  import Modal from '@/components/modal/Modal.vue'
  import MyButton from '@/components/button/BaseButton.vue'
  import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
  import { resetPasswordSchema } from '@/composable/validationSchemas'
  import { useAuthStore } from '@/stores/AuthStore'
  import { storeToRefs } from 'pinia'
  import { defineAsyncComponent, ref } from 'vue'

  const ErrorPopup = defineAsyncComponent(
    () => import ('@/components/popups/popupContent.vue'),
  )
  const schema = resetPasswordSchema
  const isError = ref(false)
  const modalActive = ref(false)

  // auth with pinia
  const authStore = useAuthStore()
  const { status, isLoading } = storeToRefs(useAuthStore())

  const onSubmit = async (values, { resetForm }) => {
    await authStore.forgotPassword(values)
    modalActive.value = true
    if (status.value.code == 'fail') {
      isError.value = true
      setTimeout(closeNotification, 3000)
    } else {
      isError.value = false
      setTimeout(closeNotification, 3000)
      resetForm()
    }
  }

  function closeNotification() {
    modalActive.value = false
  }
  
</script>

<style scoped>

.login-container {
  @apply flex flex-col
}

.header {
  @apply flex flex-col justify-center mt-10 h-fit w-full items-center gap-3
}
.menu {
  @apply flex flex-col w-full items-center justify-center
}

span h1 {
  @apply sm:text-3xl text-xl text-[#353535] font-medium
}

.form-wrapper{
  @apply flex flex-col mb-4
}

.field-wrapper{
  @apply flex flex-col
}

.create-account {
  @apply flex flex-col items-center gap-3
}
.create-account router-link {
  @apply font-normal text-lg mt-5 text-center text-white cursor-pointer
}
.button-wrapper {
  @apply mt-3 w-full flex flex-col
}
h1 {
  @apply mb-8 font-bold text-2xl
}


</style>