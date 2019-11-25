<template>
	<div class="field">
		<label :for="id" class="label"
			>{{ label }} <span class="input-info">{{ info }}</span></label
		>
		<div class="control" v-bind:class="{ 'has-icons-left': hasIcon }">
			<input
				class="input"
				v-bind:type="inputType"
				v-bind:class="{ 'is-danger': hasError }"
				v-bind:placeholder="placeholder"
				v-bind:id="id"
				:value="value"
				@input="handleInput($event.target.value)"
			/>
			<span v-if="hasIcon" class="icon is-small is-left">
				<i class="material-icons">{{ icon }}</i>
			</span>
		</div>
		<p v-if="hasError" class="help is-danger">{{ errorMessage }}</p>
	</div>
</template>

<script>
export default {
	props: {
		id: {
			type: String
		},
		label: {
			type: String
		},
		info: {
			type: String
		},
		placeholder: {
			type: String
		},
		hasIcon: {
			type: Boolean,
			default: false
		},
		icon: {
			type: String
		},
		value: {
			type: String
		},
		inputType: {
			type: String
		},
		hasError: {
			type: Boolean,
			default: false
		},
		errorMessage: {
			type: String
		}
	},
	methods: {
		handleInput(value) {
			this.$emit('input', value);
		}
	}
};
</script>

<style lang="scss">
.input-text {
	border-radius: 5px;
	border: 1px solid $gray-9;
	padding: 6px 10px;
}

.input-info {
	font-size: map-get($font-sizes, fs-1);
	font-weight: normal;
	color: $gray-6;
}
</style>
