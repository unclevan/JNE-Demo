<script setup>
import {computed,ref} from 'vue';
import {adminNavigation} from '../admin-data.js';
import {iconMap} from './icons.js';
import {drawer,modal} from './overlays.js';
import {isAdminModule,metaFor,moduleFromUrl,pageRenderers} from './registry.js';

const props=defineProps({navigate:Function,toast:Function});
const tabsStorageKey='jne-admin-tabs-v1';
const moduleKey=ref(moduleFromUrl());
const compactSidebar=ref(false);
const collapsedGroups=ref([]);
const activeDrawer=ref(null);
const activeModal=ref(null);

function savedTabs(){
  try{
    const value=JSON.parse(sessionStorage.getItem(tabsStorageKey)||'[]');
    return Array.isArray(value)?value.filter(isAdminModule):[];
  }catch{return [];}
}

const tabs=ref([...new Set(['workbench',...savedTabs(),moduleKey.value])]);
const meta=computed(()=>metaFor(moduleKey.value));
const drawerHtml=computed(()=>drawer(activeDrawer.value,meta.value,moduleKey.value));
const modalHtml=computed(()=>modal(activeModal.value,meta.value));

function rememberTabs(){sessionStorage.setItem(tabsStorageKey,JSON.stringify(tabs.value));}
function addTab(key){
  if(!tabs.value.includes(key)) tabs.value.push(key);
  rememberTabs();
}
function navigateModule(key,{replace=false}={}){
  if(!isAdminModule(key)) return;
  if(key===moduleKey.value&&!replace) return;
  moduleKey.value=key;
  activeDrawer.value=null;
  activeModal.value=null;
  addTab(key);
  const url=new URL(location.href);
  url.searchParams.set('page','admin');
  url.searchParams.set('module',key);
  history[replace?'replaceState':'pushState']({},'',url);
}
function syncRoute(){
  moduleKey.value=moduleFromUrl();
  activeDrawer.value=null;
  activeModal.value=null;
  addTab(moduleKey.value);
}
defineExpose({syncRoute});

function closeTab(key){
  if(key==='workbench') return;
  const index=tabs.value.indexOf(key);
  tabs.value=tabs.value.filter(item=>item!==key);
  rememberTabs();
  if(moduleKey.value===key) navigateModule(tabs.value[Math.max(0,index-1)]||'workbench');
}
function toggleGroup(label){
  collapsedGroups.value=collapsedGroups.value.includes(label)
    ?collapsedGroups.value.filter(item=>item!==label)
    :[...collapsedGroups.value,label];
}
function notify(message){props.toast?.(message);}
function onAction(event){
  const target=event.target;
  if(!(target instanceof Element)) return;
  const page=target.closest('[data-admin-page]');
  if(page){navigateModule(page.dataset.adminPage);return;}
  const el=target.closest('[data-admin-action]');
  if(!el) return;
  const action=el.dataset.adminAction;
  if(action==='collapse') compactSidebar.value=!compactSidebar.value;
  if(action==='refresh'||action==='query') notify('页面数据已刷新（本地模拟数据）');
  if(action==='reset'){
    const currentPage=document.querySelector(`.admin-tab-page[data-module="${moduleKey.value}"]`);
    currentPage?.querySelectorAll('.admin-filter input').forEach(input=>input.value='');
    currentPage?.querySelectorAll('.admin-filter select').forEach(select=>select.selectedIndex=0);
    notify('筛选条件已重置');
  }
  if(action==='primary') activeModal.value={title:meta.value.primary||'提交业务操作'};
  if(action==='row') activeDrawer.value={row:Number(el.dataset.row||0),label:el.dataset.label||el.textContent.trim()};
  if(action==='close-drawer') activeDrawer.value=null;
  if(action==='close-modal'&&(target===el||el.tagName==='BUTTON')) activeModal.value=null;
  if(action==='modal-confirm'){activeModal.value=null;notify('已创建演示记录，正式系统将进入对应审批流程');}
  if(action==='drawer-confirm'){activeDrawer.value=null;notify('操作已记录（演示交互）');}
  if(action==='export') notify('导出任务已创建，可在“报告中心 → 导出任务”查看');
  if(action==='columns') notify('列设置已打开（Demo 保留默认列）');
  if(action==='confirm-field'){
    el.closest('.review-fields')?.classList.add('field-confirmed');
    notify('字段已确认，修改记录将写入分析版本');
  }
  if(action==='cockpit') props.navigate?.('cockpit');
}
</script>

