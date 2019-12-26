import Vue from "vue";

export default component => {
  return Vue.extend({
    created() {
      //禁止滚动
      const bodyEl = document.body;
      const top = window.scrollY;
      bodyEl.style.position = "fixed";
      bodyEl.style.top = -top + "px";
      bodyEl.style.left = 0;
      bodyEl.style.right = 0;

      document.body.append(this.$mount().$el);
    },
    data() {
      return {};
    },
    render(h) {
      return h("div", { class: "w_dialog" }, [
        h("div", { class: "w_dialog-mask" }, [
          h("div", { class: "w_dialog-component" }, [
            h(component, {
              on: this.$listeners,
              attrs: this.$attrs,
              props: { ...this.$props, ...this.$options.propsData }
            })
          ])
        ])
      ]);
    },
    props: component.$props,
    methods: {
      closeHandler() {
        const bodyEl = document.body;
        let top = Math.abs(parseInt(bodyEl.style.top));
        bodyEl.style.position = "";
        bodyEl.style.top = "";
        bodyEl.style.left = "";
        bodyEl.style.right = "";
        this.$el.remove();
        this.$destroy();
        window.scrollTo(0, top);
      }
    }
  });
};
