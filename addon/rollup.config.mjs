import { babel } from '@rollup/plugin-babel';
import { Addon } from '@embroider/addon-dev/rollup';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  output: addon.output(),

  plugins: [
    // Everything under src is importable, as it was before the v2 conversion
    // (including `ember-table/test-support/pages/-private/*`).
    addon.publicEntrypoints(['**/*.js']),

    // The components consumers invoke by name in templates. The private
    // components are referenced explicitly (`<this.RowWrapper />`), so they do
    // not need to be reexported into the app tree.
    addon.appReexports(['components/*.js', 'components/ember-th/*.js']),

    addon.dependencies(),

    // Only template colocation and template precompilation hooks; no presets.
    // See babel.config.json.
    babel({
      extensions: ['.js'],
      babelHelpers: 'bundled',
    }),

    // Integrate colocated .hbs templates as JavaScript.
    addon.hbs(),

    // Keep `import './x.css'` in the published output so the consuming app's
    // bundler handles the CSS.
    addon.keepAssets(['**/*.css']),

    addon.clean(),
  ],
};
