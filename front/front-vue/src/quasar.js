import Vue from "vue";

import "./styles/quasar.sass";
import lang from "quasar/lang/ko-kr.js";
import "@quasar/extras/material-icons/material-icons.css";
import { Quasar, QEditor } from "quasar";

Vue.use(Quasar, {
  config: {},
  components: {
    QEditor
  },
  directives: {},
  plugins: {},
  lang: lang
});
