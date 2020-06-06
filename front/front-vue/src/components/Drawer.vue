<template>
  <div>
    <q-drawer :value="isDrawer" :width="500" overlay content-class="bg-white">
      <div class="row justify-between">
        <img
          :src="require('../assets/logo.png')"
          onclick="location.href ='/'"
          style="margin-top:20px;"
        />
        <q-btn
          color="primary"
          icon="cancel"
          class="col-3"
          style="border-radius:50px; margin-top:10px;"
          @click="changeIsDrawer"
        />
      </div>
      <q-scroll-area class="fit" style="margin-top:20px;">
        <q-list>
          <q-separator spaced inset />
          <template v-for="(menuList, Aindex) in menus">
            <q-item
              v-for="(menu, Bindex) in menuList.menu"
              :key="`menu-${Aindex}-${Bindex}-${menu.name}`"
              clickable
              v-ripple
              :to="menu.link"
            >
              <q-item-section>
                <q-item-label>{{ menu.name }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator spaced inset :key="`menuList-${Aindex}`" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      menus: [
        {
          menu: [
            { name: "링피트", link: "/fitness" },
            { name: " - 가이드", link: "/fitness/guide" },
            { name: " - 자유게시판", link: "/fitness/community" }
          ]
        },
        {
          menu: [
            { name: "마피아", link: "/" },
            { name: " - 가이드", link: "/" },
            { name: " - 자유게시판", link: "/" }
          ]
        },
        {
          menu: [
            { name: "고객 센터", link: "/" },
            { name: "질문게시판 ", link: "/" }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState("header", ["isDrawer"])
  },
  methods: {
    ...mapActions("header", ["changeIsDrawer"])
  }
};
</script>

<style></style>
