<template>
	<div class="login-panel">
		<form @submit.prevent="register">
			<div class="card">
				<div class="card__header">
					<h1>Register</h1>
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
						v-model.trim="email"
						:label="'E-mail'"
						:placeholder="'e.g joe@mail.com'"
						:inputType="'email'"
						:hasError="!$v.email.required && submitStatus === 'ERROR'"
						:errorMessage="'E-mail is required'"
					/>
					<span
						class="help is-danger"
						v-if="!$v.email.email && submitStatus === 'ERROR'"
						>Incorrect email</span
					>
					<InputText
						v-model.trim="password"
						:label="'Password'"
						:info="'(min. 6 characters)'"
						:placeholder="'password'"
						:inputType="'password'"
						:hasError="!$v.password.required && submitStatus === 'ERROR'"
						:errorMessage="'Password is required'"
					/>
					<span
						class="help is-danger"
						v-if="!$v.password.minLength && submitStatus === 'ERROR'"
						>Password must have at least 6 characters</span
					>
					<InputText
						v-model.trim="confirmPassword"
						:label="'Confirm Password'"
						:placeholder="'confirm password'"
						:inputType="'password'"
						:hasError="!$v.confirmPassword.required && submitStatus === 'ERROR'"
						:errorMessage="'Field is required'"
					/>
					<span
						class="help is-danger"
						v-if="
							!$v.confirmPassword.sameAsPassword && submitStatus === 'ERROR'
						"
						>Passwords don't match</span
					>
				</div>
				<div class="card__footer">
					<div class="control">
						<router-link to="/login" class="button is-light"
							>Cancel</router-link
						>
					</div>
					<div class="control">
						<button type="submit" class="button is-link">Register</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import InputText from '../components/Form/InputText';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
	components: {
		InputText
	},
	data() {
		return {
			email: null,
			password: null,
			confirmPassword: null,
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
			required,
			minLength: minLength(6)
		},
		confirmPassword: {
			required,
			sameAsPassword: sameAs('password')
		}
	},
	methods: {
		async register() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.submitStatus = 'ERROR';
			} else {
				this.$store
					.dispatch('REGISTER', {
						email: this.email,
						password: this.password,
						confirmPassword: this.confirmPassword
					})
					.then(result => {
						this.isLoading = false;
						if (result.status === 200) {
							this.$router.push('/login');
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
