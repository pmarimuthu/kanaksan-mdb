<template>
<br>
<section class="section">
  <div class="m-5 has-text-centered">
    <button
      :disabled="model.flag.isLoading"
      class="button is-link is-active"
      @click="toggleAction('On-New-Join')"
    >
      <span v-show="model.flag.isNewJoin" class="icon is-small">
        <i class="fas fa-check"></i>
      </span>
      <span>New Join</span>
    </button>
    <i class="px-2" />
    <button
      :disabled="model.flag.isLoading"
      class="button is-primary is-active"
      @click="toggleAction('On-Referral-Join')"
    >
      <span v-show="model.flag.isReferralJoin" class="icon is-small">
        <i class="fas fa-check"></i>
      </span>
      <span>Join with Referral Code</span>
    </button>
  </div>

  <div class="columns is-centered is-variable">
    <div class="column is-8">
      <div class="box">
        <div v-show="model.flag.isReferralJoin" class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="text"
              v-model.trim="model.form.referralCode"
              placeholder="Referral Code"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-code"></i>
            </span>
          </p>
        </div>
        <div
          v-show="model.flag.isReferralJoin || model.flag.isNewJoin"
          class="field"
        >
          <p class="control has-icons-left">
            <input
              class="input"
              type="email"
              v-model.trim="model.form.email"
              placeholder="Your email address"
              @keyup.enter.prevent="onSubmit"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div
          v-show="model.flag.isReferralJoin || model.flag.isNewJoin"
          class="field"
        >
          <p class="control has-icons-left">
            <input
              class="input"
              type="number"
              v-model.trim="model.form.phone"
              placeholder="Mobile number"
              @keyup.enter.prevent="onSubmit"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-phone"></i>
            </span>
          </p>
        </div>
        <div v-show="model.flag.isLogin" class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="text"
              v-model.trim="model.form.idOrEmailOrPhone"
              placeholder="Id or Email or Phone number"
              @keyup.enter.prevent="onSubmit"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </p>
        </div>
        <div v-show="model.flag.isLogin" class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              :type="textOrPassword"
              v-model="model.form.password"
              placeholder="Password"
              @keyup.enter.prevent="onSubmit"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div v-show="model.flag.isLogin" class="field is-grouped">
          <div class="control mr-6">
            <label class="checkbox" style="color: blue">
              <input
                type="checkbox"
                v-model="model.form.showPassword"
                @click="toggleShowPassword"
              />
              show password
            </label>
          </div>
          <div class="control ml-6">
            <a style="color: blue" v-on:click="onForgot()"> Forgot details </a>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button
              :disabled="model.flag.isLoading"
              :class="[
                model.bulma.classSubmitButton,
                model.bulma.classSubmitButtonStyle,
                model.bulma.classSubmitButtonActive,
              ]"
              v-on:click="onSubmit"
            >
              <span
                v-show="model.actionCommand === 'Login'"
                class="material-icons"
                >login</span
              >
              <span v-show="!(model.actionCommand === 'Login')" class="material-icons">person_add</span>

              <span> &nbsp; {{ model.actionCommand }}</span>
            </button>
          </div>
          <div class="control" v-show="model.flag.isLoading">
            <button
              :disabled="model.flag.isLoading"
              class="button is-warning is-loading"              
            ></button>
          </div>
        </div>
      </div>
      <notification-component :messages="errors" />
    </div>
  </div>
  </section>
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import { useKanaksanStore } from '../stores/kanaksanStore'

import NotificationComponent from "../components/NotificationComponent.vue"
import UserBean from "../models/user-bean"
import LoginBean from "../models/login-bean"

const router = useRouter()
const kanaksanStore = useKanaksanStore()

const errors = computed(() => {
  return kanaksanStore.errors
})

const textOrPassword = ref("password")

const model = reactive({
  actionCommand: "Login",

  flag: {
    isLoading: false,
    isLogin: true,
    isNewJoin: false,
    isReferralJoin: false,
  },

  bulma: {
    classSubmitButton: "button",
    classSubmitButtonStyle: "is-info",
    classSubmitButtonActive: "is-active",
  },

  form: {
    referralCode: "",
    email: "",
    phone: "",
    showPassword: false,
    idOrEmailOrPhone: "ananya@school.com",
    password: "password",
  },
})

const toggleShowPassword = () => {
  textOrPassword.value = textOrPassword.value === "password" ? "text" : "password"
}

const toggleAction = (key) => {
  kanaksanStore.errors = []

  switch (key) {
    case "On-New-Join":
      model.flag.isReferralJoin = false
      model.flag.isNewJoin = !model.flag.isNewJoin
      break

    case "On-Referral-Join":
      model.flag.isNewJoin = false
      model.flag.isReferralJoin = !model.flag.isReferralJoin
      break

    default:
      break
  }

  model.flag.isLogin = !(model.flag.isNewJoin || model.flag.isReferralJoin)

  if (model.flag.isReferralJoin) {
    model.actionCommand = "Join"
    model.bulma.classSubmitButtonStyle = "is-success"
  } else if (model.flag.isNewJoin) {
    model.actionCommand = "Join"
    model.bulma.classSubmitButtonStyle = "is-link"
  } else if (model.flag.isLogin) {
    model.actionCommand = "Login"
    model.bulma.classSubmitButtonStyle = "is-info"
  }
}

