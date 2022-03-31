import Layout from './Layout.vue';
import NotFound from './NotFound.vue';

import './styles/vars.css'
import './styles/nav-bar.css'
import './styles/layout.css'
import './styles/code.css'
import './styles/demo.css'
import './styles/custom-blocks.css'
import './styles/sidebar-links.css'
import './styles/prism.css'
import './styles/utils.css'

const components = import.meta.globEager('./components/*.vue');

if (typeof document !== 'undefined') {
  document.documentElement.classList.toggle('dark', true)
}

export default {
  Layout,
  NotFound,
	enhanceApp ({ app }) {
		// register global components
		Object.keys(components).forEach(path => {
			const name = path.replace('./components/', '').replace(/\.vue$/, '');
			app.component(name, components[path].default);
		})
	}
}
