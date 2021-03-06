import resolve from 'rollup-plugin-node-resolve';
import zResolve, { preConfig } from "@zrlps/rollup-plugin-resolve"
import replace from '@rollup/plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import sveltePreprocess from "svelte-preprocess"
import magicImporter from "node-sass-magic-importer"
// import { join } from "path"


let magicImpterOpts = {
	// Defines the path in which your node_modules directory is found.
	cwd: process.cwd(),
	// Define the package.json keys and in which order to search for them.
	packageKeys: [
		'sass',
		'scss',
		'style',
		'css',
		'main.sass',
		'main.scss',
		'main.style',
		'main.css',
		'main'
	],
	// You can set the special character for indicating a module resolution.
	packagePrefix: '@',
	// Disable console warnings.
	disableWarnings: false,
	// Disable importing files only once.
	disableImportOnce: false,
	// Add custom node filters.
	customFilters: undefined
}

const preprocess = sveltePreprocess({
	scss: {
		importer: [
			magicImporter(magicImpterOpts)
		]
	},
})
const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);
const dedupe = importee => importee === 'svelte' || importee.startsWith('svelte/');

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				dev,
				preprocess,
				hydratable: true,
				emitCss: true
			}),
			zResolve(preConfig.sapper),
			resolve({
				browser: true,
				dedupe
			}),
			commonjs(),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				runtimeHelpers: true,
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			!dev && terser({
				module: true
			})
		],

		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				preprocess,
				generate: 'ssr',
				dev
			}),
			zResolve(preConfig.sapper),
			resolve({
				dedupe
			}),
			commonjs()
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			zResolve(preConfig.sapper),
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			!dev && terser()
		],

		onwarn,
	}
};
