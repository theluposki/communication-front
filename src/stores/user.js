import { defineStore } from "pinia";
import { ref } from "vue";
import { socket } from "../socket.io.js";

const myuser = {
  id: "96b5d0d9-ea59-4cc4-ae06-2949a0934e1e",
  fullName: "Nick Doe",
  nickname: "nickdoe",
  age: 18,
  gender: "Woman",
  bio: "write your biography 💻 ",
  picture: ["/defaults/userWoman.jpg"],
  links: [
    {
      name: "🔗 mylink",
      href: "http://link.com",
    },
  ],
  createdAt: "2023-07-20T01:17:52.000Z",
};

export const useUserStore = defineStore("user", () => {
  const user = ref({});

  const login = async () => {
    user.value = myuser
  };

  const connect = () => {
    socket.emit("user_connected", { user: "Luposki " });
  };

  const disconnect = () => {
    socket.emit("user_disconnected", { user: "Luposki " });
  };

  return { user };
});
