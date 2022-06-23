<template>
<section class="section"></section>
  <div class="container has-text-centered">  
    <div v-if="!kanaksanStore.authenticatedUser || !kanaksanStore.authenticatedUser.id">
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            type="text"
            v-model.trim="model.form.idOrEmail"
            placeholder="Id or Email address"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            type="number"
            v-model.trim="model.form.phone"
            placeholder="Mobile number"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-phone"></i>
          </span>
        </p>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            :disabled="model.isLoading"
            class="button is-active is-primary"
            v-on:click="onFindAccount"
          >
            <span class="material-icons"> search </span>
            <span class="is-size-5">&nbsp; Find Account</span>
          </button>
        </div>
        <div class="control">
          <button
            :disabled="model.isLoading"
            class="button is-danger is-loading"
            v-show="model.isLoading"
          ></button>
        </div>
      </div>
    </div>

      <div class="field" v-else>
        <p class="control has-icons-left">
          <input
            class="input"
            type="number"
            v-model="model.form.otp"
            placeholder="Email OTP"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-code"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            type="password"
            v-model="model.form.password"
            placeholder="Password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            :type="[model.widgetType.textOrPassword]"
            v-model="model.form.confirmPassword"
            placeholder="Confirm Password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field is-grouped">
        <div class="control mr-6">
          <label class="checkbox is-size-5 has-text-link">
            <input
              type="checkbox"
              v-model="model.form.showPassword"
              @change="onShowPassword()"
            />
            show password
          </label>
        </div>
        <div class="control ml-6">
          <a class="is-size-5 has-text-link" v-on:click="onPasswordPattern()">
            Password pattern?
          </a>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            :disabled="model.isLoading"
            class="button is-active is-primary"
            v-on:click="onReset"
          >
            <span class="material-icons">lock_reset</span>
            <span class="is-size-5">&nbsp; Reset </span>
          </button>
        </div>
        <div class="control">
          <button
            :disabled="model.isLoading"
            class="button is-danger is-loading"
            v-show="model.isLoading"
          ></button>
        </div>
      </div>
  </div>

  <notification-component :messages="kanaksanStore.errors" />
</template>

<script setup lang='ts'>
import { computed, reactive } from "vue";
import axios from "axios";
import { useKanaksanStore } from '../stores/kanaksanStore'
import UserBean from "../models/user-bean";
import NotificationComponent from "./NotificationComponent.vue";

const kanaksanStore = useKanaksanStore()

const model = reactive({
  passwordFormTitle: "Reset Password",
  isLoading: false,
  actionCommand: "Login",

  flag: {
    isAccountExists: false,
  },

  widgetType: {
    textOrPassword: "password",
  },

  form: {
    email: "",
    phone: "",
    showPassword: false,
    idOrEmail: "",
    otp: "",
    password: "",
    confirmPassword: "",
  },
})

const computeUser = computed(() => {
  model.passwordFormTitle =
    kanaksanStore.authenticatedUser && kanaksanStore.authenticatedUser.id
      ? "Reset Password"
      : "Account Details"
})

const computePasswordFormTitle = computed(() => {
  model.passwordFormTitle =
    kanaksanStore.authenticatedUser && kanaksanStore.authenticatedUser.id
      ? "Reset Password"
      : "Account Details"

  return model.passwordFormTitle
})

const computePasswordMatch = computed(() => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const flag =
    passwordPattern.test(model.form.password) &&
    passwordPattern.test(model.form.confirmPassword) &&
    model.form.password === model.form.confirmPassword

  return flag
})

function onPasswordPattern() {
  kanaksanStore.setErrors( [
    "Password should have atleast One UPPER CASE LETTER",
    "... one lower case letter",
    "... one Number",
    "... one special character (@$!%*?&)",
    "... atleast 8 characters length.",
    "Example: ABab12@$",
  ])
}

function onFindAccount() {
  model.isLoading = true
  kanaksanStore.setErrors([])
  let isId = false
  if (checkIfValidUUID(model.form.idOrEmail)) isId = true

  let userBean = new UserBean(
    isId ? model.form.idOrEmail : null,
    model.form.phone,
    isId ? null : model.form.idOrEmail,
    null,
    null
  )

  const URL = kanaksanStore.apiBaseURL + "/api/user/find"
  axios
    .post(URL, userBean)
    .then((response) => {
      kanaksanStore.setAuthenticatedUser(response.data)
      if (response.data.hasError === false) {
        const user = response.data
        if (user.id) {
          global.updateUser(user)
          router.push("/profile")
        }
      } else {
        this.$store.dispatch('SET_LOGGED_IN_USRE', null);
        this.$store.dispatch('SET_ERRORS', 
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
      model.isLoading = false
    })
}

function onReset() {
  model.isLoading = false
  kanaksanStore.setErrors([])
  if (!model.isPasswordValid()) {
    kanaksanStore.setErrors(["Password Invalid."])
  }
}

function isPasswordValid() {
  // abAB12@$1
  const regExFlag =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      model.form.password
    ) &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      model.form.confirmPassword
    )
  const equalsFlag = model.form.password === model.form.confirmPassword
  return regExFlag && equalsFlag
}

function onShowPassword() {
  model.widgetType.textOrPassword = model.form.showPassword
    ? "text"
    : "password"
}

function onForgot() {
  reset()
  alert("Not Implemented. \r\nPlease contact team.kanaksan@gmail.com")
}

function reset() {
  model.form.showPassword = false
  model.widgetType.textOrPassword = "password"
}

function checkIfValidUUID(uuid) {
  if (!uuid || uuid.length != 36) return false

  // Regular expression to check if string is a valid UUID
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

  return regexExp.test(uuid)
}
</script>
