<template>
	<div class="field">
		<label class="label">{{ label }}</label>
		<div class="control">
			<div class="select">
				<select :value="value" @input="$emit('input', $event.target.value)">
					<option
						v-for="option in options"
						:value="option.value"
						:key="option.Id"
						>{{ option.name }}</option
					>
				</select>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		options: {
			type: Array
		},

		defaultSelected: {
			type: String
		},
		label: {
			type: String
		}
	},
	data() {
		return {
			value: this.defaultSelected
		};
	}
};
</script>

<style></style>
