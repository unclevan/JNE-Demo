import {pageHeader,kpis,filterBar,genericPage,reasonCard,esc} from '../components.js';
import {specialData} from '../../admin-data.js';


function reviewPage(meta){
  return `${pageHeader(meta)}${kpis(meta.kpis)}${filterBar(meta.filters)}<section class="admin-review-layout">
    <aside class="admin-card review-queue"><header><b>待复核项目</b><span>38</span></header>${[['日月经编2号仓库','8 项待确认','高'],['沿街商业用房','3 项待确认','中'],['农业设施用地','5 项待确认','中'],['停车场经营权','2 项待确认','低']].map((x,i)=>`<button class="${i===0?'active':''}"><i class="${x[2]==='高'?'red':x[2]==='中'?'orange':'blue'}"></i><p><b>${x[0]}</b><small>${x[1]} · ${x[2]}优先级</small></p><span>›</span></button>`).join('')}</aside>
    <article class="admin-card review-source"><header><div><b>交易公告原文</b><small>交易公告.pdf · 第 3 / 8 页</small></div><div><button>−</button><span>100%</span><button>＋</button></div></header><div class="document-preview"><h3>海宁市海昌街道老村委西原日月经编2号房仓库租赁权交易公告</h3><p>一、项目基本情况</p><p>本项目位于海宁市海昌街道，建筑面积约 <mark>730 平方米</mark>，拟采用公开竞价方式出租，租赁期限为 <mark>3 年</mark>。</p><p>二、交易条件</p><p>首年租金起始价为人民币 70,080 元，竞买保证金为 <mark class="warn">人民币 20,000 元</mark>。租金按年支付，遵循先付后用原则。</p><p>三、竞买人资格</p><p>具有完全民事行为能力的自然人或依法设立并有效存续的法人、非法人组织均可参与，具体以资格审查结果为准。</p><aside>AI 已定位 6 个字段来源，黄色内容存在结构化字段冲突。</aside></div></article>
    <article class="admin-card review-fields"><header><div><b>AI 提取字段</b><small>输入版本：公告 V5</small></div><span class="admin-badge orange">8 项待确认</span></header><div class="review-field-list">${specialData.reviewFields.map((x,i)=>`<div class="${x[4]==='来源冲突'?'conflict':x[4]==='缺失'?'missing':''}"><label><span>${x[0]}</span><em>${x[3]==='—'?'':x[3]+'% 置信'}</em></label><input value="${esc(x[1])}" ${x[4]==='已确认'?'readonly':''}/><small>来源：${x[2]}</small><footer><span class="admin-badge ${x[4]==='已确认'?'green':x[4]==='来源冲突'?'red':'orange'}">${x[4]}</span>${x[4]!=='已确认'?'<button data-admin-action="confirm-field">确认</button>':''}</footer></div>`).join('')}</div><div class="review-submit"><button>退回补充材料</button><button class="primary" data-admin-action="primary">确认并提交复核</button></div></article>
  </section>`;
}

function qualityPage(meta){
  return `${pageHeader(meta)}${kpis(meta.kpis)}${filterBar(meta.filters)}<section class="admin-analytics-grid"><article class="admin-card span2"><header><div><b>字段类型质量对比</b><small>准确率与人工修改率</small></div><span>近 30 天</span></header><div class="quality-bars">${specialData.qualityTypes.map(x=>`<div><label>${x[0]}</label><div><i style="width:${x[1]}%"></i></div><b>${x[1]}%</b><small>修改率 ${x[2]}%</small></div>`).join('')}</div></article>${reasonCard('失败原因分布',[['扫描件清晰度不足','34%'],['附件格式不支持','26%'],['公告模板异常','18%'],['结构化字段冲突','14%'],['外部数据不可用','8%']])}${reasonCard('模型版本对比',[['JNE-LM-2','97.4%'],['JNE-LM-1','94.8%'],['OCR-3.2','98.6%'],['OCR-3.1','96.1%']])}</section>`;
}

export const pages = {
  'parse-tasks': genericPage,
  'field-review': reviewPage,
  'analysis-versions': genericPage,
  'parse-quality': qualityPage
};
