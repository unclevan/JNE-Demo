import {pageHeader,kpis,filterBar,genericPage,reasonCard} from '../components.js';
import {specialData} from '../../admin-data.js';


function rulePerformancePage(meta){
  return `${pageHeader(meta)}${kpis(meta.kpis)}${filterBar(meta.filters)}<section class="admin-analytics-grid"><article class="admin-card span2"><header><div><b>规则效果矩阵</b><small>确认率越低、命中越高的规则越需优化</small></div><button>查看说明 ?</button></header><div class="rule-performance">${specialData.rulePerformance.map(x=>`<div><label>${x[0]}</label><div class="dual"><i style="width:${x[1]}%"></i><em style="width:${x[2]}%"></em></div><b>${x[1]}%</b><small>误报 ${x[2]}% · 命中 ${x[3]}</small></div>`).join('')}</div></article>${reasonCard('规则状态',[['效果良好','138 条'],['观察中','18 条'],['待优化','6 条'],['已停用','12 条']])}${reasonCard('优化建议',[['资格歧义词库','补充行业表达'],['附件完整性','按资产类型拆分'],['价格一致性','增加免租期场景'],['行为模型','扩大人工标注样本']])}</section>`;
}

export const pages = {
  'risk-clues': genericPage,
  'risk-events': genericPage,
  'risk-tasks': genericPage,
  'rule-performance': rulePerformancePage
};
