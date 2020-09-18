# Easy.Front-End使用介绍

- 提供后台管理系统常用功能
- 自动生成数据列表页，表单页，后端新建模型即可拥有对应页面
- 后端采用asp.net core api
- 基于element-ui，改造自https://github.com/PanJiaChen/vue-element-admin/
- [ ] jsx写法，方便调试

api项目位于[Easy.Admin](https://github.com/xxred/Easy.Admin)

## 前言

- 前端采用[vue](https://cn.vuejs.org/)框架，ui 使用[element](https://element.eleme.cn/#/zh-CN)，框架参考[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin/)。
- 本项目删除了`vue-element-admin`中的很多组件（本应基于[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)，再慢慢添加功能），只保留用到的组件。在此基础添加了一些功能，菜单有后端提供，并基于权限自动过滤，提供所有页面的默认模板，可按开发需要替换任意模块。换句话说，新建项目，使用本项目，并做合适配置，不用写任何页面即可拥有所有 api 对应的操作页面，如果哪个页面不合心意，换！
- 没错，这主要是为了后端开发人员方便，适合公司内部系统或者方便个人工作的小系统，对界面要求不高，而且提供定制化功能。绝对能让你做到快速完成，再根据意愿完善，将精力集中在业务，体现项目的价值。代码产生价值，才是最大的动力。
- 注意：> 本项目是基于各位大佬们开源的框架组件完成的，新增的功能可以说仅有动态路由加载、默认页面模板（可覆盖）。希望可以给大家提供一个参考，觉得好用的话 copy 过去用，自己搭建框架吸收其它框架精华而不是直接基于本项目开发，这是本项目建议食用方式

## 准备

- 为了照顾基础差的同学，这里就不说什么`您必须先点亮某某技能点`或者`假设您已具备某某技术基础`，而是手把手教你搭建环境，并列出需要学习的所有技术栈。
- 首先你得具备 HTML、CSS 和 JavaScript 的相应知识（打脸）。
  - 接着是[vue](https://cn.vuejs.org/v2/guide/index.html)，得了解它的基本原理和工作方式，后面的框架均基于此框架。类似于渲染一个字符串模板，只不过在 vue 中，数据和视图已经联动，数据修改会触发视图更新。
  - [element](https://element.eleme.cn/#/zh-CN/component/quickstart是)快速上手，element 是在 vue 的基础上进行封装和美化，类似于很多基于 jQuery 的组件，只不过它依赖的是 vue。也可以看成 bootstrap，可理解成 bootstrap 的基础上使用 vue，再将视图和数据进行关联，只不过 element 的样式是另一种风格。
  - [vue-element-admin](https://panjiachen.github.io/vue-element-admin)是后台前端解决方案，它基于 vue 和 element-ui 实现。将 element-ui 中多个组件组合起来构成完整的后台管理解决方案，其中用到了下列组件：
  - [vuex](https://vuex.vuejs.org/zh-cn/)，状态管理，管理多个页面之间的公用数据，比如用户信息等。
  - [vue-router](https://router.vuejs.org/zh-cn/)，路由系统，因为整个项目就是一个单页应用，不同页面切换也需要管理和记录。属于官方出品，与 Vue.js 的核心深度集成。
  - [axios](https://github.com/axios/axios)，用于浏览器和 node.js 的基于 Promise 的 HTTP 客户端，类似于 jQuery ajax
  - [vue-cli](https://github.com/vuejs/vue-cli)，3.x 版本起自带基础[webpack](https://webpack.docschina.org/)配置，基本够用了，告别了复杂打包配置，对此我只想说，干得漂亮！并且自带 ui 管理，`vue ui`开启新方式

## 环境搭建

- [git 下载地址](https://npm.taobao.org/mirrors/git-for-windows/v2.24.1.windows.2/Git-2.24.1.2-64-bit.exe)、[nodejs v10.18.0 下载地址](https://nodejs.org/dist/v10.18.0/node-v10.18.0-x64.msi)
- 设置国内镜像源：

  ```bash
  npm config set registry http://registry.npm.taobao.org/
  ```

- 安装 yarn：

  ```bash
  npm i yarn -g
  ```

## 开发

- 克隆项目

```bash
git clone https://github.com/xxred/Easy.Front-End.git
```

- 还原包

```bash
# 进入项目目录
cd Easy.Front-End

# yarn
```

- 启动项目

```bash
yarn start
```

## 发布

```bash
yarn build
```

## 添加/覆盖页面

- 覆盖一个页面，为什么是直接覆盖一个，因为有默认模板，只要检测到项目指定目录没有页面，即采用默认页面。例如，覆盖用户部分的table 页（数据列表）和 form 页（表单），直接新建`/src/views/User/index.vue`、`/src/views/User/form.vue`
- 后台存储每个表的信息，因此 table 页（数据列表）和 form 页（表单）的字段都来自后端，遍历展示。每个表对应一个 table 页和一个 form 页，table 页的关键是 tableName 表名，根据表名请求后端拿到所有字段（如果有需要可以自建表维护字段信息并添加权限过滤字段啥的），form 页关键除了 tableName 还有 id，如果是编辑的话可在路由获取 id
- 以下是实例：

```html
<!--菜单Menu tableName页-->
<template>
  <table-base ref="tableBase" :table-name="tableName">
    <template slot="tableColumns">
      <el-table-column label="编号" type="index" />
      <el-table-column label="菜单名" prop="Name" />
      <el-table-column label="显示名" prop="DisplayName" />
      <el-table-column label="链接" prop="Url" />
      <el-table-column label="排序" prop="Sort" width="50" />
      <el-table-column label="权限子项" prop="Permission" />
    </template>
  </table-base>
</template>
<script>
  const tableName = 'Menu'
  export default {
    name: tableName,
    data() {
      return {
        tableName: tableName
      }
    }
  }
</script>

<!--角色Menu form页-->
<template>
  <div v-loading="dataLoading" class="detail">
    <h2 style="margin-left: 20px;">{{ textMap[type] }}</h2>
    <div class="con-box">
      <div class="add">
        <div class="form">
          <el-form
            ref="form"
            :model="temp"
            :rules="rules"
            label-width="116px"
            size="mini"
          >
            <div class="form-box">
              <el-form-item label="名称" prop="Name">
                <el-col :span="20">
                  <el-input v-model="temp.Name" />
                </el-col>
              </el-form-item>
              <el-form-item label="说明" prop="Remark">
                <el-col :span="20">
                  <el-input v-model="temp.Remark" />
                </el-col>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>

      <div class="foot-btn">
        <div
          style="position: fixed;margin:20px;float:right;bottom: 0px;right: 0px;z-index: 1;"
        >
          <el-button @click="returnIndex">取消</el-button>
          <el-button type="primary" @click="onSubmit('form')">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { createData, updateData, queryData } from 'src/api/base'

  export default {
    // name: 'index',
    data() {
      return {}
    },
    // 最关键的信息从路由获取
    computed: {
      id() {
        return this.$route.params.id
      },
      tableName() {
        return this.$route.params.tableName
      },
      type() {
        return this.$route.params.type
      },
      isAdd() {
        return this.type === 'Add'
      }
    }
  }
</script>
```

- 以上实例有删减，完全代码参考[这里](https://github.com/xxred/Easy.Front-End/tree/master/src/views)，注意文件夹名称即表名，`index.vue`即 table 页，`form.vue`即 form 页
- 如果不知道要修改的页面对应表名是什么，请看浏览器地址栏，路由规则(写法源于vue-router)是:table 页->`/${tableName}/index`、form 页->`/:tableName(${tableName})/:type(Edit|Add)/:id?`。
- 如果是全部页面完全替换，则覆盖`项目目录/src/views/layout/Layout.vue`即可，完全自定义 ui，只使用项目的非 ui 功能
