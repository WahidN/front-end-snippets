<template>
  <form @submit.prevent="submitSnippet">
    <InputText :placeholder="'Name of snippet'" v-model="title" :label="'Name'" :hasIcon="false" />
    <TextArea :label="'Description'" v-model="description" :rows="5" />
    <SelectBox v-model="category" :options="options" :defaultSelected="'javascript'" />
    <div class="field">
      <label class="label">Code</label>
      <div class="control">
        <vue-editor v-model="code" :editorToolbar="customToolbar" />
      </div>
    </div>
    <div class="field is-grouped">
      <Button :label="'Submit'" :type="'submit'" :classes="['is-link']" />
    </div>
  </form>
</template>

<script>
import InputText from "../components/Form/InputText";
import TextArea from "../components/Form/TextArea";
import SelectBox from "../components/Form/SelectBox";
import Button from "../components/Button";
import { VueEditor } from "vue2-editor";

import { mapActions } from "vuex";

export default {
  components: {
    InputText,
    TextArea,
    SelectBox,
    Button,
    VueEditor
  },
  data() {
    return {
      customToolbar: ["code-block"],
      code: null,
      description: null,
      title: null,
      category: "javascript",
      options: [
        {
          Id: 1,
          name: "JS",
          value: "javascript"
        },
        {
          Id: 2,
          name: "CSS",
          value: "css"
        },
        {
          Id: 3,
          name: "Html",
          value: "Html"
        }
      ]
    };
  },
  methods: {
    ...mapActions(["addSnippet"]),
    submitSnippet() {
      this.addSnippet({
        title: this.title,
        description: this.description,
        category: this.category,
        code: this.code,
        likes: 0
      }).then(() => {
        this.code = "";
        this.description = "";
        this.title = "";
        this.category = "javascript";
      });
    }
  }
};
</script>

<style>
</style>