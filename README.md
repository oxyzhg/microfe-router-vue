# Microfe VueRouter

> 基于 single-spa 微前端路由插件，目前处于设计阶段

## Problem

当前，基于 [single-spa](https://single-spa.js.org) 微前端模式刚刚起步，微前端生态系统尚未完善，缺少全局的路由分发机制，导致主工程与应用模块之间的关联程度过多，违背了前端微服务化的设计初衷。因此本插件将从前端路由出发，既要实现前端聚合方案，又减少各模块之间的相互依赖，实现全局路由分发的模式。

## Solution

- 动态注册应用模块的路由
- 全局分发视图路由

## Dependence

- vue-router
- single-spa
- single-spa-vue
- single-spa-sdk（to be published）

## Todos

- [ ] 在注册应用模块的过程中，同时注册模块路由
- [ ] 全局路由支持应用之间跳转，实现无痛刷新
- [ ] 支持 Vuex
