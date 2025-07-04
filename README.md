# Timestamp.im

一个支持多语言的时间戳工具网站，基于 Next.js 构建，提供时间戳与日期的相互转换、常见问题解答、代码示例等实用功能。适合开发者、数据分析师及需要处理时间戳的用户。

## 功能特性

- **时间戳转换**：支持 Unix 时间戳与日期时间的相互转换。
- **多语言支持**：内置十多种语言，自动适配用户语言环境。
- **常见问题解答**：FAQ 页面帮助用户理解时间戳相关知识。
- **代码示例**：提供多语言代码片段，便于开发者集成。
- **响应式设计**：适配桌面与移动端。
- **国际化路由**：URL 路径自动切换语言。

## 技术栈

- [Next.js](https://nextjs.org/)：React 服务端渲染与静态站点生成框架
- [Tailwind CSS](https://tailwindcss.com/)：原子化 CSS 框架
- 国际化（i18n）：自定义实现，支持多语言切换
- TypeScript：类型安全开发

## 目录结构与说明

```text
timestamp.im/
├── app/                        # Next.js 应用主目录
│   ├── [locale]/               # 多语言路由目录
│   │   ├── favicon.ico         # 网站图标
│   │   ├── globals.css         # 全局样式
│   │   ├── layout.tsx          # 页面布局组件
│   │   ├── loading.tsx         # 页面加载状态
│   │   ├── page.tsx            # 首页（时间戳工具主页面）
│   │   └── t/                  # “工具”子路由
│   │       └── [timestamp]/    # 动态时间戳页面
│   │           └── page.tsx    # 单个时间戳详情页
│   └── i18n.ts                 # 国际化配置与工具函数
├── components/                 # 复用组件
│   ├── analytics/              # 数据分析相关
│   │   └── ga.tsx              # Google Analytics 集成
│   ├── ErrorBoundary.tsx       # 错误边界处理
│   ├── footer/                 # 页脚组件
│   │   └── index.tsx
│   ├── header/                 # 页头组件
│   │   └── index.tsx
│   ├── i18n/                   # 国际化相关组件
│   │   ├── LanguageChanger.tsx # 语言切换器
│   │   └── TranslationProvider.tsx # 国际化上下文提供
│   ├── timestamp/              # 时间戳相关组件
│   │   ├── code.tsx            # 代码示例
│   │   ├── faq.tsx             # 常见问题
│   │   ├── index.tsx           # 时间戳主功能
│   │   ├── random.tsx          # 随机时间戳
│   │   └── toDateTime.tsx      # 时间戳转日期
│   └── ToolsList.tsx           # 工具列表组件
├── i18nConfig.js               # 国际化配置
├── locales/                    # 多语言翻译文件
│   ├── ar/ ... ru/             # 各语言目录
│   │   └── timestamp.json      # 该语言的翻译内容
├── middleware.ts               # Next.js 中间件（如国际化重定向）
├── package.json                # 项目依赖与脚本
├── postcss.config.js           # PostCSS 配置
├── public/                     # 公共资源
│   ├── next.svg
│   └── vercel.svg
├── tailwind.config.ts          # Tailwind CSS 配置
├── tsconfig.json               # TypeScript 配置
├── README.md                   # 项目说明文档
├── types/                      # 类型定义
├── utilities/                  # 工具函数
└── yarn.lock                   # Yarn 依赖锁定文件
```

### 主要文件/文件夹说明

- **app/**：Next.js 应用主目录，包含所有页面、布局和全局样式。
- **components/**：项目所有可复用的 UI 组件。
- **locales/**：各语言的翻译 JSON 文件，支持国际化。
- **middleware.ts**：处理请求的中间件，如语言重定向。
- **i18nConfig.js**、**app/i18n.ts**：国际化配置与工具。
- **tailwind.config.ts**、**postcss.config.js**：样式相关配置。
- **types/**、**utilities/**：类型定义与工具函数，便于维护和扩展。

## 快速开始

1. 安装依赖

```bash
yarn install
# 或 npm install
```

2. 启动开发服务器

```bash
yarn dev
# 或 npm run dev
```

3. 访问

浏览器打开 [http://localhost:3000](http://localhost:3000)

## 国际化支持

- 默认根据浏览器语言自动切换
- 可手动切换页面右上角语言

## 贡献与反馈

欢迎提交 Issue 或 PR，帮助我们改进项目！

---

如需进一步定制（如添加徽章、部署说明、API 文档等），请告知！
