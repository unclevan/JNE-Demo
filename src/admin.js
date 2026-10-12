import {adminPages} from './admin-data.js';
import {sidebar,topbar} from './admin/shell.js';
import {drawer,modal} from './admin/overlays.js';
import {pages as workbenchPages} from './admin/pages/workbench.js';
import {pages as assetPages} from './admin/pages/asset.js';
import {pages as matchingPages} from './admin/pages/matching.js';
import {pages as consultationPages} from './admin/pages/consultation.js';
import {pages as knowledgePages} from './admin/pages/knowledge.js';
import {pages as riskPages} from './admin/pages/risk.js';
import {pages as reportPages} from './admin/pages/reports.js';
import {pages as systemPages} from './admin/pages/system.js';

const pageRenderers={...workbenchPages,...assetPages,...matchingPages,...consultationPages,...knowledgePages,...riskPages,...reportPages,...systemPages};
const getModule=()=>{
  const key=new URLSearchParams(location.search).get('module')||'workbench';
  return Object.hasOwn(pageRenderers,key)?key:'workbench';
};
let activeAdminPage=getModule();
let adminDrawer=null;
let adminModal=null;
let compactSidebar=false;

function currentMeta(){
  if(activeAdminPage==='workbench') return {title:'首页工作台',description:'汇总本人待办、今日运行情况和 AI 服务状态。',section:'运营工作台'};
  if(activeAdminPage==='cockpit-entry') return {title:'数据驾驶舱',description:'进入全域交易数据驾驶舱，查看交易、资产、主体、风险和 AI 成效。',section:'数据驾驶舱'};
  return adminPages[activeAdminPage]||adminPages['parse-tasks'];
}

export function renderAdmin(){
  const meta=currentMeta();
  const content=pageRenderers[activeAdminPage](meta);
  return `<main class="admin-shell ${compactSidebar?'sidebar-compact':''}">${sidebar(activeAdminPage,compactSidebar)}<section class="admin-main">${topbar(meta)}<div class="admin-content">${content}<footer class="admin-page-foot">江南 e AI 能力中心后台原型 · 页面数据均为本地模拟数据 · AI 结论需人工复核</footer></div></section>${drawer(adminDrawer,meta,activeAdminPage)}${modal(adminModal,meta)}</main>`;
}

export function syncAdminRoute(){
  activeAdminPage=getModule();
  adminDrawer=null;
  adminModal=null;
}

export function bindAdmin({rerender,navigate,toast}){
  document.querySelectorAll('[data-admin-page]').forEach(el=>el.onclick=()=>{
    const key=el.dataset.adminPage;
    if(!Object.hasOwn(pageRenderers,key)) return;
    activeAdminPage=key;adminDrawer=null;adminModal=null;
    const url=new URL(location.href);url.searchParams.set('page','admin');url.searchParams.set('module',key);
    history.pushState({},'',url);rerender();
  });
  document.querySelectorAll('[data-admin-action]').forEach(el=>el.onclick=e=>{
    const action=el.dataset.adminAction;
    if(action==='collapse'){compactSidebar=!compactSidebar;rerender();}
    if(action==='refresh'||action==='query'){toast('页面数据已刷新（本地模拟数据）');}
    if(action==='reset'){document.querySelectorAll('.admin-filter input').forEach(x=>x.value='');toast('筛选条件已重置');}
    if(action==='primary'){adminModal={title:currentMeta().primary||'提交业务操作'};rerender();}
    if(action==='row'){adminDrawer={row:Number(el.dataset.row||0),label:el.dataset.label||el.textContent.trim()};rerender();}
    if(action==='close-drawer'){adminDrawer=null;rerender();}
    if(action==='close-modal'){if(e.target===el||el.tagName==='BUTTON'){adminModal=null;rerender();}}
    if(action==='modal-confirm'){adminModal=null;rerender();toast('已创建演示记录，正式系统将进入对应审批流程');}
    if(action==='drawer-confirm'){adminDrawer=null;rerender();toast('操作已记录（演示交互）');}
    if(action==='export'){toast('导出任务已创建，可在“报告中心 → 导出任务”查看');}
    if(action==='columns'){toast('列设置已打开（Demo 保留默认列）');}
    if(action==='confirm-field'){el.closest('.review-fields')?.classList.add('field-confirmed');toast('字段已确认，修改记录将写入分析版本');}
    if(action==='cockpit'){navigate('cockpit');}
  });
}
