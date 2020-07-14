<template>
	<div class="em-grid">
		<div v-if="$slots.actions || $slots.search" class="em-grid-toolbar">
			<slot name="actions"/>
			<div v-if="$slots.search" class="em-grid-search-bar">
				<slot name="search"/>
			</div>
		</div>
		<div class="em-grid-body">
			<slot/>
		</div>
		<div v-if="$slots.footer" class="em-grid-footer">
			<slot name="footer"/>
		</div>
	</div>
</template>

<script>
export default {
	
}
</script>