const onSubmit = () => {
  kanaksanStore.setErrors([])

  model.flag.isLoading = true

  model.actionCommand = model.flag.isReferralJoin
    ? "Join with Referral Code"
    : model.flag.isNewJoin
    ? "New Join"
    : "Login"

  switch (model.actionCommand) {
    case "Join with Referral Code":
      actionJoinWithReferralCode()
      break

    case "New Join":
      actionNewJoin()
      break

    case "Login":
      actionLogin()
      break

    default:
      break
  }
}

// Actions
const actionNewJoin = () => {
  if (!model.form.email || model.form.email.length == 0)
  kanaksanStore.setErrors(["Please provide Email address"])

  if (
    !model.form.phone ||
    ((Math.log(model.form.phone) * Math.LOG10E + 1) | 0) != 10
  ) {
    kanaksanStore.setErrors(["Please provide 10-digit Mobile number"])
  }

  if (kanaksanStore.errors.length > 0) {
    model.flag.isLoading = false
    return
  }

  let userBean = new UserBean("", model.form.phone, model.form.email, "", "")

  doCreateUser(userBean)
    .then((response) => {
      if (response.data.hasError === false) {
        kanaksanStore.setAuthenticatedUser(response.data)
        localStorage.setItem('authId', kanaksanStore.authenticatedUser.id)
        localStorage.setItem('authTime', Date.now())
        doPostCreate()
      } else {
        kanaksanStore.setAuthenticatedUser(null)
        kanaksanStore.errors =  
          response.data.customErrorMessages
            ? response.data.customErrorMessages
            : []
        model.flag.isLoading = false
      }
    })
    .catch((error) => {
      kanaksanStore.setAuthenticatedUser(null)
      kanaksanStore.setErrors([error.message])
      model.flag.isLoading = false
    })
    .finally(() => {
      // model.flag.isLoading = false
    })
}


const doPostCreateOrLogin = () => {
  router.push("/profile")
}

const actionJoinWithReferralCode = () => {
  if (!model.form.referralCode)
    kanaksanStore.setErrors(["Referral Code is required."])

  if (!model.form.email || model.form.email.length == 0)
    kanaksanStore.setErrors(["Please provide Email address"])

  if (!model.form.phone || model.form.phone.length != 10)
    kanaksanStore.setErrors(["Please provide 10-digit Mobile number"])

  if (global.state.errors.length > 0) {
    model.flag.isLoading = false
    return
  }

  let bean = {
    phone: model.form.phone,
    email: model.form.email,
    referralCode: model.form.referralCode,
  }

  doReferralJoin(bean)
    .then((response) => {
      if (response.data.hasError === false) {
        const user = response.data
        if (user.id) {
          kanaksanStore.setAuthenticatedUser(user)
          doPostCreateOrLogin()
        }
      } else {
        kanaksanStore.setAuthenticatedUser(null)
        kanaksanStore.setErrors(
          response.data.customErrorMessages
            ? response.data.customErrorMessages
            : []
        )
      }
    })
    .catch((error) => {
      kanaksanStore.setAuthenticatedUser(null)
      kanaksanStore.setErrors([error.message])
    })
    .finally(() => {
      model.flag.isLoading = false
    })
}

const actionLogin = () => {
  kanaksanStore.setErrors([])
  kanaksanStore.resetStoreUser()

  if (!model.form.idOrEmailOrPhone)
    kanaksanStore.addError(["Please provide ID / Email / Phone"])

  if (!model.form.password) 
    kanaksanStore.addError(["Password is required"])

  if (kanaksanStore.errors && kanaksanStore.errors.length > 0) {
    model.flag.isLoading = false
    return
  }

  let loginBean = new LoginBean(
    model.form.idOrEmailOrPhone,
    model.form.password
  )

  let begin = performance.now()
  doAttemptLogin(loginBean)
    .then((result) => {
      kanaksanStore.setErrors(
        result.data.hasError === true ? result.data.customErrorMessages : []
      )
      if (result.data.hasError === false && result.data.id) {
        localStorage.clear()
        kanaksanStore.setAuthenticatedUser(result.data)
        kanaksanStore.setSelectedUser(result.data)

        localStorage.setItem('authTime', Date.now()) // new Date().getTime()
        localStorage.setItem('authId', result.data.id)
        localStorage.setItem('authUserName', 
          kanaksanStore.authenticatedUser.userInformation.firstname + ' ' + kanaksanStore.authenticatedUser.userInformation.lastname)
        
        doPostCreateOrLogin()
      } 
      else {
        localStorage.clear()
        kanaksanStore.resetStoreUser()
      }
    })
    .catch((error) => {
      kanaksanStore.resetStoreUser()
      kanaksanStore.setErrors([error.message])
    })
    .finally(() => {
      model.flag.isLoading = false
    })
}

const onForgot = () => {
  alert("Not Implemented. \r\nPlease contact team.kanaksan@gmail.com")
}

const doAttemptLogin = (loginBean) => {
  if (!loginBean) return
  const URL = kanaksanStore.apiBaseURL + "/api/auth/login"
  return axios.post(URL, loginBean)
}

const doReferralJoin = (bean) => {
  if (!bean.referralCode) return
  const URL =
    kanaksanStore.apiBaseURL + "/api/user-referral/join/" + bean.referralCode
  return axios.post(URL, bean)
}

const doCreateUser = (userBean) => {
  if (!userBean || !userBean.phone || !userBean.email) return
  const URL = kanaksanStore.apiBaseURL + "/api/user/create"
  return axios.post(URL, userBean)
}
</script>
