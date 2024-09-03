<script>
let persistentStyle = 'color: green; font-weight: bold; background-color: lightgreen;';
let brokenStyle = 'color: red; font-weight: bold; background-color: pink;';
let mainStyle = 'color: brown; font-weight: bold; background-color: yellow;';

let counterMixin = {
	data(){
		return {
			counter: 1,
			interval: null,
		}
	},
	created(){
		this.interval = setInterval(() => this.counter++, 1000);
	},
	beforeDestroy() {
		// noinspection JSCheckFunctionSignatures
		clearInterval(this.interval);
	}
}

let persistentComponent = {
	name: 'persistent-component',
	props: ['passed'],
	updated(){
		console.log('%cPersistentComponent component is updated', persistentStyle);
	},
	mixins: [counterMixin],
	destroyed() {
		console.log('%cPersistentComponent component is destroyed', persistentStyle);
	}
};

export default {
	name: "render-new-component",
	mixins: [counterMixin],
	render(h){
		console.log('%crendering function call', mainStyle);
		let templateCompilationTime = new Date();

		let brokenComponent = {
			name: 'broken-component',
			props: ['passed'],
			template: `<div style="background: pink">{{counter}} + {{passed}} + ${templateCompilationTime}</div>`,
			mixins: [counterMixin],
			updated(){
				console.log('%cBroken component component is updated', brokenStyle);
			},
			destroyed() {
				console.log('%cBroken component is destroyed', brokenStyle);
			}
		};


		// persistent component template won't be recompiled again after the first render
		persistentComponent.template = `<div style="background: lightgreen">{{counter}} + {{passed}} + ${templateCompilationTime}</div>`;

		return h('div', {}, [
			h(brokenComponent, {props: {passed: this.counter}}),
			h(persistentComponent, {props: {passed: this.counter}})
		]);
	}
}
</script>

<style scoped>

</style>