import {pageHeader,kpis,filterBar,genericPage} from '../components.js';
import {specialData} from '../../admin-data.js';


function rolesPage(meta){
  return `${pageHeader(meta)}${kpis(meta.kpis)}${filterBar(meta.filters)}<section class="admin-card role-matrix"><header><div><b>角色权限矩阵</b><small>功能权限与数据权限分离配置</small></div><button data-admin-action="primary">＋ 新建角色</button></header><table><thead><tr><th>角色</th><th>功能范围</th><th>数据范围</th><th>关键操作</th><th>成员</th><th>权限项</th><th>操作</th></tr></thead><tbody>${specialData.roleMatrix.map((x,i)=>`<tr><td><b>${x[0]}</b></td><td>${x[1]}</td><td>${x[2]}</td><td>${x[3]}</td><td>${x[4]}</td><td><div class="permission-dots">${[1,1,1,i<4?1:0,i===3?1:0].map(v=>`<i class="${v?'on':''}"></i>`).join('')}</div></td><td><button data-admin-action="row" data-row="${i}">配置权限</button></td></tr>`).join('')}</tbody></table></section>`;
}

function aiConfigPage(meta){
  const configs=[['门户智能咨询','JNE-Chat-2','流式回答 · 检索增强','生产启用','响应 P95 8.6s'],['标的情境问答','JNE-Chat-2','结构化数据优先','生产启用','有依据率 97.2%'],['资产字段解析','JNE-Extract-3','OCR＋字段抽取','生产启用','准确率 97.4%'],['投资价值研判','JNE-Reason-2','人工发布后可见','灰度 20%','人工修改率 8.6%'],['风险辅助识别','JNE-Risk-1','规则优先 · AI 辅助','生产启用','确认率 91.3%'],['经营摘要生成','JNE-Reason-2','每日 08:30 生成','测试环境','待评测']];
  return `${pageHeader(meta)}${kpis(meta.kpis)}${filterBar(meta.filters)}<section class="ai-config-grid">${configs.map((x,i)=>`<article class="admin-card"><header><i>✦</i><div><b>${x[0]}</b><small>SCENE-${String(i+1).padStart(3,'0')}</small></div><span class="admin-badge ${x[3].includes('启用')?'green':x[3].includes('灰度')?'blue':'orange'}">${x[3]}</span></header><dl><div><dt>主模型</dt><dd>${x[1]}</dd></div><div><dt>策略</dt><dd>${x[2]}</dd></div><div><dt>运行质量</dt><dd>${x[4]}</dd></div><div><dt>降级策略</dt><dd>知识检索 → FAQ → 人工服务</dd></div></dl><footer><button data-admin-action="row" data-row="${i}">配置</button><button>查看版本</button><label><input type="checkbox" ${x[3]!=='测试环境'?'checked':''}/><i></i></label></footer></article>`).join('')}</section>`;
}

function datasourcesPage(meta){
  const groups=[['原业务平台','核心业务数据','项目、标的、公告、报名、竞价、成交','2.1 分钟','正常'],['统一身份认证','用户与组织','登录态、角色、机构、数据范围','实时','正常'],['数据仓库','驾驶舱指标','指标快照、历史趋势、归因数据','4.2 分钟','正常'],['文件与对象存储','公告及附件','PDF、Word、图片、报告','实时','正常'],['地图与周边数据','区位资源','地图、POI、交通与公共服务','2026-10-11','轻微延迟'],['AI 模型网关','模型服务','问答、解析、研判、内容安全','实时','正常']];
  return `${pageHeader(meta)}${kpis(meta.kpis)}${filterBar(meta.filters)}<section class="datasource-grid">${groups.map((x,i)=>`<article class="admin-card"><header><i>${['▦','♙','▥','▤','⌖','✦'][i]}</i><div><b>${x[0]}</b><small>${x[1]}</small></div><span class="admin-badge ${x[4]==='正常'?'green':'orange'}">${x[4]}</span></header><p>${x[2]}</p><dl><div><dt>最近同步</dt><dd>${x[3]}</dd></div><div><dt>今日调用</dt><dd>${[18642,4286,126840,8624,3286,286420][i].toLocaleString()}</dd></div><div><dt>成功率</dt><dd>${['99.98%','100%','99.92%','99.96%','98.86%','99.76%'][i]}</dd></div></dl><footer><button data-admin-action="row" data-row="${i}">查看接口</button><button>立即检测</button></footer></article>`).join('')}</section>`;
}

export const pages = {
  'org-users': genericPage,
  'roles': rolesPage,
  'dictionaries': genericPage,
  'ai-config': aiConfigPage,
  'datasources': datasourcesPage,
  'audit': genericPage
};
