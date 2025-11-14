# GitHub 部署指南

## 部署步骤

### 1. 创建 GitHub 仓库
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

### 2. 配置 GitHub Pages
1. 进入仓库的 Settings > Pages
2. Source 选择 "GitHub Actions"

### 3. 配置环境变量（Secrets）
1. 进入仓库的 Settings > Secrets and variables > Actions
2. 点击 "New repository secret"
3. 添加以下 secrets：
   - `VITE_APP_ID`: 你的秒哒应用 ID

### 4. 更新 vite.config.ts
将 `vite.config.ts` 中的 `your-repo-name` 替换为你的实际仓库名

### 5. 推送代码触发部署
```bash
git add .
git commit -m "Configure deployment"
git push
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 环境变量配置

复制 `.env.example` 为 `.env` 并填入实际值：
```bash
cp .env.example .env
```

## 注意事项

- 不要将 `.env` 文件提交到 Git
- 敏感信息请使用 GitHub Secrets 管理
- 如果使用 Supabase，需要在 GitHub Secrets 中添加相关配置
