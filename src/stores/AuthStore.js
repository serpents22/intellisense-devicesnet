import { defineStore } from 'pinia'
import router from '@/router'
import authAPI from '@/services/authAPI'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('auth.user'),
    token: localStorage.getItem('auth.token'),
    status: ref({
      state:null,
      message: null,
      code: null,
    }),
    isLoading: ref(false)
  }),
  actions: {
    async signUp(data) {
      this.isLoading = true
      try {
        const res = await authAPI.signUp(data)
        console.log(res)
        this.isLoading = false
        this.status.message = 'Account Created'
        this.status.code = res.data.status
        router.push({ name: 'EmailConfirmation' });
      } catch (err) {
        console.error(err)
        this.isLoading = false
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },

    async signIn(data) {
      this.isLoading = true
      try {
        const res = await authAPI.signIn(data)
        this.isLoading = false
        this.token = res.data.data.token.token;
        this.status.message = 'Login Successful'
        this.status.code = res.data.status
        this.status.state = false
        localStorage.setItem('auth.token', res.data.data.token.token)
        localStorage.setItem('auth.user', res.data.data.user.first_name)
        router.push({ name: 'Dashboard' });
      } catch (err) {
        console.error(err)
        this.isLoading = false
        this.status.state = true
        this.status.code = err.response.status

        //define message 
        if (this.status.code == '400') {
          this.status.message = "Oops! It looks like your request wasn't quite right. Please check your input and try again."
        } 
        if (this.status.code == '401') {
          this.status.message = "Hold on! You need to be logged in to access that page. Please log in or sign up to continue."
        } 
        if (this.status.code == '403') {
          this.status.message = "Sorry! You don't have permission to access that page. Please contact support if you believe this is an error."
        } 
        if (this.status.code == '404') {
          this.status.message = "Uh-oh! We couldn't find the page you were looking for Please check the URL and try again"
        } 
        if (this.status.code == '500') {
          this.status.message = "Yikes! Something went wrong on our end. Please try again later or contact support if the issue persists."
        } 
        if (this.status.code == '502') {
          this.status.message = "Oops! We're having trouble connecting to the server. Please try again later or contact support if the issue persists."
        } 
        if (this.status.code == '503') {
          this.status.message = "Hold tight! We're performing maintenance on our servers. Please try again later."
        }


        if (err.response.data.error == 'E_ROW_NOT_FOUND: Row not found') {
          this.status.message = 'Email not Registered'
        } else if (err.response.data.error == 'E_INVALID_AUTH_PASSWORD: Password mis-match') {
          this.status.message = 'Password missmatch'
        }
        this.status.code = err.response.data.status


        return err
      }
    },

    async signOut() {
      try {
        await authAPI.signOut()
        this.user = null;
        localStorage.removeItem('auth.token');
        localStorage.removeItem('auth.user')
        router.push({ name: 'LoginForm' });
      } catch (err) {
        console.error(err)
        return err
      }

    },

    async forgotPassword(data) {

      this.isLoading = true
      try {
        const res = await authAPI.forgotPassword(data)
        this.isLoading = false
        this.status.message = 'Password reset email successfully sent'
      } catch (err) {
        this.isLoading = false
        this.status.message = err.response.data.error.errors[0].message
        return err
      }
    },

    async newPassword(data, email, signature) {
      this.isLoading = true
      try {
        await authAPI.newPassword(data, email, signature)
        this.isLoading = false
        router.push({ name: 'ResetPasswordConfirmation' });
      } catch (err) {
        console.error(err)
        this.isLoading = false
        return err
      }
    },

  }

})