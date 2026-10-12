import {pageHeader,kpis,filterBar,genericPage,reasonCard} from '../components.js';
import {specialData} from '../../admin-data.js';


function intentPage(meta){
  return `${pageHeader(meta)}${kpis(meta.kpis)}${filterBar(meta.filters)}<section class="admin-analytics-grid"><article class="admin-card span2"><header><div><b>咨询主题热度</b><small>主题量、解决率与趋势</small></div><span>近 30 天</span></header><div class="intent-bars">${specialData.intent.map((x,i)=>`<div><label><i>${i+1}</i>${x[0]}</label><div><span style="width:${x[2]}%"></span></div><b>${x[1].toLocaleString()}</b><em>解决率 ${88+i%3*2}%</em></div>`).join('')}</div></article>${reasonCard('入口分布',[['标的详情页','46.8%'],['平台首页','28.6%'],['政策法规页','14.2%'],['其他页面','10.4%']])}${reasonCard('新兴问题',[['装修期是否免租','86 次'],['联合体电子签章','62 次'],['竞价延时规则','58 次'],['成交后费用构成','42 次']])}</section>`;
}

export const pages = {
  'sessions': genericPage,
  'unresolved': genericPage,
  'feedback': genericPage,
  'intent': intentPage
};
