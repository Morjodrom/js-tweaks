import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';

let base = undefined;
if(process.argv[3]?.includes('base')){
	let baseRegExp = /--base=(.+)\s?/;
	let matches = baseRegExp.exec(process.argv[3]);
	base = matches[1];
}

export default defineConfig(({command, mode}) => {
	const defaultConfig = {
		resolve: {
			alias: {
				'$': resolve(__dirname, 'src')
			}
		},
		plugins: [
			vue({
				template: {
					transformAssetUrls: {
						base: null,
						includeAbsolute: false,
					},
				},
			})
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