<template>
  <main class="admin-shell" :class="{'sidebar-compact':compactSidebar}" @click="onAction">
    <aside class="admin-sidebar" :class="{compact:compactSidebar}">
      <div class="admin-logo"><span>JNE</span><div><b>江南 e AI 能力中心</b><small>运营管理后台</small></div></div>
      <nav class="admin-nav" aria-label="后台业务菜单">
        <section v-for="group in adminNavigation" :key="group.label">
          <h3>
            <button type="button" class="admin-group-toggle" :aria-expanded="!collapsedGroups.includes(group.label)" :aria-label="`${group.label}菜单${collapsedGroups.includes(group.label)?'展开':'收起'}`" @click.stop="toggleGroup(group.label)">
              <i>{{group.icon}}</i><span>{{group.label}}</span><em>{{collapsedGroups.includes(group.label)?'⌄':'⌃'}}</em>
            </button>
          </h3>
          <div v-show="!collapsedGroups.includes(group.label)" class="admin-nav-items">
            <button v-for="[key,label] in group.items" :key="key" type="button" :data-admin-page="key" :class="{active:moduleKey===key}" :title="label">
              <i>{{iconMap[key]||'·'}}</i><span>{{label}}</span><em v-if="key==='field-review'">38</em><em v-if="key==='risk-tasks'" class="danger">12</em>
            </button>
          </div>
        </section>
      </nav>
      <div class="admin-sidebar-foot"><div class="admin-env">演示环境 · 本地模拟数据</div><button type="button" data-admin-action="collapse"><i>{{compactSidebar?'⇥':'⇤'}}</i><span>{{compactSidebar?'展开菜单':'收起菜单'}}</span></button></div>
    </aside>

    <section class="admin-main">
      <header class="admin-topbar">
        <div class="admin-crumb"><button type="button" data-admin-action="collapse" :aria-label="compactSidebar?'展开侧栏':'收起侧栏'">☰</button><span>{{meta.section}}</span><i>›</i><b>{{meta.title}}</b></div>
        <div class="admin-global-search"><i>⌕</i><input placeholder="搜索项目、标的、主体、任务或会话"/><kbd>⌘ K</kbd></div>
        <div class="admin-top-actions">
          <button type="button" class="admin-cockpit-link" title="数据驾驶舱" @click.stop="navigateModule('cockpit-entry')">▦ <span>数据驾驶舱</span></button>
          <button type="button" title="帮助中心">?</button><button type="button" title="待办通知">♢<em>6</em></button>
          <button type="button" class="admin-user"><span>张</span><p><b>张敏</b><small>业务管理员</small></p><i>⌄</i></button>
        </div>
      </header>

      <div class="admin-tabs" role="tablist" aria-label="已打开的后台页面">
        <div v-for="key in tabs" :key="key" class="admin-tab" :class="{active:moduleKey===key}">
          <button type="button" role="tab" :aria-selected="moduleKey===key" :title="metaFor(key).title" @click.stop="navigateModule(key)">{{metaFor(key).title}}</button>
          <button v-if="key!=='workbench'" type="button" class="admin-tab-close" :aria-label="`关闭${metaFor(key).title}标签`" @click.stop="closeTab(key)">×</button>
        </div>
      </div>
      <div class="admin-content">
        <div v-for="key in tabs" :key="key" v-show="moduleKey===key" class="admin-tab-page" :data-module="key" v-html="pageRenderers[key](metaFor(key))"></div>
        <footer class="admin-page-foot">江南 e AI 能力中心后台原型 · 页面数据均为本地模拟数据 · AI 结论需人工复核</footer>
      </div>
    </section>
    <div v-html="drawerHtml"></div><div v-html="modalHtml"></div>
  </main>
</template>
