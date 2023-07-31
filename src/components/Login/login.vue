<script setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/user.js"

const userStore = useUserStore()

const email = ref("nickdoe@gmail.com");
const password = ref("Monkeydluffy1234@");
let interval;

const validEmail = () => {
  const elEmail = document.querySelector(".email");
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  clearInterval(interval);

  interval = setTimeout(() => {
    if (!RegExp(pattern).exec(email.value)) {
      elEmail.classList.add("error");
      const errorTxt = elEmail.querySelector(".error-text");
      if (email.value != "") {
        errorTxt.innerText = "Enter a valid e-mail address";
      } else {
        console.log("sdadaas");
        errorTxt.innerText = "E-mail can'r be blank";
      }
    } else {
      elEmail.classList.remove("error");
    }
  }, 500);
};

const validPassword = () => {
  const elPassword = document.querySelector(".password");

  if (password.value == "") {
    elPassword.classList.add("error");
    const errorTxt = elPassword.querySelector(".error-text");
    if (password.value === "") {
      errorTxt.innerText = "Password can'r be blank";
    }
  } else {
    elPassword.classList.remove("error");
  }
};

const fnLogin = async () => {
  const elEmail = document.querySelector(".email");
  const elPassword = document.querySelector(".password");
  if (email.value == "" || password.value == "") {
    elEmail.classList.add("shake", "error");
    elPassword.classList.add("shake", "error");
  }

  setTimeout(() => {
    elEmail.classList.remove("shake");
    elPassword.classList.remove("shake");
  }, 500);

  await userStore.login(email.value, password.value)
};
</script>

<template>
  <div class="login">
    <form class="form">
      <h2 class="title">MyReb</h2>
      <div class="field email">
        <div class="input-area">
          <input
            tabindex="1"
            type="email"
            @keyup="validEmail"
            v-model="email"
            id="email"
            placeholder="digite seu e-mail"
          />
          <i class="icon bx bxs-envelope"></i>
          <i class="error icon-erro bx bx-error-circle"></i>
        </div>
        <div class="error error-text"></div>
      </div>

      <div class="field password">
        <div class="input-area">
          <input
            tabindex="2"
            type="password"
            @keyup="validPassword"
            v-model="password"
            id="password"
            placeholder="digite sua senha"
          />
          <i class="icon bx bxs-lock"></i>
          <i class="error icon-erro bx bx-error-circle"></i>
        </div>
        <div class="error error-text"></div>
      </div>

      <div class="pass-link">
        <a href="#">Esqueci a senha 🔑</a>
      </div>

      <button tabindex="3" @click.prevent="fnLogin" class="btn-login">
        logar
      </button>
    </form>
  </div>
</template>

<style scoped>
.login {
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  min-height: calc(100vh - 60px);
  max-height: calc(100vh - 60px);
  overflow-x: hidden;
  overflow-y: auto;
}

.form {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 24px;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: var(--current-primary);
  font-size: 35px;
}

.form .field {
  width: 100%;
  margin-bottom: 20px;
}

.form .field.shake {
  animation: shake 0.3s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    margin-left: 0;
  }
  20%,
  80% {
    margin-left: -12px;
  }
  40%,
  60% {
    margin-left: 12px;
  }
}

.form .field .input-area {
  position: relative;
}

.form input {
  height: 50px;
  width: 100%;
  padding: 0 45px;
  outline: none;
  border-radius: 5px;
  border: solid 1px var(--current-primary);
  background-color: var(--dark2);
  color: var(--white2);
  border-bottom-width: 2px;
  font-size: 17px;
}

.form .field.error input {
  border-color: red;
}

.form .field.error input::placeholder {
  color: red;
}

.form .field.error i {
  color: red;
}

.form input::placeholder {
  color: var(--current-primary);
  font-size: 17px;
}

.form .field i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  pointer-events: none;
}

.form .field .icon {
  left: 12px;
  color: var(--current-primary);
}

.form .field .icon-erro {
  right: 12px;
  color: red;
}

.form .field .error-text {
  color: red;
  margin-top: 5px;
  text-align: left;
}

.form .field .error {
  display: none;
}

.form .field.error .error {
  display: block;
}

.form .pass-link {
  text-align: left;
  align-self: flex-start;
  margin-top: -10px;
}

.form .pass-link a {
  text-decoration: none;
  color: var(--current-secondary);
}
.form .pass-link a:hover {
  text-decoration: underline;
}

.btn-login {
  width: 100%;
  height: 50px;
  min-height: 50px;
  background-color: var(--current-primary);
  margin-top: 30px;
  border: 1px solid var(--current-primary);
  border-radius: 5px;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  transition: background ease 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-login:hover {
  transition: all ease 0.4s;
  opacity: 0.8;
}
.btn-login:active {
  scale: 0.94;
}
</style>
