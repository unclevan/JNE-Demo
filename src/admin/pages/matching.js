import {pageHeader,kpis,filterBar,genericPage,miniTrend} from '../components.js';
import {specialData} from '../../admin-data.js';


function conversionPage(meta){
  return `${pageHeader(meta)}${kpis(meta.kpis)}${filterBar(meta.filters)}<section class="admin-conversion-layout"><article class="admin-card conversion-funnel"><header><div><b>AI 撮合转化漏斗</b><small>当前筛选范围 · 多触点归因</small></div><button>查看口径 ?</button></header><div>${specialData.conversion.map((x,i)=>`<section style="width:${100-i*8}%"><span>${x[0]}</span><b>${x[1].toLocaleString()}</b><em>${x[2]}%</em></section>`).join('')}</div></article><article class="admin-card conversion-trend"><header><div><b>触达与转化趋势</b><small>近 12 周</small></div><span>触达　报名　竞买</span></header>${miniTrend()}</article><article class="admin-card conversion-list"><header><div><b>重点项目转化表现</b><small>按有效报名增量排序</small></div><button>查看全部 ›</button></header>${[['日月经编2号仓库','638','86','18','8.7%'],['沿街商业用房','1,286','168','26','11.8%'],['农业设施用地','1,806','124','16','9.4%'],['停车场经营权','326','42','8','7.2%']].map((x,i)=>`<div><i>${i+1}</i><p><b>${x[0]}</b><small>触达 ${x[1]} · 报名 ${x[2]} · 竞买 ${x[3]}</small></p><span>溢价率 <b>${x[4]}</b></span></div>`).join('')}</article></section>`;
}

export const pages = {
  'match-opportunities': genericPage,
  'match-tasks': genericPage,
  'campaigns': genericPage,
  'conversion': conversionPage
};
