<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <router-link to="/">活动中心</router-link>
        </el-menu-item>
        <el-menu-item index="2">待开发</el-menu-item>
        <el-menu-item index="3">待开发</el-menu-item>
        <el-menu-item index="4">待开发</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1', '3']" router>
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>活动首页</template
            >
            <el-menu-item index="/admin/list"> 活动列表 </el-menu-item>
            <el-menu-item index="1-2"> 抽奖设置 </el-menu-item>
            <el-menu-item index="1-3">生成活动</el-menu-item>
          </el-submenu>

          <el-menu-item index="2">
            <template slot="title"
              ><i class="el-icon-menu"></i>用户管理</template
            >
          </el-menu-item>
          <el-menu-item index="3">
            <template slot="title"
              ><i class="el-icon-setting"></i>更多设置</template
            >
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "tabBar",
  data() {
    return {
      activeIndex: "1",
    };
  },
};
</script>

<style scoped>
.el-header {
  padding: 0;
  line-height: 60px;
}

.el-aside {
  padding: 0;
  color: #333;
}
</style>