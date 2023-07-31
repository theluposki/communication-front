import { defineStore } from "pinia";
import { ref } from "vue";
import { socket } from "../socket.io.js";
import { api } from "../axios.js"

import { encryptValue } from "../utils/crypto.js"

export const useUserStore = defineStore("user", () => {
  const user = ref({});

  const connect = (nickname) => {
    socket.emit("user_connected", { user: nickname });
  };

  const disconnect = (nickname) => {
    socket.emit("user_disconnected", { user: nickname });
  };

  const login = async (email, password) => {
    const response = await api.post("/users/auth", {
      email,
      password,
    });

    if (response.data.token) {
      const profile = await api.get("/profiles/my");

      user.value = profile.data;
      localStorage.setItem("profile", encryptValue(JSON.stringify(profile.data)))
      connect(profile.data.nickname)
    }
  };

  const refreshUser = async () => {
    const profile = await api.get("/profiles/my");

    if (profile.status === 401) {
      alert("Sua sessão expirou, Faça login para continuar.");
      return 401;
    }

    user.value = profile.data;
    localStorage.setItem("profile", encryptValue(JSON.stringify(profile.data)))
  }

  const logout = () => {
    localStorage.removeItem("profile")
    disconnect(user.value.nickname)
    user.value = {}
  }



  return { user, login, logout, refreshUser };
});
