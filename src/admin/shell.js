import {adminNavigation} from '../admin-data.js';

export const iconMap={
  workbench:'⌂','parse-tasks':'◫','field-review':'✓','analysis-versions':'⑂','parse-quality':'⌁',
  'match-opportunities':'✦','match-tasks':'◎',campaigns:'↗',conversion:'⇄',sessions:'◌',unresolved:'?',feedback:'♡',intent:'⌕',
  'knowledge-docs':'▤','knowledge-entries':'▧',rules:'◇',faq:'Q','releases':'↑','risk-clues':'△','risk-events':'!',
  'risk-tasks':'✓','rule-performance':'⌁','asset-reports':'▥','operation-reports':'▦',exports:'⇩','cockpit-entry':'▦',
  'org-users':'♙',roles:'⌘',dictionaries:'≡','ai-config':'✦',datasources:'⌁',audit:'◷'
};

export function sidebar(activeAdminPage,compactSidebar){
  return `<aside class="admin-sidebar ${compactSidebar?'compact':''}">
    <div class="admin-logo"><span>JNE</span><div><b>江南 e AI 能力中心</b><small>运营管理后台</small></div></div>
    <nav class="admin-nav">${adminNavigation.map(group=>`<section><h3><i>${group.icon}</i><span>${group.label}</span></h3>${group.items.map(([key,label])=>`<button class="${activeAdminPage===key?'active':''}" data-admin-page="${key}" title="${label}"><i>${iconMap[key]||'·'}</i><span>${label}</span>${key==='field-review'?'<em>38</em>':key==='risk-tasks'?'<em class="danger">12</em>':''}</button>`).join('')}</section>`).join('')}</nav>
    <div class="admin-sidebar-foot"><div class="admin-env">演示环境 · 本地模拟数据</div><button data-admin-action="collapse"><i>⇤</i><span>收起菜单</span></button></div>
  </aside>`;
}

export function topbar(meta){
  return `<header class="admin-topbar"><div class="admin-crumb"><button data-admin-action="collapse">☰</button><span>${meta.section}</span><i>›</i><b>${meta.title}</b></div><div class="admin-global-search"><i>⌕</i><input placeholder="搜索项目、标的、主体、任务或会话"/><kbd>⌘ K</kbd></div><div class="admin-top-actions"><button title="帮助中心">?</button><button title="待办通知">♢<em>6</em></button><button class="admin-user"><span>张</span><p><b>张敏</b><small>业务管理员</small></p><i>⌄</i></button></div></header>`;
}
