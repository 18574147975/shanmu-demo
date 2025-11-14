# 选择困难症救星

一个帮助你快速做决定的趣味应用，通过盲盒抽取的方式为你推荐美食、活动、电影和书籍。

## 功能介绍

### 核心功能

#### 1. 四大推荐盲盒
- **美食推荐**：30种精选美食推荐，从火锅到西餐，从烧烤到日料
- **周末活动**：30种周末活动建议，包括户外运动、室内娱乐、社交聚会等
- **影视剧推荐**：50部经典影视作品，涵盖各种类型和风格
- **书籍推荐**：50本优质书籍，包括文学、科幻、历史、哲学等多个领域

#### 2. 双重抽取模式
- **摇一摇模式**：先摇一摇获取神秘提示（如"辣的🌶️"、"户外🌳"等），可多次摇动获取不同提示
- **直接抽取模式**：跳过提示直接开启盲盒，立即获得推荐结果

#### 3. 3D立方体盲盒
- 每个推荐类别都有独特的3D立方体盲盒设计
- 抽取时有开启动画效果，增加趣味性和期待感
- 结果展示时有翻转卡片动画和闪光特效

#### 4. 分享功能
- 生成精美的分享图片
- 一键下载保存到本地
- 可分享给朋友一起使用

### 使用流程

1. **选择类别**：在四个盲盒中选择你需要的推荐类型
2. **摇一摇（可选）**：点击"摇一摇"按钮获取提示，帮助你缩小选择范围
3. **开启盲盒**：点击"直接抽"按钮，观看3D盲盒开启动画
4. **查看结果**：卡片翻转后显示推荐内容和详细描述
5. **分享或重抽**：可以生成分享图片，或点击"再抽"继续尝试

### 特色亮点

- ✨ **趣味交互**：3D立方体动画、摇一摇、翻卡片等多种交互方式
- 🎯 **精选内容**：所有推荐都经过精心挑选，质量有保证
- 🎨 **精美设计**：渐变色彩、流畅动画、响应式布局
- 📱 **移动友好**：完美适配手机、平板和桌面设备
- 🚀 **快速决策**：告别选择困难，几秒钟就能做出决定

## 目录结构

```
├── README.md # 说明文档
├── components.json # 组件库配置
├── eslint.config.js # eslint 配置
├── index.html # 入口文件
├── package.json # 包管理
├── postcss.config.js # postcss 配置
├── public # 静态资源目录
│   ├── favicon.png # 图标
│   └── images # 图片资源
├── src # 源码目录
│   ├── App.tsx # 入口文件
│   ├── components # 组件目录
│   ├── context # 上下文目录
│   ├── db # 数据库配置目录
│   ├── hooks # 通用钩子函数目录
│   ├── index.css # 全局样式
│   ├── layout # 布局目录
│   ├── lib # 工具库目录
│   ├── main.tsx # 入口文件
│   ├── routes.tsx # 路由配置
│   ├── pages # 页面目录
│   ├── services  # 数据库交互目录
│   ├── types   # 类型定义目录
├── tsconfig.app.json  # ts 前端配置文件
├── tsconfig.json # ts 配置文件
├── tsconfig.node.json # ts node端配置文件
└── vite.config.ts # vite 配置文件
```

## 技术栈

Vite、TypeScript、React、Supabase

## 本地开发

### 如何在本地编辑代码？

您可以选择 [VSCode](https://code.visualstudio.com/Download) 或者您常用的任何 IDE 编辑器，唯一的要求是安装 Node.js 和 npm.

### 环境要求

```
# Node.js ≥ 20
# npm ≥ 10
例如：
# node -v   # v20.18.3
# npm -v    # 10.8.2
```

具体安装步骤如下：

### 在 Windows 上安装 Node.js

```
# Step 1: 访问Node.js官网：https://nodejs.org/，点击下载后，会根据你的系统自动选择合适的版本（32位或64位）。
# Step 2: 运行安装程序：下载完成后，双击运行安装程序。
# Step 3: 完成安装：按照安装向导完成安装过程。
# Step 4: 验证安装：在命令提示符（cmd）或IDE终端（terminal）中输入 node -v 和 npm -v 来检查 Node.js 和 npm 是否正确安装。
```

### 在 macOS 上安装 Node.js

```
# Step 1: 使用Homebrew安装（推荐方法）：打开终端。输入命令brew install node并回车。如果尚未安装Homebrew，需要先安装Homebrew，
可以通过在终端中运行如下命令来安装：
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
或者使用官网安装程序：访问Node.js官网。下载macOS的.pkg安装包。打开下载的.pkg文件，按照提示完成安装。
# Step 2: 验证安装：在命令提示符（cmd）或IDE终端（terminal）中输入 node -v 和 npm -v 来检查 Node.js 和 npm 是否正确安装。
```

### 安装完后按照如下步骤操作：

```
# Step 1: 下载代码包
# Step 2: 解压代码包
# Step 3: 用IDE打开代码包，进入代码目录
# Step 4: IDE终端输入命令行，安装依赖：npm i
# Step 5: IDE终端输入命令行，启动开发服务器：npm run dev -- --host 127.0.0.1
```
