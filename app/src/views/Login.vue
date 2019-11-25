<template>
	<div class="login-panel">
		<form @submit.prevent="loginUser">
			<div class="card">
				<div class="card__header">
					<h1>Login</h1>
				</div>
				<div class="card__body">
					<div class="error__messages" v-if="getErrors.length > 0">
						<div
							v-for="(error, i) in getErrors"
							:key="i"
							class="notification is-danger"
						>
							{{ error }}
						</div>
					</div>
					<InputText
						v-model="email"
						:label="'E-mail'"
						:placeholder="'e.g joe@mail.com'"
						:inputType="'email'"
						:hasIcon="true"
						:icon="'mail'"
						:hasError="!$v.email.required && submitStatus === 'ERROR'"
						:errorMessage="'Field is required'"
					/>
					<InputText
						v-model="password"
						:label="'Password'"
						:placeholder="'password'"
						:inputType="'password'"
						:hasIcon="true"
						:icon="'https'"
						:hasError="!$v.password.required && submitStatus === 'ERROR'"
						:errorMessage="'Field is required'"
					/>
					<router-link :to="'/forgot-password'">Forgot password?</router-link>
				</div>
				<div class="card__footer">
					<div class="control">
						<span>
							Not a user?
							<router-link :to="'/register'">Register</router-link>
						</span>
					</div>
					<div class="control">
						<button
							class="button is-link"
							v-bind:class="{ 'is-loading': isLoading }"
						>
							Login
						</button>
					</div>
				</div>
			</div>
		</form>
		<router-link to="/" class="is-size-7">Back to homepage</router-link>
	</div>
</template>

<script>
import InputText from '../components/Form/InputText';
import { required, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
	components: {
		InputText
	},
	data() {
		return {
			email: null,
			password: null,
			isLoading: false,
			submitStatus: null
		};
	},
	computed: {
		...mapGetters(['getErrors'])
	},
	validations: {
		email: {
			required,
			email
		},
		password: {
			required
		}
	},
	methods: {
		loginUser() {
			this.isLoading = true;
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.submitStatus = 'ERROR';
				this.isLoading = false;
			} else {
				this.$store
					.dispatch('LOGIN', {
						email: this.email,
						password: this.password
					})
					.then(result => {
						this.isLoading = false;
						return result.data;
					})
					.then(() => {
						if (this.$store.getters.isAuthenticated) {
							this.$router.push('/admin');
						}
					})
					.catch(error => {
						this.isLoading = false;
						console.error(error);
					});
			}
		}
	}
};
</script>

<style lang="scss">
.login-panel {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	.card {
		width: 450px;
	}
}
</style>
