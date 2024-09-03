import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue2';
import {resolve} from 'path';

let base = undefined;
if(process.argv[3]?.includes('base')){
	let baseRegExp = /--base=(.+)\s?/;
	let matches = baseRegExp.exec(process.argv[3]);
	base = matches[1];
}

export default defineConfig(({command, mode}) => {
	const defaultConfig = {
		build: {
			rollupOptions: {
				input: {
					main: resolve(__dirname, 'index.html'),
					"ex4-vue-v-dom-issue": resolve(__dirname, 'ex4-vue-v-dom-issue/index.html')
				}
			}
		},
		resolve: {
			alias: {
				'$': resolve(__dirname, 'src')
			}
		},
		plugins: [
			vue()
		]
	};

	const devConfig = {
		sourcemap: true,
	};

	if(mode === 'development') {
		return {... defaultConfig, ... devConfig}
	}

	return defaultConfig;
});
