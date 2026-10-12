import {pageHeader,kpis,miniTrend} from '../components.js';
import {workbenchData} from '../../admin-data.js';


function workbench(meta){
  const d=workbenchData;
  return `${pageHeader(meta)}${kpis(d.kpis)}<section class="admin-workbench-grid">
    <article class="admin-card admin-todo"><header><div><b>我的待办</b><small>按优先级和截止时间排序</small></div><button data-admin-page="field-review">查看全部 ›</button></header><div>${d.todos.map((x,i)=>`<button data-admin-page="${x[3]}"><i class="${x[4]==='高'?'danger':x[4]==='中'?'warn':'safe'}">${x[4]}</i><p><b>${x[0]}</b><span>${x[1]}</span></p><time>${x[2]}</time><em>›</em></button>`).join('')}</div></article>
    <article class="admin-card admin-ai-summary"><header><div><b>今日 AI 运营摘要</b><small>基于任务、会话、撮合和风险数据生成</small></div><span>✦ AI 生成 · 09:30</span></header><div class="admin-summary-lead"><i>✦</i><p><b>今日平台运行平稳，建议优先处理 3 项高价值任务</b><span>海昌街道仓库报名热度连续三日增长，但有效竞买人仍低于同类项目；建议审核 638 人定向触达计划。保证金知识规则更新待审批，影响 186 条近期咨询。</span></p></div><ul><li><i></i>商业用房咨询量较昨日增长 <b>16.8%</b></li><li><i></i>资产解析核心字段准确率达到 <b>97.4%</b></li><li><i></i>4 条高风险事件仍在处置，最早剩余 <b>48 分钟</b></li></ul><button data-admin-page="match-opportunities">查看 AI 机会建议</button></article>
    <article class="admin-card admin-trend-card"><header><div><b>近 7 日业务趋势</b><small>解析任务 · AI 会话 · 有效触达</small></div><div class="admin-legend"><span><i></i>解析</span><span><i></i>会话</span><span><i></i>触达</span></div></header>${miniTrend()}</article>
    <article class="admin-card admin-service"><header><div><b>服务与数据状态</b><small>最近检查时间 09:32</small></div><button data-admin-page="datasources">查看监控 ›</button></header>${d.services.map((x,i)=>`<div><i class="${x[1]==='正常'?'ok':'warn'}"></i><p><b>${x[0]}</b><small>${x[2]}</small></p><span>${x[1]}</span></div>`).join('')}</article>
    <article class="admin-card admin-quick"><header><b>快捷操作</b></header><div>${[['field-review','✓','字段复核'],['match-tasks','◎','新建撮合任务'],['knowledge-docs','⇧','上传知识'],['risk-events','△','风险事件'],['operation-reports','▥','生成报告'],['cockpit-entry','▦','数据驾驶舱']].map(x=>`<button data-admin-page="${x[0]}"><i>${x[1]}</i><span>${x[2]}</span></button>`).join('')}</div></article>
  </section>`;
}

function cockpitEntry(meta){
  return `${pageHeader(meta)}<section class="admin-cockpit-entry"><div class="cockpit-preview"><div class="preview-top"><span>JNE</span><b>江南 e 要素交易数据驾驶舱</b><i>交易总览　交易效能　资产供给　市场主体　风险感知　AI 洞察</i></div><div class="preview-kpis">${[['累计挂牌','12,846'],['综合溢价率','8.7%'],['AI有效触达','18,426'],['风险预警','36']].map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b><i></i></div>`).join('')}</div><div class="preview-panels"><section><i></i><i></i><i></i></section><section><div></div><div></div><div></div><div></div></section><section><i></i><i></i><i></i></section></div></div><div class="cockpit-entry-copy"><span>内部管理页面</span><h2>全域交易数据驾驶舱</h2><p>汇总交易总览、交易效能、资产供给、市场主体、风险感知与 AI 洞察六大主题。驾驶舱采用独立全屏布局，将在新视图中打开。</p><ul><li>统一指标口径和数据更新时间</li><li>支持区域、类型与时间分析</li><li>重点呈现 AI 触达、竞买人数与溢价变化</li><li>风险和 AI 洞察可回到后台闭环处理</li></ul><button class="primary" data-admin-action="cockpit">进入数据驾驶舱　→</button></div></section>`;
}

export const pages = {
  'workbench': workbench,
  'cockpit-entry': cockpitEntry
};
