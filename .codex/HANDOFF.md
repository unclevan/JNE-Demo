# 后续开发交接说明

## 开始工作前

1. 完整阅读 `.codex/README.md` 中列出的上下文文档。
2. 检查当前工作区和未提交修改，保留用户已有变更。
3. 阅读用户本次需求涉及的最少文件，不要重新搭建项目或替换现有技术栈。

## 技术结构

- Vite + 原生 JavaScript + CSS。
- `src/main.js`：页面模板、路由状态和交互逻辑。
- `src/data.js`：标的和驾驶舱本地演示数据。
- `src/style.css`：门户、详情、AI助手和基础驾驶舱样式。
- `src/cockpit.css`：驾驶舱子页组件样式。
- `src/cockpit-layout.css`：驾驶舱满屏布局、指标卡、问号说明和核心分析样式。
- `vite.config.js`：GitHub Pages 相对资源路径配置。
- `.github/workflows/deploy-pages.yml`：GitHub Pages 自动发布流程。
- `.openai/hosting.json`：现有 Sites 项目标识；不得创建重复站点。

## 修改原则

- 沿用现有轻量结构，除非用户明确要求，不引入新的前端框架或图表库。
- 演示数据集中维护，避免在大量事件处理代码中重复散落。
- 不接线上业务接口，不提交真实交易数据。
- 不展示真实个人敏感信息。
- 新增驾驶舱指标时同步补充问号口径说明。
- 新增推测性结论时同步补充“模拟分析”或“仅供参考”。
- 驾驶舱继续保持隐藏入口，只允许 URL 直达。
- 门户 AI 和详情页 AI 使用同一助手形象，但回复上下文不同。

## 每次交付前验证

- 执行 `npm run build`，修复构建错误。
- 启动本地预览并确认 `/?page=cockpit` 能正常打开。
- 按需求检查首页、详情页、页面跳转、AI咨询、AI资产解析和驾驶舱页签。
- 若修改驾驶舱，检查 1920×1080 下是否铺满、是否出现大面积空白或文字挤压。
- 检查模拟数据标识和敏感信息边界。
- 完成后更新 `.codex/CURRENT_STATUS.md` 和受影响的设计文档。

## 源码和发布

- GitHub 仓库：`unclevan/JNE-Demo`。
- 目标分支：`main`。
- 客户访问优先使用 GitHub Pages：`https://unclevan.github.io/JNE-Demo/`。
- GitHub Pages 驾驶舱直达：`https://unclevan.github.io/JNE-Demo/?page=cockpit`。
- 工作区未必保留 `.git` 元数据。开始提交前先检查，不要对源文件执行破坏性重置；必要时使用安全的临时 Git 元数据连接现有远端。
- `.openai/hosting.json` 已绑定现有 Sites 项目，禁止重复创建项目或持久化临时凭证。
- 只有文档变化且不影响网页时，无需重新部署网页；页面源码或构建产物变化时再执行构建、推送和发布。

