function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalize(string) {
  return string
    .split(" ")
    .map(capitalizeFirstLetter)
    .join(" ");
}

const vue = new Vue({
  el: "#vue",
  data: {
    inputName: "",
    resultName: "",
    birthday: "",
    checkedMillennial: false
  },
  computed: {
    result() {
      return (
        this.checkedMillennial &&
        (this.birthday
          ? `${capitalize(this.resultName)} ${
              this.isMillennial ? "is" : "is not"
            } a millennial.`
          : `Sorry, couldn't find their birthday.`)
      );
    },
    isMillennial() {
      const birthyear = parseInt(this.birthday.split("-")[0]);
      return birthyear >= 1981 && birthyear < 1996;
    }
  },
  methods: {
    setBirthday: async function(name) {
      try {
        const formattedName = capitalize(name).split(" ").join("_"); // First_Last
        const url = `https://en.wikipedia.org/api/rest_v1/page/html/${formattedName}`;
        const data = (await axios.get(url)).data;
        const html = $.parseHTML(data);
        this.birthday = $(".bday", html).text();
      } catch (error) {
      } finally {
        this.checkedMillennial = true;
      }
    },
    onSubmit(event) {
      event.preventDefault();
      this.birthday = "";
      this.checkedMillennial = false;
      this.resultName = this.inputName;
      this.setBirthday(this.inputName);
    }
  }
});
