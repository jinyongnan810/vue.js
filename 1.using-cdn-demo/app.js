const app = Vue.createApp({
  //   template: "<h1>{{name}}</h1>",
  data() {
    return {
      picture: "",
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
    };
  },
  async created() {
    await this.getUser();
  },
  methods: {
    async getUser() {
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      const user = data.results[0];
      console.log(user.picture.thumbnail);
      this.picture = user.picture.thumbnail;
      this.firstName = user["name"]["first"];
      this.lastName = user["name"]["last"];
      this.email = user["email"];
      this.gender = user["gender"];
    },
  },
});
app.mount("#app");
