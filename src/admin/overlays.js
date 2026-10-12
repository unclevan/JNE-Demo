import {esc,renderValue} from './components.js';
import {iconMap} from './icons.js';

export function drawer(adminDrawer,meta,activeAdminPage){
  if(!adminDrawer) return '';
  const rows=meta.rows||[], row=rows[adminDrawer.row]||[];
  return `<div class="admin-overlay" data-admin-action="close-drawer"></div><aside class="admin-drawer"><header><div><span>${esc(meta.section||'')}</span><b>${esc(adminDrawer.label||'查看详情')}</b><small>${esc(meta.title)} · 演示数据</small></div><button data-admin-action="close-drawer">×</button></header><div class="admin-drawer-body"><section class="drawer-summary"><i>${iconMap[activeAdminPage]||'◇'}</i><div><b>${renderValue(row[1]||row[0]||meta.title)}</b><p>该页面为后台产品原型，展示正式系统建议承载的信息结构、状态与操作闭环。</p></div></section><h3>基础信息</h3><dl>${(meta.columns||[]).map((c,i)=>`<div><dt>${esc(c)}</dt><dd>${renderValue(row[i]||'暂未提供')}</dd></div>`).join('')}</dl><h3>处理记录</h3><div class="drawer-timeline"><div><i></i><p><b>系统创建记录</b><small>2026-10-12 09:18 · 自动同步</small></p></div><div><i></i><p><b>AI 完成辅助分析</b><small>2026-10-12 09:20 · 版本 V2.1</small></p></div><div><i></i><p><b>等待人工操作</b><small>当前节点 · ${esc(adminDrawer.label||'查看详情')}</small></p></div></div><aside>所有页面字段、状态和操作将在正式接口联调后替换为真实数据。</aside></div><footer><button data-admin-action="close-drawer">关闭</button><button class="primary" data-admin-action="drawer-confirm">确认操作</button></footer></aside>`;
}

export function modal(adminModal,meta){
  if(!adminModal) return '';
  return `<div class="admin-modal-backdrop" data-admin-action="close-modal"><section class="admin-modal" role="dialog" aria-modal="true"><header><div><b>${esc(adminModal.title)}</b><small>${esc(meta.title)} · 原型交互</small></div><button data-admin-action="close-modal">×</button></header><div><label>名称<input placeholder="请输入名称" value="${esc(meta.title)}-${new Date().getMonth()+1}月任务"/></label><label>负责人<select><option>张敏</option><option>赵倩</option><option>孙莉</option></select></label><label>优先级<select><option>普通</option><option>高</option><option>紧急</option></select></label><label class="wide">说明<textarea placeholder="请填写业务目标、适用范围或处理说明"></textarea></label><aside>正式系统中将根据当前页面显示对应业务表单、校验规则和审批流程。</aside></div><footer><button data-admin-action="close-modal">取消</button><button class="primary" data-admin-action="modal-confirm">确认创建</button></footer></section></div>`;
}
