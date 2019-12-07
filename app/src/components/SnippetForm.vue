<template>
  <form @submit.prevent="submitSnippet">
    <InputText
      :placeholder="'Name of snippet'"
      v-model="title"
      :label="'Name'"
      :hasIcon="false"
      :hasError="!$v.title.required && submitStatus === 'ERROR'"
      :errorMessage="'Field is required'"
    />
    <span
      class="help is-danger"
      v-if="!$v.title.minLength && submitStatus === 'ERROR'"
    >Title must have at least 3 characters</span>
    <TextArea
      :label="'Description'"
      v-model="description"
      :rows="5"
      :hasError="!$v.description.required && submitStatus === 'ERROR'"
      :errorMessage="'Field is required'"
    />
    <SelectBox
      v-model="category"
      :options="options"
      :defaultSelected="'javascript'"
      :label="'Category'"
    />
    <TextArea
      :label="'code'"
      v-model="code"
      :rows="8"
      :hasError="!$v.code.required && submitStatus === 'ERROR'"
      :errorMessage="'Field is required'"
    />
    <div class="field is-grouped form-buttons">
      <Button :label="buttonLabel" :type="'submit'" :classes="['is-link']" />
    </div>
  </form>
</template>

<script>
import InputText from "../components/Form/InputText";
import TextArea from "../components/Form/TextArea";
import SelectBox from "../components/Form/SelectBox";
import Button from "../components/Button";
import { required, minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  components: {
    InputText,
    TextArea,
    SelectBox,
    Button
  },
  data() {
    return {
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
      ],
      submitStatus: null
    };
  },
  props: {
    snippetId: String,
    buttonLabel: String,
    isEditing: Boolean
  },
  validations: {
    title: {
      required,
      minLength: minLength(3)
    },
    description: {
      required
    },
    code: {
      required
    }
  },
  methods: {
    ...mapActions(["addSnippet", "updateSnippet"]),
    submitSnippet() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        if (this.isEditing) {
          this.updateSnippet({
            Id: this.snippetId,
            title: this.title,
            description: this.description,
            code: this.code,
            category: this.category
          }).then(result => {
            if (result.status === 200) {
              this.$emit("snippetSaved");
            }
          });
        } else {
          this.addSnippet({
            title: this.title,
            description: this.description,
            category: this.category,
            code: this.code,
            likes: 0
          }).then(() => {
            this.submitStatus = "SUCCESS";
            this.code = "";
            this.description = "";
            this.title = "";
            this.category = "javascript";
          });
        }
      }
    },
    async getSnippet() {
      const { data } = await this.$http.get(
        `http://localhost:3000/snippet/${this.snippetId}`
      );
      this.title = data.snippet.title;
      this.description = data.snippet.description;
      this.category = data.snippet.category;
      this.code = data.snippet.code;
    }
  },
  mounted() {
    if (this.snippetId) {
      this.getSnippet();
    }
  }
};
</script>

<style>
.quillWrapper {
  background-color: #fff;
}

.field.form-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>