export const esc=(s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isBadge=v=>v&&typeof v==='object'&&'text' in v;
export const renderValue=v=>isBadge(v)?`<span class="admin-badge ${v.tone||'blue'}">${esc(v.text)}</span>`:esc(v);

export function kpis(items=[]){
  return `<section class="admin-kpis">${items.map((x,i)=>`<article><div><small>${esc(x[0])}</small><b>${esc(x[1])}</b><p class="${x[3]||''}">${esc(x[2]||'')}</p></div><i>${['↗','◫','◎','◇'][i%4]}</i></article>`).join('')}</section>`;
}

export function pageHeader(meta){
  return `<div class="admin-page-head"><div><span>${esc(meta.section||'')}</span><h1>${esc(meta.title)}</h1><p>${esc(meta.description)}</p></div><div class="admin-page-actions"><button class="ghost" data-admin-action="refresh">↻ 刷新</button>${meta.primary?`<button class="primary" data-admin-action="primary">＋ ${esc(meta.primary)}</button>`:''}</div></div>`;
}

export function filterBar(filters=[]){
  return `<section class="admin-filter"><div class="admin-filter-fields">${filters.map((name,i)=>`<label><span>${esc(name)}</span>${i===0?`<input placeholder="请输入${esc(name)}"/>`:`<select><option>全部</option><option>${name.includes('状态')?'待处理':'近 30 天'}</option><option>${name.includes('状态')?'已完成':'本年度'}</option></select>`}</label>`).join('')}</div><div class="admin-filter-actions"><button data-admin-action="reset">重置</button><button class="primary" data-admin-action="query">查询</button></div></section>`;
}

export function table(meta){
  return `<section class="admin-card admin-table-card"><header><div><b>${esc(meta.title)}清单</b><small>共 ${Math.max(128,meta.rows.length*32).toLocaleString()} 条演示数据</small></div><div><button data-admin-action="columns">列设置</button><button data-admin-action="export">⇩ 导出</button></div></header><div class="admin-table-wrap"><table><thead><tr><th><input type="checkbox" aria-label="全选"/></th>${meta.columns.map(x=>`<th>${esc(x)}</th>`).join('')}<th>操作</th></tr></thead><tbody>${meta.rows.map((row,ri)=>`<tr data-admin-row="${ri}"><td><input type="checkbox" aria-label="选择第${ri+1}行"/></td>${row.map((cell,ci)=>`<td class="${ci===0?'strong':''}">${renderValue(cell)}</td>`).join('')}<td><div class="admin-row-actions">${(meta.actions||['查看']).slice(0,3).map((a,ai)=>`<button data-admin-action="row" data-row="${ri}" data-label="${esc(a)}">${esc(a)}</button>`).join('')}</div></td></tr>`).join('')}</tbody></table></div><footer><span>已选择 0 项</span><div class="admin-pagination"><button>‹</button><b>1</b><button>2</button><button>3</button><i>…</i><button>26</button><button>›</button></div><select><option>20 条/页</option><option>50 条/页</option></select></footer></section>`;
}

export function miniTrend(){
  const a=[38,52,46,66,74,62,86],b=[54,68,72,84,78,94,100],c=[28,36,42,48,66,72,88];
  return `<div class="admin-mini-chart"><div class="chart-grid"></div>${[a,b,c].map((s,si)=>`<svg viewBox="0 0 700 180" preserveAspectRatio="none"><polyline points="${s.map((v,i)=>`${i*116+2},${170-v*1.35}`).join(' ')}" fill="none" stroke="${['#2378f0','#23b6a5','#8a66e8'][si]}" stroke-width="3"/></svg>`).join('')}<div class="admin-chart-labels">${['周一','周二','周三','周四','周五','周六','今日'].map(x=>`<span>${x}</span>`).join('')}</div></div>`;
}

export function reasonCard(title,items){
  return `<article class="admin-card reason-card"><header><b>${title}</b><button>⋯</button></header>${items.map((x,i)=>`<div><i>${i+1}</i><span>${x[0]}</span><b>${x[1]}</b></div>`).join('')}</article>`;
}

export function genericPage(meta){
  return `${pageHeader(meta)}${kpis(meta.kpis)}${filterBar(meta.filters)}${table(meta)}`;
}
