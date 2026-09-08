import './style.css';
import './cockpit.css';
import './cockpit-layout.css';
import * as echarts from 'echarts/core';
import { BarChart, EffectScatterChart, FunnelChart, GaugeChart, HeatmapChart, LineChart, PieChart, RadarChart, ScatterChart, TreemapChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { asset, listings, quickHome, quickDetail, cockpitData } from './data.js';

echarts.use([BarChart,EffectScatterChart,FunnelChart,GaugeChart,HeatmapChart,LineChart,PieChart,RadarChart,ScatterChart,TreemapChart,GridComponent,LegendComponent,TooltipComponent,VisualMapComponent,CanvasRenderer]);

const app = document.querySelector('#app');
const params = new URLSearchParams(location.search);
let page = params.get('page') === 'detail' ? 'detail' : params.get('page') === 'cockpit' ? 'cockpit' : 'home';
let chatOpen = false, analysisOpen = false, activeTab = 'portrait', activeLayer = '人口热力', dashTab = 'overview';
const esc = (s='') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const chart = (type, className='') => `<div class="echart ${className}" data-chart="${type}" role="img" aria-label="${type}演示数据图表"></div>`;

function header(){ return `<header class="top"><div class="topbar"><div class="brand" data-action="home"><span class="brand-mark">江南<span>e</span></span><span class="brand-sub">要素交易平台</span></div><div class="search"><span>⌕</span><input placeholder="请输入项目名称、标的名称或关键词"/><button>搜索</button></div><div class="account"><span>♙ 登录</span><i></i><span>注册</span><span class="help">♧ 服务热线 0573-8729****</span></div></div><nav><span class="${page==='home'?'active':''}" data-action="home">首页</span><span>农村产权</span><span>国有产权</span><span>社有资产</span><span>招商专区</span><span>交易服务</span><span>政策法规</span></nav></header>` }
function footer(){return `<footer><div class="footer-in"><div class="foot-brand">江南<span>e</span> 要素交易平台</div><div>关于我们　|　联系我们　|　网站声明　|　帮助中心</div><div class="foot-code">浙ICP备演示号　 公共资源交易服务平台</div></div></footer>`}
function banner(){return `<section class="banner"><div class="banner-copy"><small>浙江江南要素交易中心</small><h1>让每一份要素<br/><em>找到更好的归宿</em></h1><p>公开 · 公平 · 公正　　数字化赋能要素流转</p><button class="banner-btn" data-action="asset">浏览优质标的　→</button></div><div class="banner-art"><div class="sun"></div><div class="mountain m1"></div><div class="mountain m2"></div><div class="water"></div><div class="bridge">╱╲╱╲╱╲</div></div></section>`}
function listingCard(x){return `<article class="listing" data-action="${x.id==='asset'?'asset':'toast'}"><div class="thumb ${x.image}"><span>${x.tag}</span><b>${x.image==='warehouse'?'仓储空间':x.image==='shop'?'沿街商铺':'商业门面'}</b></div><div class="listing-body"><div class="muted">${x.type}　·　${x.days}</div><h3>${esc(x.title)}</h3><div class="listing-meta"><span>⌖ ${x.location}</span><span>▧ ${x.area}</span></div><div class="price"><small>起始价</small><strong>${x.price}</strong><button>查看详情　›</button></div></div></article>`}
function home(){return `${header()}<main class="home"><div class="notice"><span>♢</span> 江南e平台AI智能助手上线啦！试试用一句话找标的、查规则、看资产分析　 <b data-action="chat">立即体验 →</b></div>${banner()}<section class="category"><div class="section-title"><div><small>MARKET ZONE</small><h2>交易专区</h2></div><a>更多专区　›</a></div><div class="category-grid"><div><i>村</i><strong>农村产权</strong><small>盘活农村资源资产</small></div><div><i>国</i><strong>国有产权</strong><small>国有资产阳光交易</small></div><div><i>社</i><strong>社有资产</strong><small>社有资源规范流转</small></div><div><i>商</i><strong>招商专区</strong><small>项目招商精准匹配</small></div></div></section><section class="hot"><div class="section-title"><div><small>FEATURED ASSETS</small><h2>热门标的</h2></div><div class="tabs"><b>全部</b> 农村产权　 商业用房　 工业用房</div><a>全部标的　›</a></div><div class="listing-grid">${listings.map(listingCard).join('')}</div></section><div class="demo-note">本页面为AI赋能功能演示，部分分析数据为模拟数据。正式交易信息请以平台公告为准。</div></main>${footer()}${chat()}`}

function cockpitLegacy(){const d=cockpitData;const max=Math.max(...d.trend);const pts=d.trend.map((v,i)=>`${34+i*44},${142-(v/max)*96}`).join(' ');return `${header()}<main class="cockpit"><div class="cockpit-head"><div><div class="crumb">首页　›　数据驾驶舱</div><h1>要素交易数据驾驶舱</h1><p>全域交易运行态势 · 数据更新至 2026-08-21 09:30</p></div><div class="cockpit-filters"><button class="selected">近12个月</button><button>本年度</button><button>自定义</button><button class="refresh">↻ 刷新数据</button></div></div><section class="kpi-grid">${d.kpis.map((x,i)=>`<div class="kpi"><span class="kpi-icon">${['▣','￥','↗','♟'][i]}</span><div><small>${x[0]}</small><strong>${x[1]}</strong><em>${x[2]} <i>${x[3]}</i></em></div></div>`).join('')}</section><section class="cockpit-grid top-charts"><div class="cockpit-panel trend-panel"><div class="panel-title"><div><h2>交易规模趋势</h2><small>挂牌金额（亿元）</small></div><span class="legend-dot">● 成交额</span></div><div class="line-chart"><div class="y-labels"><span>2.0</span><span>1.5</span><span>1.0</span><span>0.5</span><span>0</span></div><div class="chart-area"><div class="grid-lines"></div><svg viewBox="0 0 520 160" preserveAspectRatio="none" aria-label="交易规模趋势折线图"><polyline points="${pts}" fill="none" stroke="#1578b9" stroke-width="3"/><polygon points="34,142 ${pts} 518,142" fill="#1578b9" opacity=".08"/>${d.trend.map((v,i)=>`<circle cx="${34+i*44}" cy="${142-(v/max)*96}" r="4" fill="#fff" stroke="#1578b9" stroke-width="2"/>`).join('')}</svg><div class="x-labels">${d.trendLabels.map(x=>`<span>${x}</span>`).join('')}</div></div></div></div><div class="cockpit-panel region-panel"><div class="panel-title"><div><h2>区域交易热度</h2><small>挂牌与成交综合指数</small></div><button class="more-link">查看区域分析 ›</button></div><div class="region-bars">${d.regions.map((x,i)=>`<div class="region-bar"><label>${x[0]}</label><div><i style="width:${x[1]}%"></i></div><b>${x[1]}</b></div>`).join('')}</div></div></section><section class="cockpit-grid mid-charts"><div class="cockpit-panel category-panel"><div class="panel-title"><div><h2>资产品类结构</h2><small>按成交额占比</small></div><span class="panel-unit">单位：%</span></div><div class="donut-wrap"><div class="donut"></div><div class="donut-center"><b>100%</b><small>成交结构</small></div><div class="category-legend">${d.categories.map(x=>`<span><i style="background:${x[2]}"></i>${x[0]} <b>${x[1]}%</b></span>`).join('')}</div></div></div><div class="cockpit-panel funnel-panel"><div class="panel-title"><div><h2>交易转化漏斗</h2><small>本年度累计</small></div><span class="panel-unit">挂牌 → 成交</span></div><div class="funnel">${d.funnel.map((x,i)=>`<div class="funnel-row"><b>${x[0]}</b><i style="width:${100-i*15}%">${x[1]}</i><span>${x[2]}</span></div>`).join('')}</div></div><div class="cockpit-panel alert-panel"><div class="panel-title"><div><h2>AI智能洞察</h2><small>规则与历史数据辅助分析</small></div><button class="more-link" data-action="toast">查看全部 ›</button></div><div class="alerts">${d.alerts.map(x=>`<div class="alert"><span class="alert-tag ${x[2]}">${x[2]}</span><p>${x[0]}<br/><b>${x[1]}</b></p><span>›</span></div>`).join('')}</div></div></section><section class="cockpit-panel recent-panel"><div class="panel-title"><div><h2>近期重点标的</h2><small>重点项目运行清单</small></div><button class="more-link">进入标的管理 ›</button></div><table><thead><tr><th>项目编号</th><th>标的名称</th><th>类型</th><th>区域</th><th>起始 / 成交价</th><th>状态</th></tr></thead><tbody>${d.recent.map(x=>`<tr><td>${x[0]}</td><td>${x[1]}</td><td>${x[2]}</td><td>${x[3]}</td><td>${x[4]}</td><td><span class="status ${x[5]==='已成交'?'done':''}">${x[5]}</span></td></tr>`).join('')}</tbody></table></section><div class="demo-note">驾驶舱为 AI 赋能功能演示，指标及图表数据均为本地模拟数据，不代表真实运营口径。</div></main>${footer()}${chat()}`}

function detail(){return `${header()}<main class="detail"><div class="crumb">首页　›　农村产权　›　${asset.projectName}</div><section class="detail-head"><div class="detail-photo warehouse"><span>工业用房</span><b>仓储空间</b></div><div class="detail-info"><div class="label">${asset.status}　|　${asset.type}</div><h1>${asset.name}</h1><p class="project">项目名称：${asset.projectName}</p><div class="price-line"><span>起始价</span><strong>${asset.unitPrice}</strong><span class="divider"></span><span>租赁期限</span><b>${asset.term}</b><span class="divider"></span><span>当前状态</span><b class="blue">已成交（演示）</b></div><div class="head-actions"><button class="primary" data-action="toast">报名竞价</button><button class="outline" data-action="toast">♡ 收藏</button><button class="ai-btn" data-action="analysis">✦ AI资产解析</button></div></div></section><div class="detail-layout"><section class="detail-main"><div class="panel"><div class="panel-title"><h2>标的基本信息</h2><span>数据来源：挂牌信息</span></div><div class="field-grid">${asset.fields.map(([k,v])=>`<div class="field"><label>${k}</label><b class="${v==='暂未提供'?'missing':''}">${esc(v)}</b></div>`).join('')}</div></div><div class="panel"><div class="panel-title"><h2>公告及附件</h2><span>共 2 个文件</span></div><div class="file-row">▤　交易公告.pdf <button data-action="toast">查看</button></div><div class="file-row">▤　资产照片及位置示意.zip <button data-action="toast">下载</button></div></div></section><aside class="side-card"><div class="side-title">交易进度</div><div class="timeline"><div class="done"><b>公告发布</b><small>挂牌信息已发布</small></div><div class="done"><b>报名阶段</b><small>资格审查以公告为准</small></div><div class="current"><b>网上竞价</b><small>演示状态：已成交</small></div><div><b>结果确认</b><small>等待交易机构确认</small></div></div><div class="side-tip">ⓘ 交易流程、资格条件及时间节点以正式公告和交易机构通知为准。</div></aside></div><div class="demo-note">本页面为AI赋能功能演示，部分分析数据为模拟数据。正式交易信息请以平台公告为准。</div></main>${footer()}${chat(true)}${analysis()}`}

function chat(detailMode=false){const qs=detailMode?quickDetail:quickHome;return `<div class="ai-fab ${chatOpen?'hidden':''}" data-action="chat"><span class="pulse"></span><div class="welcome">您好，我是江南e智能助手<br/><small>可以帮您找标的、查政策、了解报名及竞价流程</small></div><div class="fab-icon">✦</div><b>江南AI助手</b></div>${chatOpen?`<aside class="chat"><div class="chat-head"><div><span class="ai-dot">✦</span><b>江南AI助手</b><small>在线 · 本地演示模式</small></div><button data-action="chat">×</button></div><div class="messages"><div class="msg ai">您好！${detailMode?`您正在查看【${asset.name}】。该标的位于${asset.location}，建筑面积${asset.area}，租赁期限${asset.term}，起始价${asset.unitPrice}。我可以继续帮您分析报名条件、经营适配性、周边资源和成本情况。`:'我是您的平台接待助手，可以帮您找标的、查政策和了解交易流程。'}</div>${detailMode?'':`<div class="msg ai">您可以试试下面的问题：</div>`}<div class="quick">${qs.map(q=>`<button data-action="ask" data-q="${esc(q)}">${q}</button>`).join('')}</div><div id="chat-extra"></div></div><div class="chat-input"><input id="chat-input" placeholder="请输入您想了解的内容..."/><button data-action="send">↑</button></div></aside>`:''}`}

function analysis(){return analysisOpen?`<div class="drawer-backdrop" data-action="analysis"></div><aside class="analysis"><div class="analysis-head"><div><span class="ai-dot">✦</span><b>AI资产解析</b><small>基于挂牌信息 · 模拟分析</small></div><button data-action="analysis">×</button></div><div class="analysis-progress"><b>资产解析完成</b><span>✓ 基础信息　 ✓ 交易条件　 ✓ 历史参考　 ✓ 区位资源</span></div><div class="analysis-tabs">${[['portrait','资产画像'],['value','投资价值研判'],['cost','价格与成本分析'],['map','周边资源地图'],['risk','风险与材料提示']].map(([k,v])=>`<button class="${activeTab===k?'active':''}" data-tab="${k}">${v}</button>`).join('')}</div><div class="analysis-body">${analysisContent()}</div><div class="analysis-foot"><button data-action="report">⇩ 导出AI解析报告</button><button class="primary" data-action="consult">✦ 咨询该标的</button></div></aside>`:''}
function analysisContent(){if(activeTab==='portrait')return `<div class="analysis-title"><h2>资产画像</h2><span class="tag green">已解析 18 / 26 字段</span></div><div class="score-row"><div><small>信息完整度</small><strong>69<span>%</span></strong></div><div><small>待人工确认项</small><strong class="orange">8<span>项</span></strong></div><div><small>AI解析状态</small><strong class="blue">可供参考</strong></div></div><div class="portrait-grid">${[['资产类型','工业用房'],['建筑面积','730㎡'],['用途建议','仓储 / 轻加工'],['租赁期限','3年'],['起始价格','70,080元/年'],['支付方式','暂未提供'],['竞买条件','以公告为准'],['优先权','暂未提供'],['关键节点','报名、竞价时间暂未提供']].map(x=>`<div><label>${x[0]}</label><b>${x[1]}</b></div>`).join('')}</div><div class="source">ⓘ 信息完整度仅表示当前演示字段解析情况，不代表项目风险等级。</div>`;if(activeTab==='value')return `<div class="analysis-title"><h2>投资价值研判</h2><span class="tag blue">AI研判 · 参考建议</span></div><div class="radar">${chart('assetRadar','analysis-echart')}<div class="radar-list"><span>区位便利度 <b>82</b></span><span>产业匹配度 <b>88</b></span><span>客群基础 <b>72</b></span><span>租金竞争力 <b>86</b></span><span>经营灵活性 <b>76</b></span></div></div><div class="insight"><b>推荐指数　82 / 100</b><p>适合仓储周转、供应链配套及对面积有要求的轻型经营业态。优势是面积适中、用途适配度较好；需重点核实消防、用电和具体经营限制。</p></div><div class="source">依据：挂牌信息 · 周边资源演示数据　<span>仅供参考，不构成收益承诺</span></div>`;if(activeTab==='cost')return `<div class="analysis-title"><h2>价格与成本分析</h2><span class="tag orange">模拟分析 · 仅供参考</span></div><div class="cost-cards"><div><small>起始价格</small><b>7.01万<span>/年</span></b></div><div><small>三年租金总成本</small><b>21.02万</b></div><div><small>单位面积年租金</small><b>96.0<span>元/㎡</span></b></div></div>${chart('assetCost','analysis-cost-chart')}<div class="source">租金递增测算：因原始字段暂未提供，未进行递增模拟。历史成交及周边区间为模拟分析。</div>`;if(activeTab==='map')return `<div class="analysis-title"><h2>周边资源地图</h2><span class="tag green">ECharts演示地图</span></div><div class="map-controls"><b>圈层</b>${['500m','1km','3km'].map((x,i)=>`<button class="${i===1?'on':''}">${x}</button>`).join('')}<b>图层</b>${['人口热力','商业资源','产业资源','交通配套'].map(x=>`<button class="${activeLayer===x?'on':''}" data-layer="${x}">${x}</button>`).join('')}</div>${chart('assetMap','analysis-map-chart')}<div class="resource-stats"><b>日均人流 <strong>4,280</strong></b><b>常住人口 <strong>2.6万</strong></b><b>周边企业 <strong>186家</strong></b><b>公交站点 <strong>6个</strong></b></div><div class="source">周边点位、人口及企业数据均为本地模拟数据，不代表真实地理测绘结果。</div>`;return `<div class="analysis-title"><h2>风险与材料提示</h2><span class="tag red">需人工复核</span></div><div class="risk-list"><div class="risk yellow"><b>● 租金支付要求</b><p>原始挂牌字段暂未提供，签约前请向交易机构确认支付周期及递增条款。</p></div><div class="risk yellow"><b>● 资格与用途限制</b><p>竞买人资格、消防及工业用房经营限制需以正式公告和合同为准。</p></div><div class="risk green"><b>● 价格字段一致性</b><p>起始单价 × 租期与起始总价一致，当前未发现明显矛盾。</p></div><div class="risk red"><b>● 材料完整性</b><p>保证金、报名时间、优先权等 8 项字段待人工确认。</p></div></div><div class="source">提示仅作为辅助信息，最终以公告、附件、合同及人工审查结论为准。</div>`}

function cockpitLegacyDashboard(){
  const d=cockpitData;
  return `<main class="cockpit-dash">
    <header class="dash-header"><div class="dash-brand"><span class="dash-mark">JNE</span><div><b>江南e要素交易数据驾驶舱</b><small>JIANGNAN ELEMENTS TRADING INTELLIGENCE CENTER</small></div></div><div class="dash-title"><i></i><span>全域交易运行态势</span><i></i></div><div class="dash-tools"><span>数据截至 2026-08-21 09:30</span><button>◷ 实时刷新</button><button>⌘ 全屏</button></div></header>
    <div class="dash-subnav"><span class="selected">交易总览</span><span>资产供给</span><span>市场主体</span><span>交易效能</span><span>风险感知</span><span>AI洞察</span></div>
    <section class="dash-kpis">${d.kpis.map((x,i)=>`<article class="dash-kpi"><div class="kpi-top"><span>${['挂牌标的总量','本月成交金额','平均交易溢价','活跃市场主体'][i]}</span><i>${['◈','¥','↗','◌'][i]}</i></div><strong>${x[1]}</strong><p><b>${x[2]}</b> ${x[3]}</p><div class="kpi-spark spark-${i}"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></article>`).join('')}</section>
    <section class="dash-layout">
      <aside class="dash-left"><article class="dash-panel supply-panel"><div class="dash-panel-title"><div><b>资产供给结构</b><small>按挂牌标的数量</small></div><span>◌</span></div>${chart('overviewSupply','overview-small-chart')}</article>
      <article class="dash-panel funnel-dark"><div class="dash-panel-title"><div><b>交易转化链路</b><small>挂牌至成交转化情况</small></div><span>›</span></div>${chart('overviewFunnel','overview-small-chart')}</article>
      <article class="dash-panel subject-panel"><div class="dash-panel-title"><div><b>市场主体活跃度</b><small>本月参与交易主体</small></div><span>↗</span></div><div class="subject-numbers"><div><b>8,240</b><small>新增报名</small></div><div><b>3,186</b><small>新增竞买</small></div></div>${chart('overviewSubjects','overview-mini-chart')}</article></aside>
      <section class="dash-center"><article class="dash-panel main-map"><div class="dash-panel-title"><div><b>区域交易热力分布</b><small>挂牌与成交综合指数</small></div><div class="map-switch"><span class="on">成交额</span><span>标的数</span><span>活跃度</span></div></div>${chart('overviewRegion','overview-region-chart')}<div class="map-foot"><span><i></i>低活跃</span><span><i></i>中活跃</span><span><i></i>高活跃</span><b>区域总成交额：3.28亿元</b></div></article>
      <article class="dash-panel trend-dark"><div class="dash-panel-title"><div><b>交易规模运行趋势</b><small>近12个月成交金额（亿元）</small></div><div class="trend-tags"><span>成交额</span><span>挂牌量</span></div></div>${chart('overviewTrend','overview-trend-chart')}</article></section>
      <aside class="dash-right"><article class="dash-panel ranking-panel"><div class="dash-panel-title"><div><b>区域交易热度排行</b><small>综合指数 TOP 5</small></div><span>⋯</span></div>${chart('overviewRanking','overview-small-chart')}</article>
      <article class="dash-panel insight-dark"><div class="dash-panel-title"><div><b>AI 智能洞察</b><small>实时监测与辅助研判</small></div><span class="ai-live">● 实时</span></div>${d.alerts.map((x,i)=>`<div class="insight-row"><i class="insight-${i}">${['↑','!','✦'][i]}</i><p><small>${x[0]}</small><b>${x[1]}</b></p><span>›</span></div>`).join('')}<button class="dash-ai-button">✦ 进入AI交易研判</button></article>
      <article class="dash-panel notice-dark"><div class="dash-panel-title"><div><b>运行提醒</b><small>今日待办事项</small></div><span>◷</span></div><div><p><i></i>待资格审查项目 <b>18</b> 个</p><p><i></i>即将开始竞价 <b>6</b> 个</p><p><i></i>待补充公告字段 <b>12</b> 项</p></div></article></aside>
    </section>
    <footer class="dash-footer"><span>数据来源：挂牌信息 · 交易记录 · 市场主体库 · 本地模拟数据</span><span>本页面为内部数据驾驶舱 Demo，分析结论仅供参考</span></footer>
  </main>`;
}

const dashTabs=[['overview','交易总览'],['efficiency','交易效能'],['supply','资产供给'],['subjects','市场主体'],['risk','风险感知'],['insights','AI洞察']];
const dashboardHelp={
  '累计挂牌标的':'截至统计时点纳入平台的有效挂牌标的总数；同一标的重新挂牌时按新项目口径计数。',
  '本月成交额':'本月已完成成交确认项目的成交价格合计，不含保证金及其他服务费用。',
  '平均溢价率':'（成交价合计－对应起始价合计）÷ 对应起始价合计 × 100%。',
  '活跃市场主体':'本月发生登录、报名、资格审查或竞价行为的去重市场主体数量。',
  '在库资产总量':'当前资产库中可识别、可管理的资产记录总数，包含挂牌和待盘活资产。',
  '本月新增挂牌':'本月首次发布挂牌公告的标的数量，撤回后重新发布不重复计算。',
  '待盘活资产':'已入库但尚未形成有效挂牌或连续较长时间未交易的资产数量。',
  '资产信息完整度':'已填写且通过格式校验的核心字段数 ÷ 应填写核心字段总数。',
  '高价值资产':'依据评估价、面积、区位和历史成交热度综合评分达到阈值的资产数。',
  '累计市场主体':'平台完成注册并形成有效主体档案的企业、个体工商户和自然人去重数量。',
  '本月活跃主体':'本月至少发生一次报名、竞买、收藏或咨询行为的去重主体数。',
  '新增注册主体':'本月完成平台注册和基础身份核验的新增主体数量。',
  '竞买转化率':'参与竞买的主体数 ÷ 已通过报名审核的主体数 × 100%。',
  '优质企业库':'主体画像、经营状态与交易信用评分达到演示阈值的企业数量。',
  '平均成交周期':'从首次公告发布至成交确认的平均自然日数。',
  '线上办理率':'可在线完成的有效业务件数 ÷ 全部有效业务件数 × 100%。',
  '资格审查准时率':'在规定时限内完成资格审查的项目数 ÷ 应审查项目数 × 100%。',
  '项目成交率':'统计期内成交项目数 ÷ 结束挂牌项目数 × 100%。',
  '平均竞价轮次':'发生有效竞价的项目总出价轮次 ÷ 竞价项目数量。',
  '综合溢价率':'（成交价合计－对应起始价合计）÷ 对应起始价合计 × 100%；当前为AI辅助期模拟口径。',
  '溢价率环比':'本月综合溢价率－上月综合溢价率，以百分点（pp）表示。',
  'AI有效触达':'AI推荐被目标主体查看、点击或产生咨询行为的去重触达次数。',
  '平均竞买人数':'产生有效报价的竞买人数合计 ÷ 发生竞价的项目数量。',
  '撮合报名转化率':'AI有效触达后形成有效报名的主体数 ÷ AI有效触达主体数 × 100%。',
  '当前风险预警':'当前仍处于待核验、处理中或待复核状态的风险提示总数。',
  '待人工核验':'AI或规则引擎无法自动确认、需要业务人员核对的事项数量。',
  '异常行为线索':'根据出价频率、关联关系和操作轨迹识别出的待核验线索数。',
  '合规校验覆盖率':'已执行自动规则校验的项目数 ÷ 应校验项目数 × 100%。',
  '已闭环处置':'统计期内已完成核验、处置并记录结论的风险事项数量。',
  'AI解析项目':'已由AI完成公告、附件和结构化字段解析的项目数量。',
  '智能推荐触达':'推荐结果已展示给潜在竞买人的去重触达次数。',
  '潜在供需匹配':'资产条件与主体意向综合匹配分达到演示阈值的候选关系数。',
  '风险辅助识别':'AI从公告、规则与行为数据中识别出的风险提示数量。',
  '知识库覆盖':'已纳入检索范围的公告、交易规则、政策和案例条目总数。',
  '资产供给结构':'按有效挂牌标的数量计算各资产品类占比。',
  '交易转化链路':'展示挂牌、报名、竞买和成交各环节数量及相邻环节转化率。',
  '市场主体活跃度':'综合本月报名、竞买、收藏和咨询行为衡量主体参与活跃程度。',
  '区域交易热力分布':'综合区域挂牌量、成交额、报名人数和竞价轮次形成热度指数。',
  '交易规模运行趋势':'按月汇总成交确认金额，用于观察交易规模变化。',
  '区域交易热度排行':'区域热度指数＝挂牌量30%＋成交额35%＋报名人数20%＋竞价活跃度15%。',
  'AI 智能洞察':'基于挂牌、交易、主体和规则演示数据生成的辅助研判摘要。',
  '运行提醒':'汇总当天待审查、即将竞价和字段待补充事项。',
  '资产供给趋势':'按月统计新增有效挂牌标的数量并进行趋势对比。',
  '资产来源结构':'按委托主体性质统计农村集体、国有及其他资产占比。',
  '资产类型与区域分布':'交叉展示资产品类、挂牌数量、成交金额和区域供给规模。',
  '主体活跃趋势':'按月对比新增注册、有效报名和参与竞买主体数量。',
  '主体画像分布':'依据主体类型、行业标签和交易行为对主体进行分类统计。',
  '重点客群与意向匹配':'根据资产用途、区域、价格与主体偏好计算候选匹配度。',
  '交易流程效率':'展示各交易节点平均耗时，并与内部演示目标时效比较。',
  '项目成交率走势':'每月成交项目数 ÷ 当月结束挂牌项目数 × 100%。',
  '服务效能对比':'综合平均成交周期与资格审查准时率进行区域对比。',
  'AI触达与竞价趋势':'按月展示AI有效触达量、平均竞买人数和综合溢价率的联动变化。',
  '溢价率核心成效':'以AI辅助期综合溢价率为中心，对比同比、环比及辅助前基准。',
  '分类型增效分析':'按标的类型比较AI辅助前后竞买人数和溢价率变化。',
  '风险矩阵':'按发生概率和影响程度对待核验风险进行分级分布。',
  '风险事件流':'按发现时间展示规则校验和AI识别的最新风险提示。',
  '合规健康度':'由规则通过率、风险等级和闭环及时率加权形成的演示评分。',
  '今日 AI 研判摘要':'AI汇总供需、交易热度与风险变化生成的当日辅助摘要。',
  '智能撮合机会':'匹配度＝用途适配35%＋区域偏好25%＋价格匹配25%＋主体能力15%。',
  '知识问答热词':'统计近30日咨询问题中的高频关键词和用户意图。'
};
const dashPanel=(title,subtitle,content,extra='')=>`<article class="dash-panel dash-work-panel ${extra}"><div class="dash-panel-title"><div><b>${title}</b><small>${subtitle}</small></div><span>◌</span></div>${content}</article>`;
const dashMetric=(label,value,delta='')=>`<div class="dash-metric"><small>${label}</small><b>${value}</b>${delta?`<em>${delta}</em>`:''}</div>`;

function cockpit(){
  const d=cockpitData;
  return `<main class="cockpit-dash">
    <header class="dash-header"><div class="dash-brand"><span class="dash-mark">JNE</span><div><b>江南e要素交易数据驾驶舱</b><small>JIANGNAN ELEMENTS TRADING INTELLIGENCE CENTER</small></div></div><div class="dash-title"><i></i><span>${dashTabs.find(x=>x[0]===dashTab)[1]}</span><i></i></div><div class="dash-tools"><span>数据截至 2026-08-21 09:30</span><button data-dash-action="refresh">↻ 刷新数据</button><button data-dash-action="fullscreen">⌘ 全屏</button></div></header>
    <nav class="dash-subnav">${dashTabs.map(([key,label])=>`<button class="${dashTab===key?'active':''}" data-dash-tab="${key}">${label}</button>`).join('')}</nav>
    ${dashContent(d)}
    <footer class="dash-footer"><span>数据来源：挂牌信息 · 交易记录 · 市场主体库 · 本地模拟数据</span><span>本页面为内部数据驾驶舱 Demo，分析结论仅供参考</span></footer>
  </main>`;
}

function dashContent(d){
  if(dashTab==='supply') return `<section class="dash-workspace dash-supply">
    <div class="dash-work-kpis">${dashMetric('在库资产总量','12,846','较上月 +18.6%')}${dashMetric('本月新增挂牌','1,284','较上月 +9.2%')}${dashMetric('待盘活资产','1,906','占比 14.8%')}${dashMetric('资产信息完整度','91.4%','AI解析字段 72,468')}${dashMetric('高价值资产','826','预估成交额 ¥6.2亿')}</div>
    <div class="dash-work-grid supply-grid"><div class="dash-stack">${dashPanel('资产供给趋势','近12个月新增挂牌标的',chart('supplyTrend','work-chart'))}${dashPanel('资产来源结构','委托主体与资源来源',chart('supplySource','work-chart'))}</div>
    ${dashPanel('资产类型与区域分布','挂牌数量、成交金额及待盘活资产','<div class="supply-table"><div class="supply-row header"><span>资产类型</span><span>挂牌数量</span><span>成交金额</span><span>待盘活</span><span>环比</span></div>'+[['农村产权','5,398','¥1.26亿','612','+11.8%'],['商业用房','2,816','¥0.88亿','435','+8.4%'],['工业用房','1,964','¥0.72亿','382','+16.2%'],['国有产权','1,537','¥0.31亿','206','+6.5%'],['其他资产','1,131','¥0.11亿','271','+4.9%']].map(x=>`<div class="supply-row"><span>${x[0]}</span><span>${x[1]}</span><span>${x[2]}</span><span>${x[3]}</span><b>${x[4]}</b></div>`).join('')+'</div>'+chart('supplyRegion','supply-region-chart'),'wide-panel')}</div>
  </section>`;
  if(dashTab==='subjects') return `<section class="dash-workspace dash-subjects">
    <div class="dash-work-kpis">${dashMetric('累计市场主体','274,306','较上月 +6.8%')}${dashMetric('本月活跃主体','18,642','活跃率 6.8%')}${dashMetric('新增注册主体','2,486','较上月 +13.1%')}${dashMetric('竞买转化率','48.4%','报名至竞买')}${dashMetric('优质企业库','6,820','AI标签已覆盖')}</div>
    <div class="dash-work-grid subjects-grid">${dashPanel('主体活跃趋势','注册、报名、竞买三类行为',chart('subjectTrend','work-chart'))}${dashPanel('主体画像分布','按主体类型及行业标签',chart('subjectProfile','work-chart'))}${dashPanel('重点客群与意向匹配','AI撮合候选池 · 本地模拟','<div class="match-list">'+[['物流仓储企业','适配工业用房','1,482','92%'],['餐饮零售经营者','适配商业用房','2,946','88%'],['农业经营主体','适配农村产权','4,218','86%'],['文化旅游机构','适配文旅资产','326','81%']].map(x=>`<div><i>◎</i><p><b>${x[0]}</b><small>${x[1]} · 候选 ${x[2]}</small></p><em>${x[3]}</em></div>`).join('')+'</div>','match-panel')}</div>
  </section>`;
  if(dashTab==='efficiency'){
    const timeAnalysis=`${chart('efficiencyTrend','efficiency-chart')}<div class="impact-latest"><div><small>近12月AI触达</small><b>21,250</b><em>人次</em></div><div><small>平均竞买人数</small><b>3.9 → 6.8</b><em>+74.4%</em></div><div><small>综合溢价率</small><b>6.4% → 8.7%</b><em>+2.3pp</em></div></div>`;
    const premiumCore=`<div class="premium-core">${chart('premiumGauge','premium-echart')}<div class="premium-compare"><div><small>同比</small><b>+2.1pp</b><span>去年同期 6.6%</span></div><div><small>环比</small><b>+0.8pp</b><span>上月 7.9%</span></div></div><div class="premium-before"><span>AI辅助前基准</span><b>4.9%</b><i>→</i><span>AI辅助期</span><b>8.7%</b><em>提升 +3.8pp</em></div><div class="premium-note">溢价率＝（成交价合计－对应起始价合计）÷ 对应起始价合计。该页面用于演示AI触达与交易成效的关联分析，不构成正式因果评估。</div></div>`;
    const typeAnalysis=chart('typeImpact','type-impact-chart');
    return `<section class="dash-workspace dash-efficiency efficiency-impact"><div class="dash-work-kpis">${dashMetric('综合溢价率','8.7%','同比 +2.1pp')}${dashMetric('溢价率环比','+0.8pp','连续4个月上升')}${dashMetric('AI有效触达','18,426','同比 +68.3%')}${dashMetric('平均竞买人数','6.8人','AI辅助前 3.9人')}${dashMetric('撮合报名转化率','14.2%','较基准 +5.6pp')}</div><div class="dash-work-grid efficiency-impact-grid">${dashPanel('AI触达与竞价趋势','按月分析 · 触达、竞买人数与溢价率',timeAnalysis,'impact-trend-panel')}${dashPanel('溢价率核心成效','同比、环比及AI辅助前后模拟对比',premiumCore,'premium-center-panel')}${dashPanel('分类型增效分析','各类标的竞买人数与溢价率变化',typeAnalysis,'type-impact-panel')}</div></section>`;
  }
  if(dashTab==='risk') return `<section class="dash-workspace dash-risk">
    <div class="dash-work-kpis risk-kpis">${dashMetric('当前风险预警','36','高风险 4 项')}${dashMetric('待人工核验','82','公告字段与附件')}${dashMetric('异常行为线索','12','竞价行为分析')}${dashMetric('合规校验覆盖率','94.6%','规则 162 条')}${dashMetric('已闭环处置','126','本月处置率 93.3%')}</div>
    <div class="dash-work-grid risk-grid">${dashPanel('风险矩阵','影响程度 × 发生概率 · 点击色块查看明细',chart('riskMatrix','risk-chart'),'matrix-panel')}${dashPanel('风险事件流','按交易阶段和规则类型监测','<div class="risk-timeline">'+[['09:24','竞价行为','某工业用房项目出价频率异常','高','关联报价 18 次 · 待人工核验'],['09:08','公告完整性','12个项目缺少保证金字段','中','涉及 12 个项目 · 已通知补充'],['08:52','资格条件','1个项目资格文本存在歧义','中','规则命中 2 项 · 待业务确认'],['08:30','流程时效','3个项目审查节点即将超时','低','剩余处理时限 30 分钟']].map(x=>`<div><time>${x[0]}</time><i class="risk-${x[3]}"></i><p><b>${x[1]}</b><small>${x[2]}</small><strong>${x[4]}</strong></p><em>${x[3]}风险</em></div>`).join('')+'</div>','risk-flow-panel')}${dashPanel('合规健康度','规则命中、人工核验与处置结果',chart('healthGauge','risk-chart')+'<div class="health-note"><span>● 低风险 126</span><span>● 中风险 20</span><span>● 高风险 4</span></div>','health-panel')}</div>
  </section>`;
  if(dashTab==='insights') return `<section class="dash-workspace dash-insights">
    <div class="dash-work-kpis">${dashMetric('AI解析项目','10,864','结构化字段 72,468')}${dashMetric('智能推荐触达','18,426','点击率 18.7%')}${dashMetric('潜在供需匹配','3,862','高置信度 1,148')}${dashMetric('风险辅助识别','138','人工确认率 91.3%')}${dashMetric('知识库覆盖','286,000+','公告 · 规则 · 案例')}</div>
    <div class="dash-work-grid insight-grid">${dashPanel('今日 AI 研判摘要','基于挂牌、交易与周边资源演示数据','<div class="ai-summary"><div class="ai-orb"><i></i><b>AI</b></div><div><p><b>市场供给稳中有升，商业用房活跃度提升明显</b></p><small>本周海宁市商业用房报名热度环比 +16%，建议优先关注 7 个高匹配项目。</small><div><button data-dash-action="toast">生成专项简报</button><button data-dash-action="toast">查看研判依据</button></div></div></div>','ai-summary-panel')}${dashPanel('智能撮合机会','高置信度供需匹配 TOP 5','<div class="opportunity-list">'+[['海昌街道工业仓储项目','物流仓储企业','94%','产业适配 · 价格匹配'],['海洲街道沿街商铺','餐饮零售经营者','92%','客群匹配 · 区位便利'],['斜桥镇农用地','农业经营主体','89%','规模匹配 · 用途适配'],['硖石街道停车资源','物业服务企业','87%','运营能力 · 区域需求'],['海盐家宴中心','文旅餐饮机构','85%','场景契合 · 经营能力']].map(x=>`<div><i>✦</i><p><b>${x[0]}</b><small>匹配对象：${x[1]} · ${x[3]}</small></p><em>${x[2]}</em></div>`).join('')+'</div>','opportunity-panel')}${dashPanel('知识问答热词','近30日咨询主题与意图分布',chart('questionTopics','question-chart')+'<div class="ai-path"><b>AI处理链路</b><span>公告解析</span><i>›</i><span>知识检索</span><i>›</i><span>规则校验</span><i>›</i><span>辅助回答</span></div>','word-panel')}</div>
  </section>`;
  return `<section class="dash-workspace dash-overview"><div class="dash-work-kpis overview-kpis">${d.kpis.map(x=>dashMetric(x[0],x[1],`${x[2]} ${x[3]}`)).join('')}</div><div class="dash-layout">${cockpitLegacyDashboard().match(/<section class="dash-layout">([\s\S]*)<\/section>\s*<footer/)[1]}</div></section>`;
}

const months=['09月','10月','11月','12月','01月','02月','03月','04月','05月','06月','07月','08月'];
const tooltip={trigger:'item',backgroundColor:'rgba(4,19,42,.96)',borderColor:'#2b7ca8',textStyle:{color:'#e9f8ff'},extraCssText:'box-shadow:0 8px 24px rgba(0,0,0,.3);'};
const axis={axisLine:{lineStyle:{color:'rgba(113,185,220,.32)'}},axisTick:{show:false},axisLabel:{color:'#8fb7cf',fontSize:10},splitLine:{lineStyle:{color:'rgba(69,146,185,.14)'}}};
const legend={textStyle:{color:'#a9cee1',fontSize:10},itemWidth:10,itemHeight:6};
const baseGrid={left:42,right:18,top:34,bottom:26,containLabel:false};
const fmt=v=>Number(v).toLocaleString('zh-CN');
let chartInstances=[];

function chartOption(type){
  const d=cockpitData;
  const pie=(data,center=['37%','51%'])=>({tooltip:{...tooltip,formatter:'{b}<br/>{c}（{d}%）'},legend:{...legend,orient:'vertical',right:'4%',top:'center',itemGap:14,textStyle:{...legend.textStyle,fontSize:11}},series:[{type:'pie',radius:['52%','82%'],center,data,label:{show:false},itemStyle:{borderColor:'#071a36',borderWidth:2}}]});
  const categoryData=d.categories.map(x=>({name:x[0],value:x[1],itemStyle:{color:x[2]}}));
  const chartOptions={
    assetRadar:{tooltip:{...tooltip,trigger:'item',formatter:p=>p.name+'<br/>'+['区位便利度','产业匹配度','客群基础','租金竞争力','经营灵活性'].map((x,i)=>`${x}：${p.value[i]}分`).join('<br/>')},radar:{radius:'66%',indicator:['区位便利度','产业匹配度','客群基础','租金竞争力','经营灵活性'].map(name=>({name,max:100})),axisName:{color:'#61758a',fontSize:11},splitArea:{areaStyle:{color:['rgba(21,120,185,.03)','rgba(21,120,185,.08)']}},splitLine:{lineStyle:{color:'rgba(21,120,185,.22)'}},axisLine:{lineStyle:{color:'rgba(21,120,185,.2)'}}},series:[{name:'资产价值评分',type:'radar',data:[{name:'资产价值评分',value:[82,88,72,86,76],areaStyle:{color:'rgba(21,120,185,.24)'},lineStyle:{color:'#1578b9',width:2},itemStyle:{color:'#1578b9'}}]}]},
    assetCost:{tooltip:{...tooltip,trigger:'axis',axisPointer:{type:'shadow'},formatter:items=>`${items[0].axisValue}<br/>${items.map(x=>`${x.marker}${x.seriesName}：${x.value} 万元/年`).join('<br/>')}`},grid:{left:108,right:18,top:15,bottom:20},xAxis:{type:'value',max:10,...axis,axisLabel:{color:'#77889a',formatter:'{value}万'}},yAxis:{type:'category',data:['本标的起始价','周边同类低值','周边同类高值','历史成交低值','历史成交高值'],...axis},series:[{name:'参考价格',type:'bar',data:[7.01,5.8,9.6,6.4,8.2],barWidth:12,itemStyle:{color:p=>p.dataIndex===0?'#1578b9':'#79a9c8',borderRadius:[0,5,5,0]},label:{show:true,position:'right',formatter:'{c}万',color:'#536b7b'}}]},
    assetMap:{tooltip:{...tooltip,formatter:p=>`${p.name}<br/>距标的约 ${p.data.distance}m<br/>${activeLayer}指数：${p.value[2]}`},grid:{left:5,right:5,top:5,bottom:5},xAxis:{min:0,max:100,show:false},yAxis:{min:0,max:100,show:false},series:[{type:'scatter',symbolSize:v=>v[2]===100?28:12+v[2]/5,label:{show:true,position:'bottom',color:'#496579',formatter:'{b}'},itemStyle:{color:p=>p.name==='标的位置'?'#f3aa37':'#1578b9',shadowBlur:10,shadowColor:'#1578b9'},data:[{name:'标的位置',value:[50,50,100],distance:0},{name:'产业园区',value:[23,72,86],distance:620},{name:'公交站',value:[72,68,74],distance:380},{name:'社区',value:[28,28,68],distance:840},{name:'商业圈',value:[78,30,79],distance:960}]}]},
    overviewSupply:pie(categoryData),
    overviewFunnel:{tooltip:{...tooltip,formatter:p=>`${p.name}<br/>数量：${fmt(p.value)}<br/>累计转化率：${p.data.rate}`},series:[{type:'funnel',left:'4%',top:8,bottom:8,width:'92%',minSize:'38%',maxSize:'100%',sort:'descending',gap:4,label:{show:true,position:'inside',color:'#eafaff',fontSize:12,formatter:p=>`${p.name}  ${fmt(p.value)}  ${p.data.rate}`},itemStyle:{borderColor:'#071a36',borderWidth:1},data:d.funnel.map((x,i)=>({name:x[0],value:Number(x[1].replace(',','')),rate:x[2],itemStyle:{color:['#12bed4','#168fc4','#2672b7','#555bc2'][i]}}))}]},
    overviewSubjects:{tooltip:{...tooltip,trigger:'axis',axisPointer:{type:'shadow'},formatter:items=>`${items[0].axisValue}<br/>活跃指数：${items[0].value}`},grid:{left:8,right:8,top:8,bottom:18},xAxis:{type:'category',data:['11','12','01','02','03','04','05','06','07','08'],...axis},yAxis:{type:'value',show:false},series:[{name:'活跃指数',type:'bar',data:[43,69,52,78,65,88,71,94,76,86],barWidth:'48%',itemStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#42e9ff'},{offset:1,color:'rgba(37,129,190,.2)'}]),borderRadius:[3,3,0,0]}}]},
    overviewRegion:{tooltip:{...tooltip,formatter:p=>`${p.name}<br/>热度指数：${p.value[2]}<br/>成交额：${p.data.amount}亿元<br/>标的数：${fmt(p.data.assets)}宗`},grid:{left:12,right:12,top:8,bottom:8},xAxis:{min:0,max:100,show:false},yAxis:{min:0,max:100,show:false},series:[{type:'effectScatter',coordinateSystem:'cartesian2d',symbolSize:v=>20+v[2]/3.6,rippleEffect:{scale:2.2,brushType:'stroke'},label:{show:true,position:'bottom',distance:6,color:'#dff8ff',fontSize:11,formatter:p=>`${p.name}  ${p.value[2]}`},itemStyle:{color:p=>['#31e2ff','#3bd8f2','#35b9ec','#438ee1','#347fd3','#636ee5','#7e68d4'][p.dataIndex],shadowBlur:18,shadowColor:'#24d8ff'},data:[['海宁',58,53,86,1.18,3246],['南湖',32,76,78,.92,2954],['嘉善',18,48,72,.72,2819],['桐乡',48,82,69,.68,2264],['秀洲',40,24,64,.61,2113],['海盐',74,28,51,.43,1807],['平湖',80,70,43,.34,1648]].map(x=>({name:x[0],value:x.slice(1,4),amount:x[4],assets:x[5]}))}]},
    overviewTrend:{tooltip:{...tooltip,trigger:'axis',formatter:items=>`${items[0].axisValue}<br/>${items.map(x=>`${x.marker}${x.seriesName}：${x.value}${x.seriesName==='成交额'?' 亿元':' 宗'}`).join('<br/>')}`},legend:{...legend,right:10,top:0},grid:{...baseGrid,top:28},xAxis:{type:'category',data:d.trendLabels,...axis},yAxis:[{type:'value',name:'亿元',nameTextStyle:{color:'#8fb7cf'},...axis,axisLabel:{color:'#8fb7cf',formatter:v=>(v/100).toFixed(1)}},{type:'value',show:false}],series:[{name:'成交额',type:'line',smooth:true,data:d.trend,areaStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(36,216,255,.42)'},{offset:1,color:'rgba(36,216,255,0)'}])},lineStyle:{color:'#28d8ff',width:2},itemStyle:{color:'#39e5ff'}},{name:'挂牌量',type:'line',smooth:true,yAxisIndex:1,data:[760,880,810,960,1020,980,1160,1240,1190,1360,1480,1560],lineStyle:{color:'#8f7cff',type:'dashed'},itemStyle:{color:'#a997ff'}}]},
    overviewRanking:{tooltip:{...tooltip,trigger:'axis',axisPointer:{type:'shadow'},formatter:items=>`${items[0].name}<br/>综合热度指数：${items[0].value}`},grid:{left:62,right:30,top:12,bottom:12},xAxis:{type:'value',max:100,show:false},yAxis:{type:'category',inverse:true,data:d.regions.map(x=>x[0]),...axis,axisLabel:{color:'#a9cee1',fontSize:11,margin:12}},series:[{type:'bar',data:d.regions.map(x=>x[1]),barWidth:12,label:{show:true,position:'right',distance:7,color:'#e5fbff',fontSize:11},itemStyle:{color:new echarts.graphic.LinearGradient(1,0,0,0,[{offset:0,color:'#2ce4ff'},{offset:1,color:'#2465a9'}]),borderRadius:6}}]},
    supplyTrend:{tooltip:{...tooltip,trigger:'axis',formatter:items=>`${items[0].axisValue}<br/>新增挂牌：${items[0].value} 宗`},grid:baseGrid,xAxis:{type:'category',data:months,...axis},yAxis:{type:'value',...axis},series:[{name:'新增挂牌',type:'bar',data:[380,460,540,480,620,570,710,830,670,760,880,940],barWidth:'48%',itemStyle:{color:'#24cfe8',borderRadius:[4,4,0,0]}}]},
    supplySource:pie([{name:'农村集体资产',value:8224},{name:'国有及国企资产',value:2905},{name:'社有及其他资产',value:1717}]),
    supplyRegion:{tooltip:{...tooltip,formatter:p=>`${p.name}<br/>资产供给：${fmt(p.value[2])} 宗`},grid:{left:5,right:5,top:5,bottom:5},xAxis:{min:0,max:100,show:false},yAxis:{min:0,max:100,show:false},series:[{type:'scatter',symbolSize:v=>22+v[2]/135,label:{show:true,position:'bottom',distance:7,color:'#ccefff',fontSize:11,formatter:p=>`${p.name} ${fmt(p.value[2])}`},itemStyle:{color:p=>['#24d8ff','#39c8ed','#36b8de','#438cdb','#4779d2','#676bd7','#8066ca'][p.dataIndex],shadowBlur:16,shadowColor:'#24d8ff'},data:[['海宁',31,69,3246],['南湖',68,78,2954],['嘉善',76,53,2819],['桐乡',47,84,2264],['秀洲',50,35,2113],['海盐',79,23,1807],['平湖',22,25,1648]].map(x=>({name:x[0],value:x.slice(1)}))}]},
    subjectTrend:{tooltip:{...tooltip,trigger:'axis',axisPointer:{type:'shadow'},formatter:items=>`${items[0].axisValue}<br/>${items.map(x=>`${x.marker}${x.seriesName}：${fmt(x.value)} 人`).join('<br/>')}`},legend:{...legend,top:0},grid:{...baseGrid,top:34},xAxis:{type:'category',data:months,...axis},yAxis:{type:'value',...axis},series:[{name:'新增注册',type:'bar',data:[820,940,880,1080,1010,1160,1280,1390,1320,1540,1720,1860]},{name:'有效报名',type:'bar',data:[2260,2480,2390,2710,2640,2980,3120,3380,3260,3560,3820,4110]},{name:'参与竞买',type:'bar',data:[1020,1190,1110,1320,1270,1460,1580,1690,1610,1820,1980,2180]}]},
    subjectProfile:{tooltip:{...tooltip,formatter:'{b}<br/>{c}%（{d}%）'},legend:{...legend,left:'center',bottom:8,itemGap:18,textStyle:{...legend.textStyle,fontSize:12}},series:[{type:'pie',radius:['45%','70%'],center:['50%','43%'],data:[{name:'企业主体',value:61},{name:'个体工商户',value:24},{name:'自然人',value:11},{name:'其他主体',value:4}],label:{show:true,color:'#ccecf4',fontSize:12,formatter:'{b}\n{d}%'},labelLine:{length:12,length2:8,lineStyle:{color:'#69a9bf'}},itemStyle:{borderColor:'#071a36',borderWidth:2}}]},
    efficiencyTrend:{tooltip:{...tooltip,trigger:'axis',formatter:items=>`${items[0].axisValue}<br/>${items.map(x=>`${x.marker}${x.seriesName}：${fmt(x.value)}${x.seriesName==='AI有效触达'?' 次':x.seriesName==='平均竞买人数'?' 人':'%'}`).join('<br/>')}`},legend:{...legend,top:0},grid:{left:42,right:44,top:36,bottom:28},xAxis:{type:'category',data:months,...axis},yAxis:[{type:'value',name:'触达次数',...axis,nameTextStyle:{color:'#8fb7cf'}},{type:'value',name:'人数 / %',min:0,max:10,...axis,nameTextStyle:{color:'#8fb7cf'}}],series:[{name:'AI有效触达',type:'bar',data:[820,930,1100,1280,1460,1660,1890,2110,2370,2590,2860,3180],barWidth:'42%',itemStyle:{color:'rgba(47,141,211,.65)',borderRadius:[3,3,0,0]}},{name:'综合溢价率',type:'line',yAxisIndex:1,smooth:true,data:[6.4,6.6,6.9,7.1,7.4,7.7,7.8,8.1,8.3,8.4,8.6,8.7],lineStyle:{color:'#43e7f3',width:2},itemStyle:{color:'#43e7f3'}},{name:'平均竞买人数',type:'line',yAxisIndex:1,smooth:true,data:[3.9,4.1,4.3,4.5,4.8,5.1,5.3,5.7,6,6.2,6.5,6.8],lineStyle:{color:'#9b7dff',type:'dashed',width:2},itemStyle:{color:'#ad95ff'}}]},
    premiumGauge:{tooltip:{...tooltip,formatter:'{b}<br/>{c}%'},series:[{name:'综合溢价率',type:'gauge',min:0,max:15,startAngle:210,endAngle:-30,radius:'96%',progress:{show:true,width:24,itemStyle:{color:'#35e3ef'}},axisLine:{lineStyle:{width:24,color:[[1,'rgba(64,156,196,.2)']]}},axisTick:{show:false},splitLine:{show:false},axisLabel:{show:false},pointer:{show:false},anchor:{show:false},title:{offsetCenter:[0,'34%'],color:'#90bbd0',fontSize:12},detail:{valueAnimation:true,offsetCenter:[0,'-5%'],formatter:'{value}%',color:'#eaffff',fontSize:36,fontWeight:'bold'},data:[{value:8.7,name:'AI辅助期模拟值'}]}]},
    typeImpact:{tooltip:{...tooltip,trigger:'axis',axisPointer:{type:'shadow'},formatter:items=>`${items[0].axisValue}<br/>${items.map(x=>`${x.marker}${x.seriesName}：${x.value}%`).join('<br/>')}`},legend:{...legend,top:0},grid:{left:62,right:18,top:34,bottom:20},xAxis:{type:'value',...axis,axisLabel:{color:'#8fb7cf',formatter:'{value}%'}},yAxis:{type:'category',data:['农村产权','商业用房','工业用房','国有产权','社有资产'],...axis},series:[{name:'AI辅助前溢价率',type:'bar',data:[5.6,7.2,6.8,9.1,4.8],barWidth:8,itemStyle:{color:'#536b91'}},{name:'AI辅助期溢价率',type:'bar',data:[9.4,11.8,10.2,12.6,8.0],barWidth:8,itemStyle:{color:'#35dce8'}}]},
    riskMatrix:{tooltip:{...tooltip,formatter:p=>`${['低','中','高'][p.value[0]]}概率 × ${['低','中','高'][p.value[1]]}影响<br/>待核验风险：${p.value[2]} 项<br/>点击查看明细`},grid:{left:62,right:26,top:20,bottom:54},xAxis:{type:'category',data:['低','中','高'],name:'发生概率',nameLocation:'middle',nameGap:38,...axis,axisLabel:{color:'#b7dce8',fontSize:13,margin:12},nameTextStyle:{color:'#82afc2',fontSize:13}},yAxis:{type:'category',data:['低','中','高'],name:'影响程度',nameGap:38,...axis,axisLabel:{color:'#b7dce8',fontSize:13,margin:12},nameTextStyle:{color:'#82afc2',fontSize:13}},visualMap:{min:0,max:12,show:false,inRange:{color:['#133e55','#b9862e','#db4a4a']}},series:[{type:'heatmap',cursor:'pointer',data:[[0,0,6],[1,0,6],[2,0,2],[0,1,3],[1,1,12],[2,1,8],[0,2,1],[1,2,3],[2,2,4]],label:{show:true,color:'#fff',fontSize:17,fontWeight:'bold',formatter:p=>p.value[2]||''},itemStyle:{borderColor:'#071a36',borderWidth:5},emphasis:{itemStyle:{borderColor:'#63edff',borderWidth:3,shadowBlur:18,shadowColor:'#44dff3'}}}]},
    healthGauge:{tooltip:{...tooltip,formatter:'{b}<br/>{c} 分'},series:[{type:'gauge',min:0,max:100,startAngle:210,endAngle:-30,radius:'96%',center:['50%','52%'],progress:{show:true,width:26,itemStyle:{color:'#31dfc4'}},axisLine:{lineStyle:{width:26,color:[[1,'rgba(65,151,182,.2)']]}},axisTick:{show:false},splitLine:{show:false},axisLabel:{show:false},pointer:{show:false},detail:{formatter:'{value}',color:'#eaffff',fontSize:38,offsetCenter:[0,'-2%']},title:{color:'#8fb7cf',fontSize:13,offsetCenter:[0,'26%']},data:[{value:94.6,name:'合规健康分'}]}]},
    questionTopics:{tooltip:{...tooltip,formatter:p=>`${p.name}<br/>近30日咨询：${fmt(p.value)} 次<br/>占全部咨询：${p.data.share}%`},series:[{type:'treemap',roam:false,nodeClick:false,breadcrumb:{show:false},label:{show:true,color:'#dff8ff',fontSize:11,formatter:'{b}\n{c}次'},itemStyle:{borderColor:'#09233d',borderWidth:3,gapWidth:2},data:[['报名流程',2860],['竞买保证金',2380],['资产位置',1980],['租赁期限',1720],['竞价规则',1640],['工业用房',1380],['资格条件',1260],['成交参考',980],['商铺',820],['海宁市',760]].map((x,i,a)=>({name:x[0],value:x[1],share:(x[1]/a.reduce((s,y)=>s+y[1],0)*100).toFixed(1),itemStyle:{color:['#176985','#1d7493','#235e91','#28547e','#316a87','#267a75','#3d6596','#6c5e91','#76633f','#315a72'][i]}}))}]}
  };
  return chartOptions[type];
}

function showRiskDetails(value){
  const [probabilityIndex,impactIndex,count]=value;
  const levels=['低','中','高'];
  const riskCatalog=[
    ['公告字段缺失','保证金缴纳截止时间暂未提供'],['附件一致性','公告与附件中的面积字段待核对'],['资格条件','竞买人资格描述存在待确认表述'],['竞价频率异常','短时连续报价行为需人工核验'],
    ['流程节点临期','资格审查剩余时限不足 30 分钟'],['价格字段校验','起始价与总价计算口径待复核'],['优先权提示','优先权人字段尚未完成确认'],['用途限制','经营用途与资产规划条件待比对'],
    ['主体关联线索','报名主体关联关系需进一步核验'],['材料完整性','报名材料存在待补充项'],['合同条款校验','租金递增方式尚未明确'],['成交确认时效','成交确认节点接近演示预警阈值']
  ];
  const items=Array.from({length:count},(_,i)=>riskCatalog[i%riskCatalog.length]);
  document.querySelector('.risk-detail-modal')?.remove();
  const modal=document.createElement('div');
  modal.className='risk-detail-modal';
  modal.innerHTML=`<div class="risk-modal-card" role="dialog" aria-modal="true" aria-label="风险矩阵明细"><header><div><b>${levels[probabilityIndex]}概率 × ${levels[impactIndex]}影响</b><small>共 ${count} 条待核验风险 · 本地模拟数据</small></div><button type="button" aria-label="关闭">×</button></header><div class="risk-modal-list">${items.map((item,i)=>`<article><i>${String(i+1).padStart(2,'0')}</i><div><b>${item[0]}</b><p>${item[1]}</p></div><span>待核验</span></article>`).join('')}</div><footer>风险提示不等同于违规结论，最终以业务人员复核结果为准。</footer></div>`;
  document.body.append(modal);
  const close=()=>modal.remove();
  modal.querySelector('button').onclick=close;
  modal.onclick=e=>{if(e.target===modal)close()};
}

function initCharts(){
  chartInstances.forEach(instance=>instance.dispose());
  chartInstances=[];
  document.querySelectorAll('[data-chart]').forEach(el=>{
    const option=chartOption(el.dataset.chart);
    if(!option)return;
    const instance=echarts.init(el,null,{renderer:'canvas'});
    instance.setOption(option);
    if(el.dataset.chart==='riskMatrix')instance.on('click',params=>showRiskDetails(params.value));
    chartInstances.push(instance);
  });
}
window.addEventListener('resize',()=>chartInstances.forEach(instance=>instance.resize()));

function showDashHelp(icon){
  document.querySelector('.dash-help-tip')?.remove();
  const tip=document.createElement('div');
  tip.className='dash-help-tip';
  tip.textContent=icon.dataset.help;
  document.body.append(tip);
  const rect=icon.getBoundingClientRect(), width=Math.min(280,window.innerWidth-28);
  tip.style.width=`${width}px`;
  tip.style.left=`${Math.max(14,Math.min(rect.left+rect.width/2-width/2,window.innerWidth-width-14))}px`;
  tip.style.top=`${Math.max(12,rect.bottom+9)}px`;
  requestAnimationFrame(()=>tip.classList.add('show'));
}
function attachDashHelp(){
  document.querySelectorAll('.dash-metric>small,.dash-panel-title b').forEach(label=>{
    if(label.querySelector('.dash-help')) return;
    const name=label.textContent.trim(), icon=document.createElement('span');
    icon.className='dash-help'; icon.textContent='?'; icon.tabIndex=0;
    icon.dataset.help=dashboardHelp[name]||`${name}基于当前驾驶舱本地模拟数据计算，正式口径以业务数据字典为准。`;
    icon.title=icon.dataset.help; icon.setAttribute('aria-label',`${name}口径说明`);
    icon.onmouseenter=()=>showDashHelp(icon); icon.onfocus=()=>showDashHelp(icon);
    icon.onmouseleave=()=>document.querySelector('.dash-help-tip')?.remove(); icon.onblur=()=>document.querySelector('.dash-help-tip')?.remove();
    label.append(icon);
  });
}
function attachDashControls(){document.querySelectorAll('[data-dash-tab]').forEach(el=>el.onclick=()=>{dashTab=el.dataset.dashTab;render()});document.querySelectorAll('[data-dash-action]').forEach(el=>el.onclick=()=>{if(el.dataset.dashAction==='fullscreen'){document.documentElement.requestFullscreen?.()}else{toast(el.dataset.dashAction==='refresh'?'驾驶舱数据已刷新（演示数据）':'Demo暂未开放，已记录您的操作')}});attachDashHelp()}
function render(){chartInstances.forEach(instance=>instance.dispose());chartInstances=[];app.innerHTML=page==='home'?home():page==='cockpit'?cockpit():detail();bind();attachDashControls();initCharts();}
function bind(){document.querySelectorAll('[data-action]').forEach(el=>el.onclick=()=>{let a=el.dataset.action;if(a==='home'){page='home';history.pushState({},'',location.pathname);render()}if(a==='cockpit'){page='cockpit';history.pushState({},'',location.pathname+'?page=cockpit');render()}if(a==='asset'){page='detail';history.pushState({},'',location.pathname+'?page=detail');render()}if(a==='chat'){chatOpen=!chatOpen;render()}if(a==='consult'){analysisOpen=false;chatOpen=true;render()}if(a==='analysis'){analysisOpen=!analysisOpen;render()}if(a==='toast'){toast('Demo暂未开放，正式入口以平台业务系统为准')}if(a==='ask'){ask(el.dataset.q)}if(a==='send'){let input=document.querySelector('#chat-input');if(input?.value.trim())ask(input.value.trim())}if(a==='report'){toast('AI解析报告已生成，可在浏览器打印或保存为 PDF');window.print()}});document.querySelectorAll('[data-tab]').forEach(el=>el.onclick=()=>{activeTab=el.dataset.tab;render()});document.querySelectorAll('[data-layer]').forEach(el=>el.onclick=()=>{activeLayer=el.dataset.layer;render()})}
function ask(q){const extra=document.querySelector('#chat-extra');if(!extra)return;extra.innerHTML=`<div class="msg user">${esc(q)}</div><div class="typing">AI正在分析条件 <i></i><i></i><i></i></div>`;setTimeout(()=>{extra.innerHTML+=`<div class="msg ai">${page==='home'?'已为您提取：<b>海宁市</b> · <b>商业 / 工业用房</b> · 年租金 <b>20万元以内</b>。为您找到 3 个匹配标的：':''}${page==='home'?listings.map(listingCard).join(''):answer(q)}</div>`;document.querySelector('.messages').scrollTop=99999;bind()},650)}
function answer(q){let t=q.includes('适合')?'基于面积、用途和区位条件，AI参考建议仓储周转、供应链配套及轻型经营业态。建议进一步核实消防、用电和经营范围。':q.includes('人口')?'周边资源为演示数据：1公里圈层常住人口约2.6万，周边企业约186家，产业以制造业配套和仓储物流为主。':'当前字段显示起始价为70,080元/年，三年基础租金约21.02万元。保证金、递增方式等尚未提供，请以公告和合同为准。';return `${t}<div class="source">依据：挂牌信息 · 周边资源演示数据 · 参考建议</div>`}
function toast(s){let d=document.createElement('div');d.className='toast';d.textContent=s;document.body.append(d);setTimeout(()=>d.remove(),2600)}
window.onpopstate=()=>{const p=new URLSearchParams(location.search).get('page');page=p==='detail'?'detail':p==='cockpit'?'cockpit':'home';render()};render();
