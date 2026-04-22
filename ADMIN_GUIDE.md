# ZEKSmart 管理后台使用指南

## 登录信息

- **后台地址**: https://zeksmart.com/admin/login
- **默认密码**: `ZekSmart2026!`

---

## 功能模块

### 1. Dashboard (数据概览)

**地址**: `/admin`

- 总询盘数、今日询盘、本周询盘统计
- 最近询盘列表
- 快速操作入口

---

### 2. 询盘管理

**地址**: `/admin/leads`

**功能**:
- 查看所有网站表单提交的询盘
- 按时间排序，最新的在最前面
- 支持导出 CSV 文件
- 显示询盘详情：姓名、公司、邮箱、需求内容

**数据位置**: `data/leads.json`

---

### 3. 产品管理

**地址**: `/admin/products`

**功能**:
- 查看已上架产品列表
- 添加新产品：`/admin/products/new`
- 编辑产品信息
- 设置产品状态（草稿/已发布）

**添加产品步骤**:
1. 点击「添加产品」
2. 填写基本信息：
   - 产品名称
   - 类别（从下拉菜单选择）
   - 价格 (USD)
   - MOQ (最小起订量)
   - 尺寸、材质、颜色
3. 产品特点（每行一个）
4. 产品描述
5. 上传产品图片（支持 JPEG、PNG、WebP，最大 10MB）
6. 选择状态：草稿 或 已发布
7. 点击「保存产品」

**数据位置**: `data/products.json`

---

### 4. 内容管理

**地址**: `/admin/content`

**功能**:
- 管理博客文章、SEO 内容、品牌故事
- 添加新文章：`/admin/content/new`
- 编辑/删除已有内容
- 查看文章状态和浏览量

**添加文章步骤**:
1. 点击「新建文章」
2. 填写基本信息：
   - 标题（自动生成 Slug）
   - 类别（Product Knowledge / Buying Guide / Design Trends 等）
   - 状态（草稿/已发布）
   - 摘要
   - 标签（逗号分隔）
3. 上传封面图片
4. 编写文章内容（支持 Markdown 格式）
5. SEO 设置（可选）：
   - SEO 标题
   - SEO 描述
6. 点击「保存文章」

**数据位置**: `data/content.json`

---

### 5. 站点设置

**地址**: `/admin/settings`

**功能模块**:

#### 基本信息
- 网站名称
- 联系邮箱
- WhatsApp 号码

#### SEO 设置
- Meta Title（建议 50-60 字符）
- Meta Description（建议 150-160 字符）
- 关键词（逗号分隔）

#### 网站分析
- Google Analytics ID（如：G-XXXXXXXXXX）
- Google Tag Manager ID（如：GTM-XXXXXXX）

#### 邮件通知
- SMTP 主机（默认：smtp.exmail.qq.com）
- SMTP 端口（默认：465）
- SMTP 用户名
- SMTP 密码/授权码
- 通知邮箱

**数据位置**: `data/settings.json`

---

## 图片上传

所有上传的图片保存在：`public/uploads/`

**支持格式**: JPEG、PNG、WebP、GIF  
**最大文件大小**: 10MB

上传后的图片 URL 格式：`/uploads/文件名.jpg`

---

## 安全设置

### 修改管理员密码

编辑 `.env.local` 文件：

```bash
ADMIN_PASSWORD=你的新密码
```

然后重新部署：

```bash
vercel --prod
```

### 访问控制

- 所有 `/admin/*` 页面需要登录
- API 接口需要验证 Cookie
- 自动登录功能（通过 `/admin/auto-login`）可用于内部快速访问

---

## 数据备份

重要数据文件位于 `data/` 目录：

```
data/
├── leads.json      # 询盘数据
├── products.json   # 产品数据
├── content.json    # 内容数据
└── settings.json   # 站点设置
```

**建议定期备份这些文件**，可通过以下命令：

```bash
# 本地备份
cp -r data/ data-backup-$(date +%Y%m%d)

# 或上传到云存储
```

---

## 常见问题

### Q: 图片上传失败？
- 检查文件大小是否超过 10MB
- 确认文件格式为 JPEG/PNG/WebP/GIF
- 检查网络连接

### Q: 修改设置后没有生效？
- 确认点击了「保存设置」按钮
- 刷新页面查看最新数据
- 检查浏览器缓存（强制刷新：Cmd+Shift+R）

### Q: 如何导出询盘数据？
- 进入「询盘管理」页面
- 点击「导出 CSV」按钮
- 文件会自动下载

---

## 技术栈

- **框架**: Next.js 14.2.12 (App Router)
- **样式**: Tailwind CSS
- **数据存储**: JSON 文件（可后续升级为数据库）
- **部署**: Vercel
- **域名**: zeksmart.com

---

## 后续扩展建议

1. **数据库集成**: 将 JSON 存储升级为 PostgreSQL/MongoDB
2. **用户权限**: 添加多用户角色管理（管理员/编辑/查看）
3. **邮件通知**: 新询盘自动发送邮件提醒
4. **数据分析**: 集成 Google Analytics 数据展示
5. **批量操作**: 产品/内容的批量导入导出
6. **多语言**: 支持中英文后台界面

---

**最后更新**: 2026-04-22
