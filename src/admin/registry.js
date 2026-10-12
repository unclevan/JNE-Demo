import {adminPages} from '../admin-data.js';
import {pages as workbenchPages} from './pages/workbench.js';
import {pages as assetPages} from './pages/asset.js';
import {pages as matchingPages} from './pages/matching.js';
import {pages as consultationPages} from './pages/consultation.js';
import {pages as knowledgePages} from './pages/knowledge.js';
import {pages as riskPages} from './pages/risk.js';
import {pages as reportPages} from './pages/reports.js';
import {pages as systemPages} from './pages/system.js';

export const pageRenderers={
  ...workbenchPages,...assetPages,...matchingPages,...consultationPages,
  ...knowledgePages,...riskPages,...reportPages,...systemPages
};

const standaloneMeta={
  workbench:{title:'首页工作台',description:'汇总本人待办、今日运行情况和 AI 服务状态。',section:'运营工作台'},
  'cockpit-entry':{title:'数据驾驶舱',description:'进入全域交易数据驾驶舱，查看交易、资产、主体、风险和 AI 成效。',section:'数据驾驶舱'}
};

export const isAdminModule=key=>Object.hasOwn(pageRenderers,key);
export const moduleFromUrl=()=>{
  const key=new URLSearchParams(location.search).get('module')||'workbench';
  return isAdminModule(key)?key:'workbench';
};
export const metaFor=key=>standaloneMeta[key]||adminPages[key];
